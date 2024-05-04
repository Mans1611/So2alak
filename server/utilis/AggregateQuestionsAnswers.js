export const AggregateQuestionsAnswers = (data)=>{
    let ids =  {} // the id of each question and it corresponding index in the 
    let i = 0;
    let quest = []
    data.forEach(({question_id,q_time,question,q_username,q_upvotes,q_verified,course_id,course_name,answer,ans_username,ans_upvotes,activity_type,ans_downvotes,ans_time,ans_verified,id,filename,mimtype,data})=>{
        
        if (!ids[question_id]){ 
            if (answer == null){ // has no answer.
                ids[question_id] = i++;
                quest.push({
                    question_id,
                    question,
                    q_username,
                    q_upvotes,
                    helped : activity_type==='help',
                    q_time,
                    q_verified,
                    course_id,
                    course_name,
                    filename,
                    id,
                    mimtype,
                    data,
                    answers: []})
                }
               else{// this means that the question has an answer
                ids[question_id] = i++;
                quest.push({
                    question_id,
                    question,
                    q_username,
                    q_upvotes,
                    q_time,
                    q_verified,
                    course_name,
                    course_id,
                    helped : activity_type==='help',
                    id,
                    filename,
                    mimtype,
                    data,
                    answers: [{answer,ans_time,ans_username,ans_upvotes,upvoted :activity_type==='upvote',downvoted:activity_type==='downvote',ans_downvotes,ans_verified}]
            })
            }
        }
        else {
            quest[ids[question_id]]['answers'].push({answer,ans_time,ans_username,ans_upvotes,upvoted :activity_type==='upvote',downvoted:activity_type==='downvote',ans_downvotes,ans_verified})
            
        }
    })
    return quest;

}