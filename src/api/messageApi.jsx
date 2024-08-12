import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "./userApi"
import { useSocket } from "@/context/SocketContent";
import { useAppStore } from "@/store";
import axios from "axios";

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
  const socket = useSocket()
  const {setIsUploading,selectedChatType,
         selectedChatData,userInfo,setFileUploadingProgress} = useAppStore()
   const UploadImage = async (formData)=>{
        const res = await axios.post(`${API_BASE_URL}/api/message/uploadChatImage`,formData,{
          withCredentials:true,
          onUploadProgress:(data)=>{
            setFileUploadingProgress(Math.round(100 * data.loaded / data.total))
          }
        })
        if (res.status < 200 || res.status >= 300) {
          throw new Error(res.data.message || 'File upload failed');
       }
        return res.data
   }

   const {mutateAsync:upload,isSuccess} = useMutation({
     mutationFn:UploadImage,
     onSuccess:(data)=>{
      setIsUploading(false)
      if(selectedChatType === "contact"){
        socket.emit("sendMessage",{
            sender:userInfo.id,
            content:undefined,
            recipient:selectedChatData._id,
            messageType:"file",
            fileUrl:data.filePath
        })
      }
     },
     onError:()=>{
       setIsUploading(false)
     }
   })
   return {upload,isSuccess}
}