import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "./userApi"

export const useGetMessage = ()=>{
    const GetMessages = async (recipientId)=>{
         const res = await fetch(`${API_BASE_URL}/api/message/getChat`,{
            method:"POST",
            credentials:"include",
            headers:{
              "Content-Type": "application/json"
            },
            body:JSON.stringify({id:recipientId})
         })
         const data = await res.json();
         if(!res.ok){
            throw new Error(data.message)
         }
         return data
    }

    const {mutateAsync:getMessages,isSuccess} = useMutation({
        mutationFn:GetMessages
    })
    return {getMessages,isSuccess}
}

export const useUploadImage = ()=>{
   const UploadImage = async (formData)=>{
        const res = await fetch(`${API_BASE_URL}/api/message/uploadChatImage`,{
          method:"POST",
          credentials:"include",
          body:formData
        })
        const data = await res.json()
        if(!res.ok){
          throw new Error(data.message)
        }
        return data
   }

   const {mutateAsync:upload,isSuccess} = useMutation({
     mutationFn:UploadImage
   })
   return {upload,isSuccess}
}