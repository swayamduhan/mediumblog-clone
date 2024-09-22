import { Navbar } from "@/components/Navbar"
import { useBlog } from "@/hooks/useBlogs"
import { Skeleton } from "@/components/ui/skeleton"
import { useParams } from "react-router-dom"

export const BlogPage = () => {
    const { id } = useParams()
    const {loading, blog} = useBlog(id || "")

    // @ts-ignore
    const date = new Date(blog?.publishedDate).toDateString().split(' ')
    const str = `${date[2]} ${date[1]}, ${date[3]}`
    return <>
        <Navbar />
        <div className="mt-24 lg:p-4">
            {loading ? 
            <div className="grid grid-cols-3">
                <div className="ml-10 col-span-2 p-2">
                    <Skeleton className="w-full h-20"/>
                    <div className="mt-10">
                        <Skeleton className="w-full h-6 mb-2"/>
                        <Skeleton className="w-full h-6 mb-2"/>
                        <Skeleton className="w-full h-6 mb-2"/>
                        <Skeleton className="w-full h-6 mb-2"/>
                        <Skeleton className="w-full h-6 mb-2"/>
                        <Skeleton className="w-full h-6 mb-2"/>
                        <Skeleton className="w-full h-6 mb-2"/>
                        <Skeleton className="w-full h-6 mb-2"/>
                        <Skeleton className="w-full h-6 mb-2"/>
                        <Skeleton className="w-full h-6 mb-2"/>
                        <Skeleton className="w-full h-6 mb-2"/>
                    </div>
                </div>
                <div className="pt-10 ml-5 mr-5">
                    <Skeleton className="h-96 w-full"/>
                </div>
            </div>
            : 
            <div className="grid grid-cols-3">
                <div className="ml-6 lg:ml-10 col-span-2 lg:p-2">
                    <div className="text-3xl lg:text-5xl font-extrabold pb-2 overflow-hidden">{blog?.title}</div>
                    <div className="mt-4 font-semibold text-slate-400">Published on {str}</div>
                    <div className="mt-10 text-lg overflow-hidden">{blog?.content}</div>
                </div>
                <div className="h-48 lg:h-96 pt-5 lg:pt-20">
                    <div className="font-semibold text-gray-500 pl-10 text-xl">Author</div>
                    <div className="flex items-center pl-7 lg:pl-10 mt-5 lg:mt-10">
                        {window.innerWidth > 1000 && <div className="relative inline-flex items-center justify-center w-10 h-10 mr-5 overflow-hidden bg-gray-400 rounded-full dark:bg-gray-600">
                            <span className="font-medium text-gray-200 dark:text-gray-300">{blog?.author.name[0]}</span>
                        </div>}
                        <div className="text-2xl font-semibold">{blog?.author.name}</div>
                    </div>
                </div>
            </div>
            
            }
        </div>
        
    </>
}