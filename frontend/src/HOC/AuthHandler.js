import React , {useState} from 'react';
import { useNavigate } from "react-router-dom";

const AuthHandler = (Comp)=>{
    return (props)=>{
        const [auth,setAuth] = useState(false)
        const nav = useNavigate()
        if(!auth){
            return nav('/signin')    
        }
        return ( <Comp {...props} auth = {auth}/>)
    }
}
export default AuthHandler;