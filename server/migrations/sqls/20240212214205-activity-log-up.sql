/* Replace with your SQL commands */
CREATE TABLE activity_log (
    student_id VARCHAR(30) NOT NULL
    REFERENCES students(student_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,

    question_id INTEGER  
    REFERENCES questions(question_id)
    ON UPDATE CASCADE
    ON DELETE SET NULL,


    ans_id INTEGER 
    REFERENCES answers(answer_id)
    ON UPDATE CASCADE
    ON DELETE SET NULL,

    activity_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activity_type VARCHAR(30) CHECK (activity_type IN ('ask','answer')) 
    
);