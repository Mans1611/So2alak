
CREATE TABLE  IF NOT EXISTS files(
    id Serial PRIMARY KEY NOT NULL,
    filename VARCHAR(255) NOT NULL,
    mimtype VARCHAR(255) NOT NULL,
    data BYTEA
);

CREATE TABLE IF NOT EXISTS departments (
	department_id VARCHAR(30) NOT NULL PRIMARY KEY
);
CREATE TABLE IF NOT EXISTS sub_departments (
	department_id VARCHAR(30) PRIMARY KEY,
	department_name VARCHAR(150) NOT NULL,
	belongs_to VARCHAR(30)  
    REFERENCES departments(department_id)
	ON UPDATE CASCADE
	ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS levels(
	level_id VARCHAR(20) PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS courses(
    course_id VARCHAR(30) PRIMARY KEY NOT NULL,
    course_name VARCHAR(90)  NOT NULL,
    course_department VARCHAR(30)
    REFERENCES sub_departments(department_id)	
    ON UPDATE CASCADE
	ON DELETE SET NULL,
    course_level VARCHAR(30)
    REFERENCES levels (level_id) 
    ON UPDATE CASCADE 
    ON DELETE SET NULL,
	course_logo integer 
	REFERENCES files (id) 
	ON UPDATE CASCADE
	ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS students(

	student_id VARCHAR(30) PRIMARY KEY NOT NULL ,
	username VARCHAR(150) UNIQUE NOT NULL,
	student_level VARCHAR(60) NOT NULL,
	student_department VARCHAR(40) ,
	password VARCHAR(255) NOT NULL,
	points INTEGER DEFAULT 0,
	student_subDepartment VARCHAR(30),
	
	FOREIGN KEY (student_subDepartment)
	REFERENCES sub_departments(department_id)
	ON UPDATE CASCADE
	ON DELETE SET NULL,
	FOREIGN KEY (student_department) REFERENCES departments (department_id)
	ON UPDATE CASCADE
	ON DELETE SET NULL,
	FOREIGN KEY (student_level) REFERENCES levels (level_id)
	ON UPDATE CASCADE
	ON DELETE SET NULL
);



CREATE TABLE IF NOT EXISTS students_courses (
    student_name VARCHAR(30) NOT NULL
    REFERENCES students(username) 
    ON UPDATE CASCADE
	ON DELETE CASCADE,
    
    course_id VARCHAR(30) NOT NULL
    REFERENCES courses(course_id) 
    ON UPDATE CASCADE
	ON DELETE CASCADE 
);

CREATE TYPE  teachers_title AS ENUM('Doctor','TA'); 
CREATE TABLE IF NOT EXISTS teachers(
	name VARCHAR(120) NOT NULL ,
	id VARCHAR(30) NOT NULL PRIMARY KEY,
	title teachers_title,
	department VARCHAR(30) NOT NULL 
	REFERENCES sub_departments(department_id)
	ON UPDATE CASCADE
	ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS questions(
    question_id SERIAL PRIMARY KEY,
    course_id VARCHAR(30) NOT NULL
    REFERENCES courses(course_id) 
    ON UPDATE CASCADE
	ON DELETE SET NULL,
    q_username VARCHAR(30) NOT NULL
    REFERENCES students(username) 
    ON UPDATE CASCADE
	ON DELETE SET NULL,
    question TEXT NOT NULL,
	q_upvotes INTEGER DEFAULT 0,
 	q_verified BOOLEAN default false,
    q_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fav_questions (
	s_id VARCHAR(30) 
	REFERENCES students(student_id)
	ON UPDATE CASCADE
	ON DELETE CASCADE,
	username VARCHAR(150) 
	REFERENCES students(username),
	q_id INTEGER REFERENCES questions(question_id) 
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS answers(
    answer_id SERIAL PRIMARY KEY,
    q_id INTEGER
    REFERENCES questions(question_id) 
    ON UPDATE CASCADE
	ON DELETE SET NULL,
                                                                                                            
    ans_username VARCHAR(30)
    REFERENCES students(username) 
    ON UPDATE CASCADE
	ON DELETE SET NULL,
    answer TEXT NOT NULL,
	ans_upvotes INTEGER DEFAULT 0,
	ans_downvotes INTEGER DEFAULT 0,
 	ans_verified BOOLEAN default false,
    ans_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

-- INSERT INTO departments 
-- (department_id)
-- VALUES ('Electrical');

-- INSERT INTO departments 
-- (department_id)
-- VALUES ('Mechinical');

-- INSERT INTO sub_departments 
-- (department_id,department_name,belongs_to)
-- VALUES ('MPP','Production & Power','Mechinical');


-- INSERT INTO sub_departments 
-- (department_id,department_name,belongs_to)
-- VALUES ('CSE','Computer & System','Electrical');

-- INSERT INTO sub_departments 
-- (department_id,department_name,belongs_to)
-- VALUES ('EPM','Power & Machines','Electrical');

-- INSERT INTO sub_departments 
-- (department_id,department_name,belongs_to)
-- VALUES ('ECE','Electronics & Communication','Electrical');

-- INSERT INTO sub_departments 
-- (department_id,department_name,belongs_to)
-- VALUES ('MPE','Mechinical & Power','Mechinical');


-- INSERT INTO levels (level_id) VALUES ('Freshmen');
-- INSERT INTO levels (level_id) VALUES ('Somophore');
-- INSERT INTO levels (level_id) VALUES ('Joinior');
-- INSERT INTO levels (level_id) VALUES ('Senior1');
-- INSERT INTO levels (level_id) VALUES ('Senior2');





-- INSERT INTO courses (course_id,course_name,course_department,course_level)
-- VALUES ('CSE451','Data Science','CSE','Senior2');

-- INSERT INTO courses (course_id,course_name,course_department,course_level)
-- VALUES ('CSE351','Data Structure','CSE','Senior1');