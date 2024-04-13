CREATE TABLE IF NOT EXISTS lists (
    list_id SERIAL NOT NULL PRIMARY KEY,
    list_name VARCHAR(255) NOT NULL ,
    private BOOLEAN default false,
    viewed INTEGER DEFAULT 0,
    copied INTEGER DEFAULT 0, 
    student_id VARCHAR(30) NOT NULL REFERENCES students(student_id)
    ON UPDATE CASCADE 
    ON DELETE CASCADE
);