import { GiveSimpleBadge } from "./GiveSimpleBadge.js";
import { MakeActivity } from "./MakeActivitylog.js";

export const AfterQuestion = async(student_id,questionDetails,course_id,con)=>{
    const badge = await GiveSimpleBadge(student_id,'First Question',course_id,con)
    await MakeActivity(student_id,'ask',questionDetails?.rows[0].question_id,4,con,null);
    return badge;
}