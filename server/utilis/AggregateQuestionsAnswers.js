export const AggregateQuestionsAnswers = (data)=>{
    let ids =  {} // the id of each question and it corresponding index in the array 
    let newData=[]
    let i = 0;
    data.forEach(({question_id,q_time,question,q_username,q_upvotes,q_verified,course_id,course_name,answer,ans_username,ans_upvotes,ans_downvotes,ans_time,ans_verified,id,filename,mimtype,data})=>{
        
        if (!ids[question_id]){ 
            if (answer == null){
                ids[question_id] = {
                    question_id,
                    question,
                    q_username,
                    q_upvotes,
                    q_time,
                    q_verified,
                    course_id,
                    course_name,
                    filename,
                    id,
                    mimtype,
                    data,
                    answers: []}
                }
               else{
                ids[question_id] = {
                    question_id,
                    question,
                    q_username,
                    q_upvotes,
                    q_time,
                    q_verified,
                    course_name,
                    course_id,
                    id,
                    filename,
                    mimtype,
                    data,
                    answers: [{answer,ans_time,ans_username,ans_upvotes,ans_downvotes,ans_verified}]
                }
            }
            
        }
        else {
            ids[question_id]['answers'].push({answer,ans_time,ans_username,ans_upvotes,ans_downvotes,ans_verified})
            
        }
    })
    return ids;
}