import React , {useContext, useEffect, useMemo, useRef, useState} from 'react'
import {dates} from '../../utilis/getOneYearDates';
import axios from 'axios';
import { AppState } from '../../App';

const Calander = ({user_id}) => {
    const calander = useMemo(()=>dates,[]);
    const [activeDates,setActiveDates] = useState([]);
    const {stundetInfo} = useContext(AppState);
    useEffect(()=>{
        const fetchCalander = async()=>{
            try{
                const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/person/get_activity_log/${user_id}`);
                
                const dates = data.dates?.map(date=>new Date(`${date.slice(3,5)}-${date.slice(0,2)}-${date.slice(6,10)}`).toDateString());
                
                
                const redecued = dates.reduce((prev,cur)=>{
                    const key = cur.split(' '); 
                    if (prev[key[3]+'-'+key[1]]){
                        prev[key[3]+'-'+key[1]].push(cur)
                    }else{
                        prev[key[3]+'-'+key[1]] = [cur];
                    }
                    return prev 
                },{});

                setActiveDates(redecued)

                
            }catch(err){
                console.log(err)
            }
        }
        fetchCalander();
    },[])
    
  return (
    <div className='lower_in'>
        <h1>Activity Calendar</h1>
        <div className='calendar'>
            {Object.keys(calander).map(month => <Month 
            key={month}
            activeDates = {activeDates[month]?[...new Set(activeDates[month])]:[]}
            days = {calander[month]} // here i am passing the days of each month.
            month={month}/>         // here i am passing the month name which is the key in the object.
                )}
           
        </div>
    </div>
  )

}
const daysToNum = {
    "Sat": 0 ,
    "Sun": 1 ,
    "Mon": 2 ,
    "Tue": 3 ,
    "Wed": 4 ,
    "Thu": 5 ,
    "Fri": 6 
}
const Month = ({month,days,activeDates})=>{
   let i = 0;
   if (activeDates.length>0)
    console.log(activeDates)
    return (
        <div className='month'>
                <div className='cells'>
                    {days.map((day,key) =>{ 
                        if (day==activeDates[i])
                            i++;
                    return(
                        <div onClick={()=>console.log(day)}
                                key={key}
                                style={{
                                gridColumn: (parseInt(day.split(" ")[2]) + daysToNum[days[0].split(" ")[0]] - 1) / 7 % 1 === 0 ? 
                                ((parseInt(day.split(" ")[2]) + daysToNum[days[0].split(" ")[0]] -1) / 7) + 1 : 
                                Math.ceil((parseInt(day.split(" ")[2]) + daysToNum[days[0].split(" ")[0]] -1) / (7 + parseInt(days[0].split(" ")[2])%7 - 1)),
                                gridRow: daysToNum[day.split(" ")[0]] + 1
                            }} 
                        className={`cell ${day == activeDates[i-1]? 'active':'passive'}`}></div>
                        )
                    })}
                </div>
                <div className='month_name'>{month.split("-")[1]}</div>
            </div>
    )
}
export default Calander