import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchLists =(student_id,sameUser=true)=>{
    const [lists,setLists] = useState([]);
    useEffect(()=>{
        const fetchLists = async()=>{
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/lists/allLists/${student_id}?sameUser=${sameUser}`)
          if (res.status === 200){
            setLists(res.data.data);
          }
        }
        if (student_id)
          fetchLists();
      }
      ,[])
      return [lists,setLists];
}