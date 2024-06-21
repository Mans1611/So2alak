

const MIN = 60*1000;
const HOUR = 60*MIN;


export const getTime = (time)=>{
    const remining = new Date().getTime() - new Date(time);
    if (remining/HOUR < 1){
        // this means that the post posted less than one hour, so i will return the minutes.
        return `${Math.ceil(remining / MIN )} min ago`; 
    } 
    else if (remining/HOUR >= 1 && remining/HOUR < 24){
        return ` ${Math.ceil(remining / HOUR )} hrs ago`; 
    }
    else {
        return `@ ${new Date(time).toDateString()}`
    }
}