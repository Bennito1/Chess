CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE,
    password VARCHAR NOT NULL,
    email TEXT UNIQUE,
    mmr INTEGER,
    isActivated BOOLEAN,
    activationLinck TEXT, 
    info TEXT
);

CREATE TABLE freands{
    freandId_1 integer,
    freandId_2 
}

CREATE TABLE token (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(20) NOT NULL,
    FOREIGN KEY (username) REFERENCES users (username),
    refreshToken TEXT
)


ALTER TABLE users DROP CONSTRAINT password ;