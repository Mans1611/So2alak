/* Replace with your SQL commands */




CREATE TABLE IF NOT EXISTS courses (
    course_id VARCHAR(30) PRIMARY KEY NOT NULL,
    course_name VARCHAR(90)  NOT NULL,
    course_department VARCHAR(30)
    REFERENCES sub_departments(department_id)	
    ON UPDATE CASCADE
	ON DELETE SET NULL,

    course_level VARCHAR(30) NOT NULL 
    REFERENCES levels (level_id) 
    ON UPDATE CASCADE 
    ON DELETE SET NULL
)


-- INSERT INTO courses (course_id,course_name,course_department,course_level)
-- VALUES ('CSE451','Data Science','CSE','Senior2');

-- INSERT INTO courses (course_id,course_name,course_department,course_level)
-- VALUES ('CSE351','Data Structure','CSE','Senior1');