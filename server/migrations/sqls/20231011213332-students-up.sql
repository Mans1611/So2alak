/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS students 
(
	student_id INTEGER PRIMARY KEY NOT NULL ,
	studnet_name VARCHAR(90) NOT NULL,
	student_level VARCHAR(60) NOT NULL,
	password VARCHAR(255) NOT NULL,
	points INTEGER DEFAULT 0
)