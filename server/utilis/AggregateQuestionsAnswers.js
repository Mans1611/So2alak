export const AggregateQuestionsAnswers = (data)=>{
    let ids =  {} // the id of each question and it corresponding index in the array 
    let newData=[]
    let i = 0;
    data.forEach(({question_id,question,q_username,q_upvotes,q_verified,course_code,answer,ans_username,ans_upvotes,ans_downvotes,ans_time,ans_verified,id,filename,mimtype,data})=>{
        
        if (!ids[question_id]){ 
            if (answer == null)
                newData.push({
                    question_id,
                    question,
                    q_username,
                    q_upvotes,
                    q_verified,
                    course_code,
                    filename,
                    id,
                    mimtype,
                    data,
                    answers: []})
            else{
                let ans_sort = 0;
                newData.push({
                    question_id,
                    question,
                    q_username,
                    q_upvotes,
                    q_verified,
                    id,
                    filename,
                    mimtype,
                    data,
                    course_code,
                    answers: [{answer,ans_time,ans_username,ans_upvotes,ans_downvotes,ans_verified}]
                })
            }
            ids[question_id] = i++;
        }
        else {
            newData[ids[question_id]]['answers'].push({answer,ans_time,ans_username,ans_upvotes,ans_downvotes,ans_verified})
        }
    })
    return newData;
}