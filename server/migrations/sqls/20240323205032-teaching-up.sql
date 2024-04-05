

CREATE TABLE IF NOT EXISTS teaching (
    teacher_id VARCHAR(30) NOT NULL 
    REFERENCES teachers(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    course_id VARCHAR(30) NOT NULL 
    REFERENCES courses(course_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    teacher_name VARCHAR(90), 
    course_name VARCHAR(90),
    points INTEGER DEFAULT 0  
);
