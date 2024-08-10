/* eslint-disable react/prop-types */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Auth from  "./pages/auth";
import Chat from './pages/chat';
import Profile from './pages/profile';
import { useAppStore } from "./store";
import { useEffect} from "react";
import { useUserInfo } from "./api/userApi";
import { Loader2} from "lucide-react";
import ProtectedRoutes from "./ProtectedRoutes";


function App() {
  const {setUserInfo,userInfo} = useAppStore();
  const {UserInfos,isLoading,isRefetching,refetch} = useUserInfo()
  useEffect(()=>{
    refetch()
     setUserInfo(UserInfos?.message)
  },[setUserInfo,UserInfos,refetch])
  if(isLoading || isRefetching){
    return (
      <div className="bg-primary-primarybackground w-full min-h-screen flex justify-center items-center">
        <Loader2 className=" animate-spin w-7 h-7 text-primary-primaryText"/>
      </div>
    )
  }
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/auth" element={userInfo? <Navigate to="/chat"/> :<Auth/>}/>
        <Route element={<ProtectedRoutes/>}>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/profile" element={<Profile/>}/>
        </Route>

        <Route path="*" element={<Navigate to="/auth"/>}/>
      </Routes>
   </BrowserRouter>
  )
}

export default App
