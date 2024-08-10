import { Navigate, Outlet } from "react-router-dom";
import { useAppStore } from "./store"

const ProtectedRoutes = () => {
    const {userInfo} = useAppStore();
  return userInfo ? <Outlet/> : <Navigate to="/auth"/>
}

export default ProtectedRoutes