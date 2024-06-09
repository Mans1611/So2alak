import React, { useEffect, useState } from 'react';
import './trending.scss';
import axios from 'axios';
const Trending = ({top}) => {
  const [trending,setTrending] = useState([]);

  useEffect(()=>{
    const fetchTrend = async()=>{
      try{
        const {status,data} = await axios.get(`${process.env.REACT_APP_TRENDING_API_URL}/trending/trending`);
        if(status === 200) 
          setTrending(data?.data)
        
      }catch(err){
        console.log(err);
      }
    }
    fetchTrend()
  },[])
  return (
    <div style={top?{top:`${top+110}px`}:{top:'90px'}} className='third_part_child trending'>
        <div className="header">
            <h1 className='box-title'>Trending</h1>
            {
              trending.length > 0 ? 
              trending.map((trend,key)=><Trend trend={trend} key={key}/>):
              <h4 style={{textAlign:'center',marginTop:'50px'}}>No Trending Topics</h4>
            }
        </div>
    </div>
  )
}
const Trend =({trend})=>{
  return(
    <div className='trend'>
      <h2 className='trend_title'>{trend[0]}</h2>
      <span>{trend[1]}</span>
    </div>
  )
}
export default Trending