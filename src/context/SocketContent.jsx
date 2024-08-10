
import { API_BASE_URL } from '@/api/userApi';
import { useAppStore } from '@/store';
import {createContext,useContext,useEffect,useRef} from 'react';
import { io } from 'socket.io-client';


const SocketContext = createContext(null);

export const useSocket = ()=>{
    return useContext(SocketContext)
}

export const SocketProvider = ({children})=>{
    const socket = useRef();
    const {userInfo,addMessage} = useAppStore();

    useEffect(()=>{
      if(userInfo){
        socket.current = io(API_BASE_URL,{
          withCredentials:true,
          query:{userId:userInfo.id}
        });
        socket.current.on("connect",()=>{
            console.log("Connected to server")
        })
        
    
        socket.current.on("recieveMessage",(message)=>{
            const {selectedChatData,selectedChatType} = useAppStore.getState();
            if(selectedChatType !== undefined &&
               (selectedChatData._id === message.sender._id || 
               selectedChatData._id === message.recipient._id) ){
                  console.log("message recieve",message)
                  addMessage(message)
            }
          })
        return ()=>{
            socket.current.disconnect();
        }
      }
    },[userInfo,addMessage])

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    )
}