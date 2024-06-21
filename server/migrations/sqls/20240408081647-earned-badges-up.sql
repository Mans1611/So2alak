


CREATE TABLE IF NOT EXISTS earned_badges(
    student_id VARCHAR(30) NOT NULL 
    REFERENCES students(student_id)
    ON UPDATE CASCADE
    ON DELETE SET NULL,
    badge_name VARCHAR(90) NOT NULL,
    course_id VARCHAR(30)
    REFERENCES courses(course_id) 
    ON UPDATE CASCADE
    ON DELETE SET NULL,
    time_taken TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);