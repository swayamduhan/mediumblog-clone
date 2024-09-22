import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "@/config"

export const useBlogs = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<{id : string, title : string, content : string, publishedDate : string, author : {name : string}}[]>([])


    useEffect(()=>{
        try{
            axios({
                url : `${BACKEND_URL}api/v1/blog/bulk`,
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                },
                method : 'GET'
            }).then((res)=>{
                setBlogs(res.data)
                setLoading(false)
            })
        } catch(e) {
            console.log(e)
        }
    }, [])
    
    return {loading, blogs}
}

export const useBlog = (id: string) => {
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<{id : string, title : string, content : string, publishedDate : string, author : {name : string}}>()


    useEffect(()=>{
        try{
            axios({
                url : `${BACKEND_URL}api/v1/blog/${id}`,
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                },
                method : 'GET'
            }).then((res)=>{
                setBlog(res.data)
                setLoading(false)
            })
        } catch(e) {
            console.log(e)
        }
    }, [])

    return {loading, blog}
}