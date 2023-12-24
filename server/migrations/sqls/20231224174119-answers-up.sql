CREATE TABLE IF NOT EXISTS answers(
    answer_id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL
    REFERENCES questions(question_id) 
    ON UPDATE CASCADE
	ON DELETE SET NULL,
                                                                                                            
    student_id VARCHAR(30) NOT NULL
    REFERENCES students(student_id) 
    ON UPDATE CASCADE
	ON DELETE SET NULL,
    answer TEXT NOT NULL,
	upvotes INTEGER DEFAULT 0,
	downvotes INTEGER DEFAULT 0,
 	verified BOOLEAN default false
);