import { useLogin, useSignUp } from "@/api/authApi";
import Background from "@/assets/login2.png";
import victory from "@/assets/victory.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";

const Index = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const {SignUp,isPending:SignUpLoading} = useSignUp()
    const {Login,isPending:LoginLoading} = useLogin()

    const validateSignup = ()=>{
        if(!email.length ){
            toast.error("Email is required")
            return false
        }
        if(!password.length > 6){
            toast.error("Password must be at aleast 6 characters")
            return false
        }
        if(password !== confirmPassword){
            toast.error("Both password must match")
            return false
        }
        return true
    }

    const validateLogin = ()=>{
        if(!email.length ){
            toast.error("Email is required")
            return false
        }
        if(!password.length > 6){
            toast.error("Password must be at aleast 6 characters")
            return false
        }
        return true
    }

    const handleLogin = async () => {
        const user = {
            email:email,
            password:password
        }
      if(validateLogin){
        await Login(user)
        setemail("")
        setpassword("")
      }
    }
    const handleSignup = async () => {
        const user = {
            email:email,
            password:password
        }
       if(validateSignup()){
          await SignUp(user)
          setemail("")
          setpassword("")
          setconfirmPassword("")
       }
    }
    return (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center">
            <div className="h-[80vh] bg-white border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw]  rounded-3xl grid xl:grid-cols-2">
                <div className=" flex  flex-col gap-6 items-center justify-center">
                    <div className="flex items-center justify-center flex-col">
                        <div className="flex items-center justify-center">
                            <h1 className="text-4xl font-bold md:text-4xl">Welcome</h1>
                            <img src={victory} alt="Victory-emoji" className="h-[85px]" />
                        </div>
                        <p className="font-medium text-center">
                            Fill in the details to get started with the best chat app!
                        </p>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <Tabs className="w-3/4" defaultValue="login">
                            <TabsList className="bg-transparent rounded-none w-full">
                                <TabsTrigger
                                    className="data-[state=active]:bg-transparent text-black text-opacity-90
                                 border-b-2 rounded-none w-full data-[state=active]:text-black 
                                 data-[state=active]:font-bold data-[state=active]:border-b-purple-500 p-3
                                  transition-all duration-300"
                                    value="login">
                                    Login
                                </TabsTrigger>
                                <TabsTrigger
                                    className="data-[state=active]:bg-transparent text-black text-opacity-90
                                 border-b-2 rounded-none w-full data-[state=active]:text-black 
                                 data-[state=active]:font-bold data-[state=active]:border-b-purple-500 p-3
                                  transition-all duration-300"
                                    value="signup">Sign Up</TabsTrigger>
                            </TabsList>
                            <TabsContent className="flex flex-col gap-3 mt-5" value="login">
                                <Input placeholder="Email" className="rounded-full p-4"
                                    value={email} onChange={(e) => setemail(e.target.value)} />
                                <Input placeholder="Password" className="rounded-full p-4"
                                    type="password"
                                    value={password} onChange={(e) => setpassword(e.target.value)} />

                                <Button className="rounded-full p-4" onClick={handleLogin} disabled={LoginLoading}>
                                    {LoginLoading ? "...loading":"Login"}
                                </Button>
                            </TabsContent>

                            <TabsContent className="flex flex-col gap-3" value="signup">
                                <Input placeholder="Email" className="rounded-full p-4"
                                    value={email} onChange={(e) => setemail(e.target.value)} />

                                <Input placeholder="Password" className="rounded-full p-4"
                                    type="password"
                                    value={password} onChange={(e) => setpassword(e.target.value)} />

                                <Input placeholder="Confirm Password" className="rounded-full p-4"
                                    type="password"
                                    value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} />

                                <Button className="rounded-full p-4" onClick={handleSignup} disabled={SignUpLoading}>
                                    {SignUpLoading ? "...loading":"Sign up"}
                                </Button>

                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
                <div className="hidden xl:flex justify-center items-center">
                    <img src={Background} alt="background login" className="h-[400px]"/>
                </div>
            </div>
        </div>
    )
}

export default Index