import { useNavigate } from "react-router-dom"

export function Null(){
    const navigate = useNavigate();
    navigate('/auth')
    return(
        <div className="p-10">
            <pre>Go to /auth</pre>
        </div>
    )
}