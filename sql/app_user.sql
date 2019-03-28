CREATE TABLE app_user (
  user_id SERIAL PRIMARY KEY,
  user_email VARCHAR(50) UNIQUE NOT NULL,
  user_name VARCHAR(50) NOT NULL,
  user_password_hash VARCHAR(100) NOT NULL,
  user_joined TIMESTAMP NOT NULL
);