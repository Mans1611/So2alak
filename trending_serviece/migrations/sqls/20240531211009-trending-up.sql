CREATE TABLE IF NOT EXISTS trending(
    word VARCHAR(50) NOT NULL,
    count INTEGER NOT NULL DEFAULT 0
);