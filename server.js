import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const app = express();
const port = process.env.PORT || 3001;

const jwtSecret = process.env.JWT_SECRET || "supersecretjwtkey"; // Use environment variable for secret

app.use(cors()); // Allow all origins for debugging
app.use(express.json());

// Test endpoint to check if server is running
app.get("/", (req, res) => {
  console.log("Root endpoint accessed!"); // Added console log
  res.send("Server is definitely running and accessible!"); // More distinct message
});

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to database as id " + db.threadId);
});

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // No token

  jwt.verify(token, jwtSecret, async (err, decoded) => {
    if (err) return res.sendStatus(403); // Invalid token

    try {
      const [rows] = await db
        .promise()
        .query("SELECT id, role FROM users WHERE id = ?", [decoded.user.id]);
      if (rows.length === 0) return res.sendStatus(403); // User not found
      req.user = rows[0]; // Attach user object with id and role
      next();
    } catch (dbErr) {
      console.error("Database error during token verification:", dbErr);
      res.status(500).send("Server error");
    }
  });
};

// Middleware to authorize admin users
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Access denied. Admin privileges required." });
  }
};

// User Registration
app.post(
  "/api/register",
  [
    check("full_name", "Full Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
    )
      .isLength({ min: 8 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { full_name, email, password } = req.body;

    try {
      // Check if user already exists
      const [rows] = await db
        .promise()
        .query("SELECT id FROM users WHERE email = ?", [email]);
      if (rows.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);

      const sql =
        "INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)";
      await db.promise().query(sql, [full_name, email, password_hash]);

      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// User Login
app.post(
  "/api/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const [rows] = await db
        .promise()
        .query("SELECT * FROM users WHERE email = ?", [email]);
      const user = rows[0];

      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const payload = { user: { id: user.id, role: user.role } };
      jwt.sign(
        payload,
        jwtSecret,
        { expiresIn: "1h" }, // Token expires in 1 hour
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

app.post("/api/subscribe", authenticateToken, async (req, res) => {
  const {
    name,
    phoneNumber,
    planSelection,
    mealTypes,
    deliveryDays,
    allergies,
    totalPrice,
  } = req.body;
  const userId = req.user.id; // Get user ID from authenticated token
  const startDate = new Date().toISOString().slice(0, 10); // Current date in YYYY-MM-DD format

  const sql = `INSERT INTO subscriptions (user_id, name, phone_number, plan_selection, meal_types, delivery_days, allergies, total_price, status, start_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    userId,
    name,
    phoneNumber,
    planSelection,
    JSON.stringify(mealTypes),
    JSON.stringify(deliveryDays),
    allergies,
    totalPrice,
    "active",
    startDate,
  ];

  try {
    await db.promise().query(sql, values);
    res.status(200).json({ message: "Subscription successful!" });
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).json({ message: "Error subscribing", error: err });
  }
});

// Get user's subscriptions
app.get("/api/subscriptions/me", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const [rows] = await db
      .promise()
      .query("SELECT * FROM subscriptions WHERE user_id = ?", [userId]);
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching subscriptions:", err);
    res
      .status(500)
      .json({ message: "Error fetching subscriptions", error: err });
  }
});

// Pause a subscription
app.post(
  "/api/subscriptions/pause/:id",
  authenticateToken,
  async (req, res) => {
    const subscriptionId = req.params.id;
    const userId = req.user.id;
    const { pause_start_date, pause_end_date } = req.body;

    if (!pause_start_date || !pause_end_date) {
      return res
        .status(400)
        .json({ message: "Pause start date and end date are required." });
    }

    try {
      // Verify ownership and get current status
      const [subscriptionRows] = await db
        .promise()
        .query("SELECT user_id, status FROM subscriptions WHERE id = ?", [
          subscriptionId,
        ]);
      if (subscriptionRows.length === 0) {
        return res.status(404).json({ message: "Subscription not found." });
      }
      const subscription = subscriptionRows[0];

      if (subscription.user_id !== userId) {
        return res
          .status(403)
          .json({ message: "Unauthorized to pause this subscription." });
      }
      if (subscription.status === "canceled") {
        return res
          .status(400)
          .json({ message: "Cannot pause a canceled subscription." });
      }

      // Update subscription status
      await db
        .promise()
        .query("UPDATE subscriptions SET status = ? WHERE id = ?", [
          "paused",
          subscriptionId,
        ]);

      // Record pause period
      await db
        .promise()
        .query(
          "INSERT INTO subscription_pauses (subscription_id, pause_start_date, pause_end_date) VALUES (?, ?, ?)",
          [subscriptionId, pause_start_date, pause_end_date]
        );

      res.status(200).json({ message: "Subscription paused successfully." });
    } catch (err) {
      console.error("Error pausing subscription:", err);
      res
        .status(500)
        .json({ message: "Error pausing subscription", error: err });
    }
  }
);

// Cancel a subscription
app.post(
  "/api/subscriptions/cancel/:id",
  authenticateToken,
  async (req, res) => {
    const subscriptionId = req.params.id;
    const userId = req.user.id;
    const endDate = new Date().toISOString().slice(0, 10); // Set end date to current date

    try {
      // Verify ownership and get current status
      const [subscriptionRows] = await db
        .promise()
        .query("SELECT user_id, status FROM subscriptions WHERE id = ?", [
          subscriptionId,
        ]);
      if (subscriptionRows.length === 0) {
        return res.status(404).json({ message: "Subscription not found." });
      }
      const subscription = subscriptionRows[0];

      if (subscription.user_id !== userId) {
        return res
          .status(403)
          .json({ message: "Unauthorized to cancel this subscription." });
      }
      if (subscription.status === "canceled") {
        return res
          .status(400)
          .json({ message: "Subscription is already canceled." });
      }

      // Update subscription status and end date
      await db
        .promise()
        .query(
          "UPDATE subscriptions SET status = ?, end_date = ? WHERE id = ?",
          ["canceled", endDate, subscriptionId]
        );

      res.status(200).json({ message: "Subscription canceled successfully." });
    } catch (err) {
      console.error("Error canceling subscription:", err);
      res
        .status(500)
        .json({ message: "Error canceling subscription", error: err });
    }
  }
);

app.post("/api/testimonials", authenticateToken, async (req, res) => {
  const { customerName, reviewMessage, rating } = req.body;
  const userId = req.user.id; // Get user ID from authenticated token

  try {
    const sql = `INSERT INTO testimonials (user_id, customer_name, review_message, rating) VALUES (?, ?, ?, ?)`;
    await db.promise().query(sql, [userId, customerName, reviewMessage, rating]);
    res.status(201).json({ message: "Testimonial submitted successfully!" });
  } catch (err) {
    console.error("Error submitting testimonial:", err);
    res.status(500).json({ message: "Error submitting testimonial", error: err });
  }
});

app.get("/api/testimonials", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT id, user_id, customer_name AS customerName, review_message AS reviewMessage, rating FROM testimonials");
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching testimonials:", err);
    res.status(500).json({ message: "Error fetching testimonials", error: err });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Admin Dashboard Metrics

// New Subscriptions
app.get(
  "/api/admin/metrics/new-subscriptions",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
      const [rows] = await db
        .promise()
        .query(
          "SELECT COUNT(*) AS newSubscriptions FROM subscriptions WHERE created_at BETWEEN ? AND ?",
          [startDate, endDate]
        );
      res.status(200).json(rows[0]);
    } catch (err) {
      console.error("Error fetching new subscriptions:", err);
      res
        .status(500)
        .json({ message: "Error fetching new subscriptions", error: err });
    }
  }
);

// Monthly Recurring Revenue (MRR)
app.get(
  "/api/admin/metrics/mrr",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
      const [rows] = await db
        .promise()
        .query(
          "SELECT SUM(total_price) AS mrr FROM subscriptions WHERE status = 'active' AND created_at BETWEEN ? AND ?",
          [startDate, endDate]
        );
      res.status(200).json(rows[0]);
    } catch (err) {
      console.error("Error fetching MRR:", err);
      res.status(500).json({ message: "Error fetching MRR", error: err });
    }
  }
);

// Reactivations (simplified: count subscriptions that changed from canceled to active)
app.get(
  "/api/admin/metrics/reactivations",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
      // This is a simplified approach. A more robust solution would involve tracking status changes.
      const [rows] = await db
        .promise()
        .query(
          "SELECT COUNT(*) AS reactivations FROM subscriptions WHERE status = 'active' AND created_at BETWEEN ? AND ? AND id IN (SELECT subscription_id FROM subscription_pauses WHERE pause_end_date IS NOT NULL)",
          [startDate, endDate]
        );
      res.status(200).json(rows[0]);
    } catch (err) {
      console.error("Error fetching reactivations:", err);
      res
        .status(500)
        .json({ message: "Error fetching reactivations", error: err });
    }
  }
);

// Subscription Growth (total active subscriptions)
app.get(
  "/api/admin/metrics/growth",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const [rows] = await db
        .promise()
        .query(
          `SELECT COUNT(*) AS totalActiveSubscriptions FROM subscriptions WHERE status = 'active'`
        );
      res.status(200).json(rows[0]);
    } catch (err) {
      console.error("Error fetching subscription growth:", err);
      res
        .status(500)
        .json({ message: "Error fetching subscription growth", error: err });
    }
  }
);
