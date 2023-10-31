/* Replace with your SQL commands */




CREATE TABLE IF NOT EXISTS courses (
    course_id varchar(30) PRIMARY KEY NOT NULL,
    course_name varchar(90)  NOT NULL,

    course_department varchar(30)
    REFERENCES sub_departments(department_id)	
    ON UPDATE CASCADE
	ON DELETE SET NULL,

    course_level varchar(30) NOT NULL 
    REFERENCES levels (level_id) 
    ON UPDATE CASCADE 
    ON DELETE SET NULL
)