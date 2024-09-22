import { TextGenerateEffect } from "./ui/text-generate-effect"

export const QuoteGenerator = ({quote, author} : {quote : string, author : string}) => {
    return <>
        <TextGenerateEffect words={quote} color="text-black" className="font-semibold text-4xl"/>
        <TextGenerateEffect words={author} color="text-slate-500" className="text-2xl"/>
    </>
}