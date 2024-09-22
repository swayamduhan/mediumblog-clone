import { useLocation, useNavigate } from "react-router-dom"
import { ProfileMenu } from "./ProfileMenu"
import { ContactMenu } from "./Contact"
  

export const Navbar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const username = localStorage.getItem('username')?.split(" ")[0] || "Unknown"
    return <div className="h-16 flex justify-between lg:p-4 items-center shadow-md fixed w-screen top-0 bg-white z-10 bg-opacity-95">
        <div className="font-semibold text-2xl ml-2 lg:ml-6 cursor-pointer" 
        onClick={()=>{
            navigate("/blogs")
        }}>
            JaatBlog
        </div>
        <div className="flex items-center">
            {location.pathname == '/publish'? <></> : <button className="ml-2 mr-2 lg:mr-5 text-sm bg-green-300 p-1 rounded-2xl pl-4 pr-4 font-semibold" onClick={()=>navigate('/publish')}>Publish</button>}
            <div className="mr-2 lg:mr-4"><ContactMenu /></div>
            <div className="mr-2"><ProfileMenu name={username}/></div>
            {window.innerWidth > 1000 && <div className="relative inline-flex items-center justify-center w-10 h-10 ml-5 mr-5 overflow-hidden bg-gray-400 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-200 dark:text-gray-300">{username[0]}</span>
            </div>}
        </div>
    </div>
}