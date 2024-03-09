import {createPortal} from "react-dom";


const Portal = ()=>{
    const portaldom =  document.getElementById('portal')
    return createPortal(
        'mansour is an idiot',
        portaldom)

}

export default Portal; 