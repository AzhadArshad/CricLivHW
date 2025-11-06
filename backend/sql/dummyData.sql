-- Users: 1 admin, 2 normal users
INSERT INTO users (username, email_id, my_password, user_role)
VALUES 
('Admin User', 'admin@cricliv.com', '$2a$10$dummyhashforadmin', 'admin'),
('John Doe', 'john@example.com', '$2a$10$dummyhashforjohn', 'user'),
('Jane Smith', 'jane@example.com', '$2a$10$dummyhashforjane', 'user');

INSERT INTO grounds (ground_name, location, admin_id, description_ground, price_per_hour)
VALUES
('Dubai Cricket Stadium', 'Dubai Sports City', 1, 'Large stadium with full facilities', 150.00),
('Al Qusais Ground', 'Al Qusais, Dubai', 1, 'Medium-sized ground with nets', 80.00),
('Jumeirah Cricket Club', 'Jumeirah, Dubai', 1, 'Open ground with evening floodlights', 100.00);

INSERT INTO bookings (booking_date, booking_time, user_id, ground_id, status)
VALUES
('2025-11-07', '09:00:00', 2, 1, 'confirmed'),
('2025-11-07', '12:00:00', 3, 2, 'pending'),
('2025-11-08', '15:00:00', 2, 3, 'confirmed');