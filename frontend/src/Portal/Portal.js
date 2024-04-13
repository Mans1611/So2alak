
import {createPortal} from "react-dom";
import './portal.scss'

const Portal = ({children})=>{
    const portal =  document.getElementById('portal')
    return createPortal(children,portal)
}

export default Portal; 