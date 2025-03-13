create TABLE users(
    id SERIAL PRIMARY KEY,
    username varchar(20) UNIQUE,
    password varchar(20) NOT NULL,
    email text UNIQUE,
    isActivated boolean,
    activationLinck text
)
CREATE TABLE token (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(20) NOT NULL,
    FOREIGN KEY (username) REFERENCES users (username),
    refreshToken TEXT
)
ALTER TABLE users DROP CONSTRAINT password ;