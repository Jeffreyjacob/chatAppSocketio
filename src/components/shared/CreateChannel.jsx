import { useAppStore } from "@/store"
import { useEffect, useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { FaPlus } from "react-icons/fa"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { useGetAllContacts } from "@/api/contactApi"
import { Button } from "../ui/button"
import MultipleSelector from "../ui/multipleselect"


const CreateChannel = () => {
    const {setSelectedChatType,setSelectedChatData} = useAppStore()
    const [newChannelModal, setNewChannelModal] = useState(false)
    const {getAllContacts} = useGetAllContacts() 
    const [allContacts,setAllContacts] = useState([]);
    const [channelName,setChannelName] = useState("")
    const [selectedContacts,setSelectedContacts] = useState([])
    useEffect(()=>{
         setAllContacts(getAllContacts?.message)
    },[getAllContacts])
   
    const createChannel = async ()=>{

    }
    console.log(allContacts)
    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer duration-300 translate-all "
                            onClick={() => setNewChannelModal(true)} />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
                        Create new Channel
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>
                <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Please fill up details for new channel</DialogTitle>
                    </DialogHeader>
                    <div>
                        <Input placeholder="Channel Name"
                            className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                            onChange={(e) =>setChannelName(e.target.value)} 
                            value={channelName}/>
                    </div>
                    <div>
                        <MultipleSelector 
                        className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white"
                        defaultOptions={allContacts}
                        placeholder="Search Contacts"
                        value={selectedContacts}
                        onChange={setSelectedContacts}
                        emptyIndicator={
                            <p className="text-center text-lg leading-10">No result found</p>
                        }/>
                    </div>
                    <div>
                        <Button className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
                        onClick={createChannel}>
                            Create Channel
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

        </>
    )
}


export default CreateChannel