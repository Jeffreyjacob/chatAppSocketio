import { Navigate, Outlet } from "react-router-dom";
import { useAppStore } from "./store"

const ProtectedRoutes = () => {
    const {isAuthenticated} = useAppStore();
  return isAuthenticated ? <Outlet/> : <Navigate to="/auth"/>
}

export default ProtectedRoutes