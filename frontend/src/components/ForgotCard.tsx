import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"

export function ForgotCard() {
    const navigate = useNavigate()
  return (
    <Card className="lg:w-[450px]">
      <CardHeader>
        <CardTitle>Forgot Password? ( Under Development )</CardTitle>
        <CardDescription>Reset your password</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email :</Label>
              <Input id="name" placeholder="Email linked with account" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-around">
        <Button onClick={()=>navigate('/auth')} className="mr-4" variant="outline">Cancel</Button>
        <Button className="ml-4">Send OTP</Button>
      </CardFooter>
    </Card>
  )
}
