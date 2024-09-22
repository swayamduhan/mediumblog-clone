import { useEffect, useState } from "react"
import { QuoteGenerator } from "./QuoteGenerator";
interface Review {
    text : string,
    auth : string
}
type Reviews = Record<number, Review>

const reviews: Reviews = {
    1: { text: "JaatBlog makes blogging a breeze!", auth: "- David W." },
    2: { text: "Informative, engaging, and always up-to-date! JaatBlog rocks!", auth: "- Jennifer L." },
    3: { text: "JaatBlog's intuitive interface is a game-changer!", auth: "- Michael R." },
    4: { text: "I've discovered my blogging mojo thanks to JaatBlog!", auth: "- Sarah H." },
    5: { text: "JaatBlog: Where creativity meets community!", auth: "- Ryan M." },
    6: { text: "Hands down the best platform for aspiring bloggers!", auth: "- Emma K." },
    7: { text: "JaatBlog has reignited my passion for writing!", auth: "- Lucas D." },
    8: { text: "Kudos to JaatBlog for fostering such a supportive blogging community!", auth: "- Olivia F." },
    9: { text: "JaatBlog's diverse range of topics keeps me hooked!", auth: "- Ethan S." },
    10: { text: "JaatBlog, my one-stop destination for all things blogging!", auth: "- Ava T." }
};

export const Quote = () => {

    useEffect(()=>{
        const int = setInterval(()=>{
            const randomInt = Math.floor(Math.random() * (10)) + 1;
            const selected = reviews[randomInt]
            setQuote(selected.text)
            setAuthor(selected.auth)
        }, 4000)

        return ()=>clearInterval(int)
    }, [])

    const [quote, setQuote] = useState("Welcome to JaatBlog")
    const [author, setAuthor] = useState("- Swayam Duhan © 2024 ")
    return <div className="bg-slate-100 h-screen flex flex-col justify-center items-center invisible lg:visible">
        <div className="max-w-lg">
            <QuoteGenerator author={author} quote={quote} />
        </div>
    </div>
}