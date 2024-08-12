import { useMutation, useQuery } from "@tanstack/react-query"
import { API_BASE_URL } from "./userApi"

export const useSearchContact = ()=>{
    const SearchContact = async (search)=>{
         const res = await fetch(`${API_BASE_URL}/api/contact/searchContact`,{
            method: "POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({search})
         })
         const data = await res.json()
         if(!res.ok){
            throw new Error(data.message)
         }
         return data
    }

    const {mutateAsync:searchcontact,isSuccess} = useMutation({
        mutationFn:SearchContact
    })
    return {searchcontact,isSuccess}
}


export const useGetContactsDM = ()=>{
     const GetContact = async ()=>{
         const res = await fetch(`${API_BASE_URL}/api/contact/getContactsForDm`,{
            method:"GET",
            credentials:"include"
         })
         const data = await res.json()
         if(!res.ok){
            throw new Error(data.message)
         }
         return data
     }

     const {data:getContactsDm} = useQuery({
        queryKey:["getContact"],
        queryFn:GetContact
     })
     return {getContactsDm}
}

export const useGetAllContacts = ()=>{
    const GetAllContacts = async ()=>{
       const res = await fetch(`${API_BASE_URL}/api/contact/getAllContact`,{
            method:"GET",
            credentials:"include"
       })
       const data = await res.json()
       if(!res.ok){
         throw new Error(data.message)
       }
       return data
    }

    const {data:getAllContacts,isLoading} = useQuery({
       queryKey:["getAllContacts"],
       queryFn:GetAllContacts
    })
   return {getAllContacts,isLoading}
}