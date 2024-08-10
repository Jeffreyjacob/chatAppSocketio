import { FaPlus } from "react-icons/fa"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import Lottie from "react-lottie"
import { animationDefaultOptions, getColor } from "@/lib/utils"
import { useSearchContact } from "@/api/contactApi"
import { ScrollArea } from "../ui/scroll-area"
import { Avatar, AvatarImage } from "../ui/avatar"
import { API_BASE_URL } from "@/api/userApi"
import { useAppStore } from "@/store"


const NewDm = () => {
    const {setSelectedChatType,setSelectedChatData} = useAppStore()
    const [openNewContactModal, setOpenNewContactModal] = useState(false)
    const [searchedContacts, setsearchedContacts] = useState([])
    const { searchcontact } = useSearchContact()
    const searchContacts = async (search) => {

        if (search.length > 0) {
            const response = await searchcontact(search)
            setsearchedContacts(response.message)
        }else{
            setsearchedContacts([])
        }
    }
    const selectNewContact = (contact)=>{
        setOpenNewContactModal(false);
        setSelectedChatType("contact");
        setSelectedChatData(contact)
        setsearchedContacts([])
    }
    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <FaPlus className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer duration-300 translate-all "
                            onClick={() => setOpenNewContactModal(true)} />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
                        Select New contact
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
                <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Please select a contact</DialogTitle>
                    </DialogHeader>
                    <div>
                        <Input placeholder="search contacts"
                            className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                            onChange={(e) => searchContacts(e.target.value)} />
                    </div>
                    {
                        searchContacts.length > 0 && <ScrollArea className="h-[250px]">
                        <div className="flex flex-col gap-5">
                            {
                                searchedContacts.map((contact, index) => (
                                    <div key={index} className="flex gap-3 items-center cursor-pointer" 
                                     onClick={()=>selectNewContact(contact)}>
                                        <div className="w-12 h-12 relative">
                                            <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                                                {
                                                    contact.image ? <AvatarImage src={`${API_BASE_URL}/${contact.image}`}
                                                        alt="profile"
                                                        className=" object-cover w-full bg-black" /> : (
                                                        <div className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(contact.color)}`}>
                                                            {contact.firstName ? contact.firstName.split("").shift() :
                                                                contact.email?.split("").shift()}
                                                        </div>
                                                    )
                                                }
                                            </Avatar>
                                        </div>
                                        <div className="flex flex-col">
                                           <span>
                                           {
                                            contact.firstName && contact.lastName ? `${contact.firstName} ${contact.lastName}` : ""
                                           }
                                           </span>
                                           <span className="text-xs">
                                            {contact.email}
                                           </span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </ScrollArea>
                    }
                    {
                        searchedContacts.length <= 0 &&
                        <div className="flex-1 md:bg-[#1c1d25] md:flex mt-5 lg:mt-0 flex-col justify-center items-center hidden duration-1000 transition-all">
                            <Lottie isClickToPauseDisabled={true}
                                height={100}
                                width={100}
                                options={animationDefaultOptions}
                            />
                            <div className=" text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-2xl text-xl translate-all duration-300 text-center">
                                <h3 className="poppins-medium">
                                    Hi <span className="text-purple-500">!</span> Search new
                                    <span className="text-purple-500"> Contact.</span>
                                </h3>
                            </div>
                        </div>
                    }
                </DialogContent>
            </Dialog>

        </>
    )
}

export default NewDm