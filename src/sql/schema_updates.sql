ALTER TABLE subscriptions
ADD COLUMN user_id INT,
ADD COLUMN status VARCHAR(50) DEFAULT 'active',
ADD COLUMN start_date DATE,
ADD COLUMN end_date DATE;

-- Add foreign key constraint for subscriptions
ALTER TABLE subscriptions
ADD CONSTRAINT fk_subscriptions_user_id
FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE testimonials
ADD COLUMN user_id INT;

-- Add foreign key constraint for testimonials
ALTER TABLE testimonials
ADD CONSTRAINT fk_testimonials_user_id
FOREIGN KEY (user_id) REFERENCES users(id);

CREATE TABLE subscription_pauses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subscription_id INT NOT NULL,
    pause_start_date DATE NOT NULL,
    pause_end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(id)
);