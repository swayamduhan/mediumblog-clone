import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export function Null(){
    const navigate = useNavigate();
    useEffect(()=>{
        navigate('/auth')
    }, [])
    return(
        <></>
    )
}