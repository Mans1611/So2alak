export const AggregateQuestionsAnswers = (data)=>{
    let ids =  {} // the id of each question and it corresponding index in the array 
    let newData=[]
    let i = 0;``
    data.forEach(({question_id,question,q_username,q_upvotes,q_verified,course_code,answer,ans_username,ans_upvotes,ans_downvotes,ans_time})=>{
        if (!ids[question_id]){ // new questoin id .
            if (answer == null)
                newData.push({
                    question_id,
                    question,
                    q_username,
                    q_upvotes,
                    q_verified,
                    course_code,
                    answers: []})
            else{
                newData.push({
                    question_id,
                    question,
                    q_username,
                    q_upvotes,
                    q_verified,
                    course_code,
                    answers: [{answer,ans_time,ans_username,ans_upvotes,ans_downvotes}]
                })
            }
            ids[question_id] = i++;
        }
        else {
            newData[ids[question_id]]['answers'].push({answer,ans_time,ans_username,ans_upvotes,ans_downvotes})
        }
    })
    return newData;
}