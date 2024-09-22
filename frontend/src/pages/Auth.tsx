import { Heading } from "../components/Heading";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Quote } from "../components/Quote";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react";
import { SigninType, SignupType } from "@swayamduhan/medium-clone";
import axios from "axios"
import { BACKEND_URL } from "@/config";
import { Link, useNavigate } from "react-router-dom";
import { ErrorAlert } from "@/components/ui/error";
import { Loader2, Eye, EyeOff } from "lucide-react";


export function Auth(){
    const navigate = useNavigate()
    const [repass, setRepass] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [showRepass, setShowRepass] = useState(false)

    const [signin, setSignin] = useState<SigninType>({
        email : "",
        password : ""
    })
    const [signup, setSignup] = useState<SignupType>({
        email : "",
        password : "",
        name : ""
    })

    useEffect(()=>{
        const el = document.getElementById("login")
        if(el){
            el.focus()
        }
    }, [])

    

    async function signinReq(){
        try{
            setError(false)
            setLoading(true)
            const res = await axios({
                url : `${BACKEND_URL}api/v1/user/signin`,
                method : "post",
                data : signin
            })
            setLoading(false)
            const jwt = res.data.token 
            localStorage.setItem('token', jwt)
            localStorage.setItem('username', res.data.name)
            navigate('/blogs')
        }catch(e){
            setLoading(false)
            setError(true)
        }
    }

    async function signupReq(){
        if(signup.password == repass){
            try{
                setLoading(true)
                setError(false)
                const res = await axios({
                    url : `${BACKEND_URL}api/v1/user/signup`,
                    method : "post",
                    data : signup
                })
                setLoading(false)
                const jwt = res.data.token
                localStorage.setItem('token', jwt)
                localStorage.setItem('username', res.data.name)
                navigate('/blogs')
            }catch(e){
                setLoading(false)
                setError(true)
            }
        }
    }

    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center items-center h-screen">
            {error &&
                <div className="w-[400px] top-28 fixed">
                    <ErrorAlert title="Invalid inputs provided :("/>
                </div> 
            }
            <Tabs defaultValue="account" className="lg:w-[400px] w-screen flex flex-col items-center">
                <TabsList className="w-48 lg:w-full">
                    <TabsTrigger id="login" value="login">Log In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login" className="flex flex-col items-center w-full">
                    <Heading label="Login Here"/>
                    <div className="grid w-1/2 lg:w-full max-w-sm items-center gap-1.5 mb-5">
                        <Label htmlFor="email">Email : </Label>
                        <Input type="email" id="email" placeholder="Email" onChange={e=>setSignin({...signin, email : e.target.value})}/>
                    </div>
                    <div className="grid w-1/2 lg:w-full max-w-sm items-center gap-1.5 mb-8 relative">
                        <Label htmlFor="password">Password : </Label>
                        <Input type={showPass ? "text" : "password"} id="password" placeholder="Enter Password" onChange={e=>setSignin({...signin, password : e.target.value})}/>
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute top-8 right-3">
                            {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                        <div className="text-right"><Link className="underline text-sm" to={'/auth/forgot'}>Forgot Password?</Link></div>
                    </div>
                    <div className="text-center w-1/3 lg:w-full lg:pl-2 lg:pr-2">
                        {loading ? 
                            <Button disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                            </Button>
                        :
                            <Button id="signin-btn" onClick={signinReq}>Log In</Button>
                        }  
                    </div>
                </TabsContent>
                <TabsContent value="signup" className="flex flex-col items-center w-full">
                    <Heading label="Signup Here" />
                    <div className="grid w-1/2 lg:w-full max-w-sm items-center gap-1.5 mb-5">
                        <Label htmlFor="name">Full Name : </Label>
                        <Input type="text" id="name" placeholder="Name" onChange={e=>setSignup({...signup, name : e.target.value})}/>
                    </div>
                    <div className="grid w-1/2 lg:w-full max-w-sm items-center gap-1.5 mb-5">
                        <Label htmlFor="email">Email : </Label>
                        <Input type="email" id="email" placeholder="Email" onChange={e=>setSignup({...signup, email : e.target.value})}/>
                    </div>
                    <div className="grid w-1/2 lg:w-full max-w-sm items-center gap-1.5 mb-5 relative">
                        <Label htmlFor="password">Password : </Label>
                        <Input type={showPass ? "text" : "password"} id="password" placeholder="Enter Password" onChange={e=>setSignup({...signup, password : e.target.value})}/>
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute top-8 right-3">
                            {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                    <div className="grid w-1/2 lg:w-full max-w-sm items-center gap-1.5 mb-8 relative">
                        <Label htmlFor="password">Re-Enter password : </Label>
                        <Input type={showRepass? "text" : "password"} id="password" placeholder="Enter Password" onChange={e=>setRepass(e.target.value)}/>
                        <button type="button" onClick={() => setShowRepass(!showRepass)} className="absolute top-8 right-3">
                            {showRepass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                        {signup.password == repass ? <></> : <div className="font-semibold text-sm text-red-500">Passwords do not match!</div>}
                    </div>
                    <div className="text-center w-1/3 lg:w-full lg:pl-2 lg:pr-2">
                        {loading ? 
                            <Button disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Please wait
                            </Button>
                        :
                            <Button id="signup-btn" onClick={signupReq}>Sign Up</Button>
                        }  
                    </div>
                </TabsContent>
            </Tabs>
        </div>
        <Quote/>
    </div>
}