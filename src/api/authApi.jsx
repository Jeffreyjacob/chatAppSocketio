import { useAppStore } from "@/store"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
export const useSignUp = ()=>{
    const {setUserInfo} = useAppStore()
    const navigate = useNavigate()
     const SignUpUser = async (user)=>{
         const res = await fetch(`${API_BASE_URL}/api/auth/signup`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user),
            credentials:"include"
         })
         const data = await res.json()
         if(!res.ok){
            throw new Error(data.message)
         }
         return data
     }
     const {mutateAsync:SignUp,isPending} = useMutation({
        mutationFn:SignUpUser,
        onSuccess:(data)=>{
            setUserInfo(data.message)
           navigate("/profile")
        },
        onError:(error)=>{
            toast.error(error.message)
        }
     })

     return {SignUp,isPending}
}

export const useLogin = ()=>{
    const {setUserInfo} = useAppStore()
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const LoginUser = async (user)=>{
        const res = await fetch(`${API_BASE_URL}/api/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user),
            credentials:"include"
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error(data.message)
        }
        return data
    }
    const {mutateAsync:Login,isPending} = useMutation({
        mutationFn:LoginUser,
        onSuccess:(data)=>{
          setUserInfo(data.message)
         queryClient.invalidateQueries({queryKey:["getUserInfo"]})
         navigate("/chat")
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })
    return {Login,isPending}
}

export const useLogout = ()=>{
    const { setUserInfo } = useAppStore()
     const queryClient = useQueryClient()
     const LogoutUser = async ()=>{
          const res = await fetch(`${API_BASE_URL}/api/auth/logout`,{
             method:"POST",
             credentials:"include"
          })
          const data = await res.json()
          if(!res.ok){
             throw new Error(data.message)
          }
          return data
     }

     const {mutateAsync:Logout} = useMutation({
        mutationFn:LogoutUser,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["getUserInfo"]})
            setUserInfo(null)
            toast.success("Logout successfully")
        },
        onError:(error)=>{
            toast.error(error)
        }
     })
     return {Logout}
}