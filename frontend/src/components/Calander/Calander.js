import React , {useMemo, useRef} from 'react'
import {dates} from '../../utilis/getOneYearDates';

const Calander = () => {
    const currentDate = new Date().toDateString().split(" ").slice(0, 4)[1].toLowerCase();
    const months = Array(12).fill(Array(30).fill(0));
    const months_refs  = Array(12).fill(useRef(null));
    const months_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const calander = useMemo(()=>dates,[]);
  return (
    <div className='lower_in'>
        <h1>Activity Calendar</h1>
        <div className='calendar'>
            {Object.keys(calander).map(month => <Month 
            key={month}
            days = {calander[month]} // here i am passing the days of each month.
            month={month}/>         // here i am passing the month name which is the key in the object.
                )}
        </div>
    </div>
  )
}
const daysToNum = {
    "Sat": 1 ,
    "Sun": 2 ,
    "Mon": 3 ,
    "Tue": 4 ,
    "Wed": 5 ,
    "Thu": 6 ,
    "Fri": 7 ,
}
const Month = ({month,days})=>{
    return (
        
        <div className='month'>
                <div className='cells'>
                    {days.map(day => <div
                        onMouseOver={()=>console.log(day)}
                        style={{
                        gridColumn: Math.ceil(day.split(" ")[2]/7),
                        gridRow: daysToNum[day.split(" ")[0]]
                    }} 
                    className={`cell passive`}></div>)}
                </div>
                <div className='month_name'>{month.split("-")[1]}</div>
            </div>
    )
}
export default Calander