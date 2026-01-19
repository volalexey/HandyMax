import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../store/api/authApi";
import { useDispatch } from "react-redux";
import { logout, setCredentials } from "../../../store/slices/authSlice";

export const LogInPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault();
    setErrorMsg('');

    try {
      const userData = await login( { email, password }).unwrap();
      if (userData.user.role !== 'ADMIN')  {
        dispatch(logout());
        setErrorMsg('Access denied. Administrators only.');
        return;
      }

      dispatch(setCredentials({
        user: userData.user,
        token: userData.access_token
      }));

      navigate('/admin-panel/statistics');
    } catch (err) {
      setErrorMsg('Invalid email or password');
    }
  };

  return (
    <div className="flex flex-col w-full
                    lg:items-center lg:justify-center lg:h-screen
                    mx-auto mt-[70px] max-w-[90vw] lg:mt-0 lg:max-w-full">
      
      <div className="flex flex-col items-center gap-5 w-full h-[80vh] lg:h-auto">
        
        <h1 className="text-[4rem] font-normal leading-tight text-black">
          Log in
        </h1>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5 w-auto h-full lg:h-auto">
          
          <input 
            type="text" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-[50px] w-full lg:w-[500px] border border-gray-300 rounded px-4 text-lg outline-none focus:border-black transition-colors"
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-[50px] w-full lg:w-[500px] border border-gray-300 rounded px-4 text-lg outline-none focus:border-black transition-colors"
          />

          <NavLink 
            to="/admin-auth/recover-password" 
            className="text-[#0599E9] self-end hover:underline lg:w-[500px] lg:text-right w-full text-right"
          >
            Recover password
          </NavLink>

          <button 
            className="bg-[#FFCD39] text-black rounded-[6px] text-base font-medium
                       h-[40px] flex items-center justify-center hover:opacity-80 transition-opacity
                       w-full mt-auto lg:mt-0 lg:w-[85px]"
          >
            {isLoading ? "Checking access..." : "Confirm"}
          </button>

        </form>
      </div>
    </div>
  );
};