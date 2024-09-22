import { Skeleton } from "./ui/skeleton";

export const BlogSkeleton = () => {
    return <div className="ml-5 mr-5 p-5">
        <div className="flex items-center">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-96 h-4 ml-6"/>
        </div>
        <div>
            <Skeleton className="mt-2 mb-1 w-full h-10"/>
            <Skeleton className="mb-2 w-full h-20"/>
            <Skeleton className="mt-2 w-full h-6"/>
        </div>
    </div>
}