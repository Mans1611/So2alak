
function getDatesBetween(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate).toDateString());
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }
const today = new Date();
// Get the date one year ago
const oneYearAgo = new Date();
oneYearAgo.setFullYear(today.getFullYear() - 1);
const datesInRange = getDatesBetween(oneYearAgo,today);

let months = {}

export const dates = datesInRange.reduce((acc,curr)=>{
    if (acc[`${curr.split(" ")[3]}-${curr.split(" ")[1]}`]){
        acc[`${curr.split(" ")[3]}-${curr.split(" ")[1]}`].push(curr)
    }
    else{
        acc[`${curr.split(" ")[3]}-${curr.split(" ")[1]}`] = [curr]
    }
    return acc
},months)

