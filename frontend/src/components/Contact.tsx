import {
    Github,
    Twitter,
    Linkedin,
    Mail
  } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
  export function ContactMenu() {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Contact Me</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Socials & Mail</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={()=>window.open("https://github.com/swayamduhan", "_blank")}>
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=>window.open("mailto:swayam.duhan10@gmail.com")}>
            <Mail className="mr-2 h-4 w-4" />
            <span>Gmail</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=>window.open("https://x.com/swayambuilds", "_blank")}>
            <Twitter className="mr-2 h-4 w-4" />
            <span>Twitter</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=>window.open("https://www.linkedin.com/in/swayam-duhan-5a86bb127/", "_blank")}>
            <Linkedin className="mr-2 h-4 w-4" />
            <span>LinkedIn</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  