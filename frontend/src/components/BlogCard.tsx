import { Link } from "react-router-dom"

interface BlogCardInputs {
    id : string,
    title : string,
    content : string,
    publishedDate : string,
    authorName : string
}


export const BlogCard = ({id, title, content, publishedDate, authorName} : BlogCardInputs) => {
    const minutes = Math.ceil(content.length / 100)
    const date = new Date(publishedDate).toDateString().split(' ')
    const str = `${date[2]} ${date[1]}, ${date[3]}`
    
    return <Link to={`/blog/${id}`}>
        <div className="ml-5 mr-5 p-5 cursor-pointer hover:bg-gray-50 rounded-lg">
            <div className="flex items-center">
                <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <span className="font-medium text-gray-600 dark:text-gray-300">{authorName[0]}</span>
                </div>
                <div className="pl-6 flex items-center">
                    <div>{authorName}</div>
                    <div className="text-slate-400 pl-3 pr-3 text-2xl">&#11090;</div>
                    <div className="text-slate-500 font-light">{str}</div>
                </div>
            </div>
            <div className="font-bold text-3xl pt-2 overflow-hidden">{title}</div>
            <div className="text-gray-500 pt-2 pb-2 overflow-hidden">{content.slice(0, 100) + " ..."}</div>
            <div className="pt-2">{`${minutes} ${minutes > 1 ? "minutes" : "minute"} read`}</div>
            <div className="h-[1px] w-full bg-slate-200 mt-5 mb-5"></div>
        </div>
    </Link>
}