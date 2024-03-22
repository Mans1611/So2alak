import React , {useRef} from 'react'

const Calander = () => {
    const currentDate = new Date().toDateString().split(" ").slice(0, 4)[1].toLowerCase();
    const months = Array(12).fill(Array(30).fill(0));
    const months_refs  = Array(12).fill(useRef(null));
    const months_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className='lower_in'>
        <h1>Activity Calendar</h1>
        <div className='calendar'>
            {months.map((month, index) =>
                <div ref={months_refs[index]} className='month'>
                    <div className='cells'>
                        {month.map((cell) => <div className={`cell ${cell? "active":"passive"}`}></div>)}
                    </div>
                    <div className='month_name'>{months_names[index]}</div>
                </div>)}
        </div>
    </div>
  )
}

export default Calander