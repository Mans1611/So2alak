/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS questions(
    question_id SERIAL PRIMARY KEY,
    course_id VARCHAR(30) NOT NULL
    REFERENCES courses(course_id) 
    ON UPDATE CASCADE
	ON DELETE SET NULL,
                                                                                                            
    student_id VARCHAR(30) NOT NULL
    REFERENCES students(student_id) 
    ON UPDATE CASCADE
	ON DELETE SET NULL,
    question TEXT NOT NULL,
	upvotes INTEGER DEFAULT 0,
 	verified BOOLEAN default false
);