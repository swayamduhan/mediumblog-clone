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
import { Loader2 } from "lucide-react";
import { ForgotCard } from "@/components/ForgotCard";


export function Forgot(){
    const navigate = useNavigate()
    const [error, setError] = useState(false)

    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center items-center h-screen">
            {error &&
                <div className="w-[400px] top-28 fixed">
                    <ErrorAlert title="Invalid inputs provided :("/>
                </div> 
            }
            <ForgotCard />
        </div>
        <Quote/>
    </div>
}