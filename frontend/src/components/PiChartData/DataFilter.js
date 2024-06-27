import React from 'react'

const DataFilter = ({filter,setFilter}) => {
  

    return (
        <div className='data-filter'>
            <h3 onClick={()=>{setFilter('Total Number Of unsolved Questions')}} className={`${filter === 'Total Number Of unsolved Questions'?'active':''}`}>Total Number Of unsolved Questions</h3>
            <h3 onClick={()=>{setFilter('Total Number Of Studnets')}} className={`${filter === 'Total Number Of Studnets'?'active':''}`}>Total Number Of Studnets</h3>
        </div>
    )
}

export default DataFilter