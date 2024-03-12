


export const getTime = (time)=>{
    const remining = Date.now() - new Date(time);
    const day = 1000 * 24 * 60 * 60; 
    if ((remining / day) >= 1) 
        return new Date(time).toDateString()
}