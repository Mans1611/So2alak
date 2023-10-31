/* Replace with your SQL commands
 */
 

CREATE TABLE IF NOT EXISTS departments (
	department_id VARCHAR(30) NOT NULL PRIMARY KEY
);
CREATE TABLE IF NOT EXISTS sub_departments (
	department_id VARCHAR(30) NOT NULL PRIMARY KEY,
	department_name VARCHAR(150) NOT NULL,
	belongs_to VARCHAR(30) NOT NULL 
    REFERENCES departments(department_id)
	ON UPDATE CASCADE
	ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS levels(
	level_id VARCHAR(20) PRIMARY KEY NOT NULL
); 

CREATE TABLE IF NOT EXISTS students 
(
	student_id INTEGER PRIMARY KEY NOT NULL ,
	studnet_name VARCHAR(90) NOT NULL,
	student_level VARCHAR(60) NOT NULL,
	student_department VARCHAR(60) NOT NULL,
	password VARCHAR(255) NOT NULL,
	points INTEGER DEFAULT 0,
	FOREIGN KEY (student_department) REFERENCES departments (department_id)
	ON UPDATE CASCADE
	ON DELETE SET NULL,
	FOREIGN KEY (student_level) REFERENCES levels (level_id)
	ON UPDATE CASCADE
	ON DELETE SET NULL
);


INSERT INTO departments 
(department_id)
VALUES ('Electrical');

 INSERT INTO departments 
(department_id)
VALUES ('Mechinical');

INSERT INTO sub_departments 
(department_id,department_name,belongs_to)
VALUES ('MPE','Mechinical & Power','Mechinical');


INSERT INTO sub_departments 
(department_id,department_name,belongs_to)
VALUES ('CSE','Computer & System','Electrical');

INSERT INTO sub_departments 
(department_id,department_name,belongs_to)
VALUES ('EPM','Power & Machines','Electrical');

INSERT INTO sub_departments 
(department_id,department_name,belongs_to)
VALUES ('ECE','Electronics & Communication','Electrical');

INSERT INTO sub_departments 
(department_id,department_name,belongs_to)
VALUES ('MPE','Mechinical & Power','Mechinical');


INSERT INTO levels (level_id) VALUES ('Freshmen');
INSERT INTO levels (level_id) VALUES ('Somophore');
INSERT INTO levels (level_id) VALUES ('Joinior');
INSERT INTO levels (level_id) VALUES ('Senior1');
INSERT INTO levels (level_id) VALUES ('Senior2');


INSERT INTO courses (course_id,course_name,course_department,course_level)
VALUES ('CSE451','Data Science','CSE','Senior2');

INSERT INTO courses (course_id,course_name,course_department,course_level)
VALUES ('CSE351','Data Structure','CSE','Senior1');