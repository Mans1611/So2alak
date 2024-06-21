import { useEffect, useRef } from "react";

export const useHidePop = (setShowToggleList)=>{
    const divRef = useRef(null);
    const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            setShowToggleList(false);
        }
    };
    useEffect(()=>{
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
        // Cleanup the event listener on component unmount
        document.removeEventListener('mousedown', handleClickOutside);
        };

    })
    return {divRef} 
}
