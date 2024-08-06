import { useAppStore } from "@/store"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useUserInfo = ()=>{
   const GetUserInfo = async()=>{
         const res = await fetch(`${API_BASE_URL}/api/user/userInfo`,{
            method:"GET",
            credentials:"include"
         })
         const data = await res.json()
         if(!res.ok){
            throw new Error(data.message)
         }
         return data
    }
    const {data:UserInfos,isLoading} = useQuery({
        queryKey:["getUserInfo"],
        queryFn:GetUserInfo
    })
    return {UserInfos,isLoading}
}

export const useUpdateProfile = ()=>{
   const navigate = useNavigate()
   const { setUserInfo } = useAppStore()
   const UpdateProfile = async (user)=>{
       const res = await fetch(`${API_BASE_URL}/api/user/updateProfile`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          credentials:"include",
          body:JSON.stringify(user)
       })
       const data = await res.json()
       if(!res.ok){
         throw new Error(data.message)
       }
       return data
   }
   const {mutateAsync:UpdateUser,isPending} = useMutation({
      mutationFn:UpdateProfile,
      onSuccess:(data)=>{
         setUserInfo(data.message)
         toast.success("Profile Updated")
         navigate("/chat")
      },
      onError:(error)=>{
         toast.error(error.message)
      } 
   })
   return {UpdateUser,isPending}
}