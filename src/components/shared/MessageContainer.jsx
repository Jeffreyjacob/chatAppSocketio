import { useGetMessage } from "@/api/messageApi";
import { useAppStore } from "@/store";
import moment from "moment";
import { useEffect, useRef } from "react"


const MessageContainer = () => {
  const scrollRef = useRef();
  const {getMessages} = useGetMessage()
  const { selectedChatType, selectedChatData, 
    selectedChatMessage, setSelectedChatMessgae
  } = useAppStore()

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
        <div className=" text-xs text-grey-600">
            {moment(message.createdAt).format("LT")}
        </div>
    </div>
  )
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65w]">
      {renderMessage()}
      <div ref={scrollRef}>

      </div>
    </div>
  )
}

export default MessageContainer