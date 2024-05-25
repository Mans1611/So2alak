import React, { useEffect,useRef, useState } from 'react'
import * as d3 from 'd3';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DataFilter from './DataFilter';

const PiChartData = () => {
   const [data,setData] = useState([]);
    const ref = useRef();
    const {teacher_id} = useParams();
    const [filter,setFilter] = useState('Total Number Of question');
    useEffect(() => {
        const fetchData = async()=>{
            try{
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/teacher/data?teacher_id=${teacher_id}&dataType=${filter}`)
                if(response.status === 200){
                    setData(response.data)
                }
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
        const svg = d3.select(ref.current);
        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2;
        const innerRadius = radius * 0.7;
        // Clear previous contents
        svg.selectAll('*').remove();
    
        const color = d3.scaleOrdinal()
          .domain(data.map(d => d.course_name))
          .range(d3.schemeCategory10);
    
        const pie = d3.pie()
          .value(d => d.total);
    
        const arc = d3.arc()
          .innerRadius(innerRadius)
          .outerRadius(radius);
    
        const pieGroup = svg.append('g')
          .attr('transform', `translate(${width / 2},${height / 2})`);
    
        const arcs = pieGroup.selectAll('arc')
          .data(pie(data))
          .enter()
          .append('g')
          .attr('class', 'arc');
    
        arcs.append('path')
          .attr('d', arc)
          .attr('fill', d => color(d.data.course_name));
       
        arcs.append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('text-anchor', 'start')
        .attr('alignment-baseline', 'end')
        .text(d => d.data.total)
        .style('fill', '#fff');
      }, [filter]);  
      

  return (
    <div className='chart-container'>
        <h1>{filter}</h1>
        <div className='flex-chart'>
            <DataFilter filter={filter} setFilter={setFilter}/>
            <svg ref={ref} width={400} height={400}></svg>
        </div>
    </div>
  )
}

export default PiChartData