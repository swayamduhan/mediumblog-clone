import { Navbar } from "@/components/Navbar"
import { useState } from "react"
import { Loader2 } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useNavigate } from "react-router-dom";
import { ErrorAlert } from "@/components/ui/error";

export const Publish = () => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const navigate = useNavigate()
    
    const publishBlog = async() => {
        setError(false)
        if(!title || title.trim().length == 0 || !content || content.trim().length == 0){
            setError(true)
            setErrorMessage("Empty fields not allowed")
            return;
        }
        setLoading(true)
        try{
            const postData = {
                title,
                content
            }
            await axios({
                method : 'post',
                url : `${BACKEND_URL}api/v1/blog`,
                data : postData,
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log("Blog post success!")
            navigate('/blogs')
        } catch(e) {
            setError(true)
            setErrorMessage("Unable to post blog, Try again :(")
        } finally {
            setLoading(false)
        }
    }

    return <>
        <Navbar />
        {error && 
        <div className="w-full top-14 fixed flex justify-center">
            <div className="w-1/5">
                <ErrorAlert title={errorMessage}/>
            </div>
        </div> 
        }
        <div className="lg:ml-28 mt-24 lg:mt-32 lg:grid lg:grid-cols-3">
            <div className="lg:col-span-2 mr-3 ml-3">
                <div className="flex justify-start items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.7} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                    </svg>
                    <div className="h-16 ml-2 w-[2px] bg-slate-200"></div>
                    <input id="title" className="w-full ml-3 text-4xl lg:text-5xl font-serif focus:outline-none h-auto" placeholder="Title" onChange={(e)=>{setTitle(e.target.value)}}/>
                </div>
                <textarea className="font-serif ml-16 text-xl mt-6 w-3/4 lg:w-full outline-none resize-none" rows={window.innerWidth > 1000 ? 25 : 20} placeholder="Tell your story ..." onChange={(e)=>setContent(e.target.value)}/>
            </div>
            <div className="text-right mr-28 mt-4">
                {loading ? 
                <button disabled className="py-6 pl-12 border rounded-lg px-8 text-2xl font-bold text-white bg-slate-800 hover:shadow-xl transition ease-in w-2/3 relative">
                    <Loader2 className="animate-spin absolute top-7 left-7"/>
                    Publishing ...
                </button>
                : 
                <button className="py-6 border rounded-lg px-8 text-2xl font-bold text-white bg-black hover:shadow-xl transition ease-in w-2/3" onClick={publishBlog}>Publish</button>
                }
            </div>
        </div>
        
    </>
}
