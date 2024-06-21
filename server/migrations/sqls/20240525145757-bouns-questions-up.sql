CREATE TABLE IF NOT EXISTS bouns_questions(

    question text NOT NULL ,
    course_id VARCHAR(30) NOT NULL 
    REFERENCES courses(course_id)
    ON UPDATE CASCADE 
    ON DELETE SET NULL,
    teacher_id VARCHAR(90) NOT NULL 
    REFERENCES teachers(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL


);