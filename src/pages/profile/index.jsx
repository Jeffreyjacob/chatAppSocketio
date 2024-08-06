import { useAppStore } from "@/store"
import { useEffect, useRef, useState } from "react"
import { IoArrowBack } from 'react-icons/io5'
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUpdateProfile } from "@/api/userApi";
import { useNavigate } from "react-router-dom";


const Index = () => {
  const navigate = useNavigate()
  const { userInfo} = useAppStore()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const {UpdateUser,isPending} = useUpdateProfile()
  const fileInputRef = useRef(null)

  const validateProfile = ()=>{
      if(!firstName){
        toast.error("First Name is required")
        return false
      }
      if(!lastName){
        toast.error("Last Name is required")
      }
      return true;
  }

  const saveChange = async () => {
       const user = {
         firstName,
         lastName,
         color:selectedColor.toString()
       }
       if(validateProfile()){
         await UpdateUser(user)
       }
  }

  useEffect(()=>{
    if(userInfo.message.profileSetup){
      setFirstName(userInfo.message.firstName)
      setLastName(userInfo.message.lastName)
      setSelectedColor(userInfo.message.color)
    }
  },[userInfo])

   const handleNavigate = ()=>{
     if(userInfo.message.profileSetup){
       navigate("/chat")
     }else{
       toast.error("Please setup profile")
     }
   }

   const handleFileInputClick = ()=>{
     fileInputRef.current.click();
   }

   const handleImageChange = async (event)=>{
     const file = event.target.files[0]
      if(file){
        const formdata = new FormData();
         formdata.append("profile-image",file);
        //  const response = await 
        
        const reader = new FileReader();
        reader.onload = ()=>{
          console.log(reader.result)
          setImage(reader.result);
        }
        reader.readAsDataURL(file)
      }
   };

   const handleDeleteImage = async()=>{
    
   }
  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div onClick={handleNavigate}>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div className="h-full w-32 md:w-48 relative md:h-48 flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {
                Image ? <AvatarImage src={Image}
                  alt="profile"
                  className=" object-cover w-full bg-black" /> : (
                  <div className={`uppercase h-32 w-32 md:h-48 md:w-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}>
                    {firstName ? firstName.split("").shift() :
                      userInfo.message.email.split("").shift()}
                  </div>
                )
              }
            </Avatar>
            {
              hovered && (
                <div className=" absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full"
                onClick={Image ? handleDeleteImage : handleFileInputClick}>
                  {
                    Image ? <FaTrash className="text-white text=3xl cursor-pointer" /> :
                      <FaPlus className="text-white text=3xl cursor-pointer" />
                  }
                </div>
              )
            }
                <input type="file" ref={fileInputRef}
                 className=" hidden" 
                 onChange={handleImageChange}
                 name="profile-image" accept=".png, .jpg, .svg, .jpeg"/> 
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input placeholder="Email" disabled 
              value={userInfo.message.email}
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"/>
            </div>
            <div className="w-full">
              <Input placeholder="First Name" 
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"/>
            </div>
            <div className="w-full">
              <Input placeholder="Last Name" 
               value={lastName}
               onChange={(e)=>setLastName(e.target.value)}
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"/>
            </div>
              <div className="w-full flex gap-5">
                  {
                    colors.map((color,index)=>(
                      <div key={index}
                       className={`${color} h-8 w-8 rounded-full cursor-pointer transiti duration-300 ${selectedColor === index ? "outline outline-white/50 outline-1":""}`}
                       onClick={()=> setSelectedColor(index)}>   
                      </div>
                    ))
                  }
                </div>   
          </div>
        </div>

          <div className="w-full">
             <Button className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
             onClick={saveChange} disabled={isPending}>
                {isPending ? "...Updating":"Save Changes"}
             </Button>
          </div>
      </div>
    </div>
  )
}

export default Index