import { useMutation } from "@tanstack/react-query"
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