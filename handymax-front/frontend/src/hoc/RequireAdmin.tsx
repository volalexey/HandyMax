import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom"
import type { RootState } from "../store/store";

export const RequireAdmin = ({children}: { children: JSX.Element }) =>{
    const location = useLocation();
    const { isAuth, user } = useSelector((state: RootState) => state.auth);

    if(!isAuth){
        return <Navigate to="/admin-auth/log-in" state={{from: location}} replace />;
    }

    if(user?.role !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }

    return children;
}