import { useEffect } from "react";
import { useGetMeQuery } from "../store/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, logout, openLoginModal } from "../store/slices/authSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { RootState } from "../store/store";

export const AuthGuard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const token = useSelector((state: RootState) => state.auth.token);

  const { data: user, isError, isLoading } = useGetMeQuery(undefined, { skip: !token });

  useEffect(() => {
    if (user && token) {
      dispatch(setCredentials({ user, token }));
    }
    
    if (isError) {
      dispatch(logout());
      dispatch(openLoginModal());
    }
  }, [user, isError, token, dispatch]);

  if (!token) {
    
    setTimeout(() => dispatch(openLoginModal()), 0);
    
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-100">
        <span className="text-xl font-bold text-gray-400 animate-pulse">Checking access...</span>
      </div>
    );
  }

  return <Outlet />;
};