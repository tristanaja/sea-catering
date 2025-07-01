# SEA Catering - Healthy Meal Delivery Service 🥗

## Description
SEA Catering is a web application that allows users to subscribe to healthy meal plans with customizable options and convenient delivery. It features user authentication, subscription management, and an admin dashboard for tracking key business metrics. 📈

## Features ✨
- User Registration and Login 🔐
- Customizable Meal Plan Subscriptions 🍎
- User Dashboard to manage subscriptions (pause, cancel) 📊
- Admin Dashboard for business metrics (new subscriptions, MRR, reactivations, total active subscriptions) 📈
- Testimonial submission and display 🗣️
- Responsive UI/UX with Tailwind CSS 🎨

## Prerequisites 🛠️
Before you begin, ensure you have met the following requirements:
* Node.js (LTS version recommended) 🟢
* npm (Node Package Manager) 📦
* MySQL Database 🗄️

## Installation 🚀
Follow these steps to get the project up and running on your local machine.

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd SEA_Catering
    ```

2.  **Install backend dependencies:**
    ```bash
    npm install
    ```

3.  **Install frontend dependencies:**
    ```bash
    # Navigate to the frontend directory if it's separate, otherwise it's in the root
    npm install
    ```

## Environment Variables 🔑
Create a `.env` file in the project root directory and add the following environment variables. Replace the placeholder values with your actual database credentials.

```
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_root_password
DB_NAME=sea_catering_db
DB_PORT=3306
JWT_SECRET=supersecretjwtkey # Change this to a strong, random secret in production! ⚠️
```

## Database Setup 🗄️

1.  **Create the database:**
    Access your MySQL server (e.g., via MySQL Workbench, phpMyAdmin, or the command line) and create a new database. The name should match the `DB_NAME` in your `.env` file (e.g., `sea_catering_db`).

    ```sql
    CREATE DATABASE sea_catering_db;
    USE sea_catering_db;
    ```

2.  **Run schema migrations:**
    The project uses `full_schema.sql` to set up the necessary tables. You will need to manually execute the SQL commands from `src/sql/full_schema.sql` in your MySQL database.

    **Example (using MySQL command line client):**
    ```bash
    mysql -u root -p sea_catering_db < src/sql/full_schema.sql
    ```

## Running the Application ▶️

1.  **Start the backend server:**
    In the project root directory, run:
    ```bash
    npm start
    ```
    The server will run on the port specified in your `.env` file (default: `3001`).

2.  **Start the frontend development server:**
    In a new terminal, from the project root directory, run:
    ```bash
    npm run dev
    ```
    The frontend application will typically open in your browser at `http://localhost:5173` (or another available port).

## Admin Account Setup 👑
To create an admin account, you will need to manually update the `role` for an existing user in your `users` table in the database.

1.  **Register a new user** through the application's registration page. 📝

2.  **Access your MySQL database** (e.g., using MySQL Workbench, phpMyAdmin, or the command line). 🖥️

3.  **Update the user's role to 'admin'**: Find the user you just registered and change their `role` column from `user` (or `NULL`) to `admin`.

    ```sql
    UPDATE users
    SET role = 'admin'
    WHERE email = 'your_registered_email@example.com';
    ```
    Replace `'your_registered_email@example.com'` with the email address of the user you registered.

4.  **Log in** with this updated user account. You should now have access to the Admin Dashboard. ✅

## Contributing 🤝
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. 💡

## License 📄
This project is proudly open-source and available under the MIT License. Feel free to explore, use, and contribute! You can find the full license details [here](https://choosealicense.com/licenses/mit/).
