CREATE DATABASE IF NOT EXISTS cricliv_db;
USE cricliv_db;

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(200) NOT NULL,
  email_id VARCHAR(200) NOT NULL UNIQUE,
  my_password VARCHAR(255) NOT NULL,
  user_role ENUM('user', 'admin') DEFAULT 'user'
);

CREATE TABLE grounds (
  ground_id INT AUTO_INCREMENT PRIMARY KEY,
  ground_name VARCHAR(200) NOT NULL,
  location VARCHAR(200),
  admin_id INT,
  description_ground VARCHAR(500),
  price_per_hour DECIMAL(10,2),
  FOREIGN KEY (admin_id) REFERENCES users(user_id) ON DELETE SET NULL
);

CREATE TABLE bookings (
  booking_id INT AUTO_INCREMENT PRIMARY KEY,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  user_id INT NOT NULL,
  ground_id INT NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (ground_id) REFERENCES grounds(ground_id) ON DELETE CASCADE
);