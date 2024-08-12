import { useGetMessage } from "@/api/messageApi";
import { API_BASE_URL } from "@/api/userApi";
import { useAppStore } from "@/store";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import {MdFolderZip} from "react-icons/md";
import {IoMdArrowRoundDown} from "react-icons/io";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";



const MessageContainer = () => {
  const scrollRef = useRef();
  const {getMessages} = useGetMessage()
  const { selectedChatType, selectedChatData, 
    selectedChatMessage, setSelectedChatMessgae,
    setIsDownloading,setFileDownloadingProgress
  } = useAppStore()
  const [showFullImage,setShowFullImage] = useState(false);
  const [imageUrl,setImageUrl] = useState(null);

  useEffect(()=>{
     const getAllMessage = async ()=>{
      if(selectedChatData._id){
        if(selectedChatType === "contact"){
          const response = await getMessages(selectedChatData._id)
          console.log(response)
          setSelectedChatMessgae(response.message)
        }
      }
     }
     getAllMessage()
  },[selectedChatData,selectedChatType,
    setSelectedChatMessgae,getMessages])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessage])

  const checkImage = (filePath) =>{
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    return imageRegex.test(filePath);
  }
  const renderMessage = () => {
    let lastDate = null
    return selectedChatMessage?.map((message) => {
      const messageDate = moment(message.createdAt).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={message._id}>
          {showDate && <div className="text-center text-gray-500 my-2">
            {moment(message.createdAt).format("LL")}
          </div>}
          {
            selectedChatType === "contact" && renderDMMessages(message)
          }
        </div>
      )
    })
  };
     const downLoadFile = async (url)=>{
          setIsDownloading(true)
          setFileDownloadingProgress(0)
         const response = await axios.get(`${API_BASE_URL}/${url}`,
          {responseType:"blob",
            onDownloadProgress:(data)=>{
               const {loaded,total} = data
               const percentCompleted = Math.round((loaded *100)/total)
               setFileDownloadingProgress(percentCompleted)
            }
          })
         const urlBlob = window.URL.createObjectURL(response.data);
         const link = document.createElement("a");
         link.href = urlBlob;
         link.setAttribute("download",url.split("/").pop())
         document.body.appendChild(link)
         link.click();
         link.remove();
         window.URL.revokeObjectURL(urlBlob);
         setIsDownloading(false);
         setFileDownloadingProgress(0);
     }
  const renderDMMessages = (message) => (
    <div className={`${message.sender === selectedChatData._id ? "text-left":"text-right"}`}>
        {
          message.messageType === "text" && (
            <div className={`${message.sender !== selectedChatData._id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#2a2b35]/5 text-white/80 border-[#fffff]/20"} border inline-block p-4 rounded my-1 max-w-[50%] break-words`} >
              {message.content}
            </div>
          )
        }
        {
          message.messageType === "file" && (
            <div className={`${message.sender !== selectedChatData._id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#2a2b35]/5 text-white/80 border-[#fffff]/20"} border inline-block p-4 rounded my-1 max-w-[50%] break-words`} >
                 {
                  checkImage(message.fileUrl) ? <div className=" cursor-pointer"
                   onClick={()=>{
                    setShowFullImage(true)
                    setImageUrl(message.fileUrl)
                   }
                  }>
                   <img src={`${API_BASE_URL}/${message.fileUrl}`} height={300} width={300}/>
                  </div>:<div className="flex items-center justify-center gap-4">
                     <span className="text-white/8 text-3xl bg-black/20 rounded-full p-3">
                        <MdFolderZip/>
                     </span>
                     <span>
                       {message.fileUrl.split("/").pop()}
                     </span>
                     <span className=" bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
                     onClick={()=>downLoadFile(message.fileUrl)}>
                     <IoMdArrowRoundDown />
                     </span>
                  </div>
                 }
                </div>
          )
        }
        <div className=" text-xs text-grey-600">
            {moment(message.createdAt).format("LT")}
        </div>
    </div>
  )
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65w]">
      {renderMessage()}
      <div ref={scrollRef}>
           {
             showFullImage && <div className="fixed z-[100] top-0 left-0 h-[100vh] w-[100vw] flex items-center justify-center backdrop-blur-lg flex-col">
                <div>
                   <img src={`${API_BASE_URL}/${imageUrl}`}
                   className="h-[80vh] w-full bg-cover"/>
                </div>
                <div className=" flex gap-5 fixed top-0 mt-5">
                    <button 
                    className=" bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
                    onClick={()=>downLoadFile(imageUrl)}
                    >
                     <IoMdArrowRoundDown/>
                    </button>
                    <button 
                    className=" bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
                    onClick={()=>{
                      setShowFullImage(false)
                      setImageUrl(null)
                    }}
                    >
                     <IoCloseSharp/>
                    </button>
                </div>
             </div>
           }
      </div>
    </div>
  )
}

export default MessageContainer