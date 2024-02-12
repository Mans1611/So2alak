import sys
import json

arguments = sys.argv[1:]

def sum (num1,num2):
    return num1+num2



data = {"result":sum(3,4),"idiot":True}
print(json.dumps(data))


# SELECT * FROM questions;
# SELECT * FROM students;
# SELECT * FROM courses;
# SELECT * FROM students_courses;
# SELECT * FROM answers;
# SELECT * FROM activity_log;

# SELECT * FROM students 
# WHERE username = 'Mansour';
		
# SELECT COUNT (q_username) as no_questions, q_username FROM questions 
# WHERE q_username = 'Ahmed'
# GROUP BY q_username;

# INSERT INTO students_courses (student_name,course_id)
# VALUES('Ahmed','CSE451')


# SELECT * FROM questions 
# WHERE course_id = 'CSE351'
# ORDER BY q_time DESC

# SELECT q.q_time,q.question,q_upvotes,ans_time, ARRAY_AGG(answer_id) as answers
# FROM questions AS q
# LEFT JOIN answers AS ans ON ans.q_id = q.question_id 
# GROUP BY question_id,
# 		ans.answer,
# 		ans.ans_time,
# 		ans.ans_username
# 		ORDER BY q.q_time DESC;
			
# INSERT INTO answers (q_id,ans_username,answer) 
# VALUES (1,'Ahmed','انت راجل محترم');

# SELECT * FROM questions AS q
# LEFT JOIN answers AS ans ON ans.q_id = q.question_id 
# ORDER BY q.q_time DESC;