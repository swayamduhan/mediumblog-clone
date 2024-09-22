import { BlogCard } from "@/components/BlogCard";
import { BlogSkeleton } from "@/components/BlogSkeleton";
import { Navbar } from "@/components/Navbar";
import { useBlogs } from "@/hooks/useBlogs";

export function Blogs(){
    const {loading, blogs} = useBlogs()
    return <>
        <Navbar />
        <div className="lg:grid lg:grid-cols-5 mt-20 ml-2 mr-2">
            <div className="col-span-3">
                {loading ? 
                    <>
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </>
                    : 
                    blogs.map(blog=>{
                        return <BlogCard id={blog.id} key={blog.id} authorName={blog.author.name} title={blog.title} publishedDate={blog.publishedDate} content={blog.content} />
                    })
                }
            </div>
        </div>
    </>
}