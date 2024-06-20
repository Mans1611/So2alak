export const AggregateQuestionsAnswers = (data)=>{
    let ids =  {} // the id of each question and it corresponding index in the 
    let i = 0;
    let quest = []
    data.forEach(({question_id,q_time,question,q_username,q_upvotes,q_verified,course_id,course_name,answer,ans_username,ans_upvotes,activity_type,ans_downvotes,ans_time,ans_verified,id,img_url,answer_id,ans_img_url})=>{
        if (ids[question_id] === undefined){ 
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
                    id,
                    img_url,
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
                    img_url,
                    answers: [{answer,answer_id,ans_img_url,ans_time,ans_username,ans_upvotes,upvoted :activity_type==='upvote',downvoted:activity_type==='downvote',ans_downvotes,ans_verified}]
            })
            }
        }
        else {
            if(answer){
                quest[ids[question_id]]['answers'].push({answer,answer_id,ans_img_url,ans_time,ans_username,ans_upvotes,upvoted :activity_type==='upvote',downvoted:activity_type==='downvote',ans_downvotes,ans_verified})
            }
                
        }
    })
    return quest;

}