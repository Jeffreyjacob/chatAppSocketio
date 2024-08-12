
export const createChatSlice = (set,get)=>({
    selectedChatType:undefined,
    selectedChatData:undefined,
    selectedChatMessage:[],
    directMessageContacts:[],
    isUploading:false,
    isDownloading:false,
    fileUploadProgress:0,
    fileDownloadProgress:0,
    setIsUploading:(isUploading)=> set({isUploading}),
    setIsDownloading:(isDownloading)=>set({isDownloading}),
    setFileUploadingProgress:(fileUploadProgress)=>set({fileUploadProgress}),
    setFileDownloadingProgress:(fileDownloadProgress)=>set({fileDownloadProgress}),
    setSelectedChatType:(selectedChatType)=> set({selectedChatType}),
    setSelectedChatData:(selectedChatData)=>set({selectedChatData}),
    setSelectedChatMessgae:(selectedChatMessage)=>set({selectedChatMessage}),
    setDirectMessageContacts:(directMessageContacts)=>set({directMessageContacts}),
    closeChat:()=>set({selectedChatData:undefined,
                       selectedChatType:undefined,
                       selectedChatMessage:[]}),
    addMessage:(message)=>{
         const selectedChatMessage = get().selectedChatMessage;
         const selectedChatType = get().selectedChatType;

         set({
            selectedChatMessage:[
                ...selectedChatMessage,{
                    ...message,
                    recipient:selectedChatType === "channel" ? message.recipient : message.recipient._id,
                    sender:selectedChatType === "channel" ? message.sender : message.sender._id,
                }
            ]
         })
    }
})