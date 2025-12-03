import { NavLink } from "react-router-dom";

export const LogInPage = () => {
  return (
    <div className="flex flex-col w-full
                    lg:items-center lg:justify-center lg:h-screen
                    mx-auto mt-[70px] max-w-[90vw] lg:mt-0 lg:max-w-full">
      
      <div className="flex flex-col items-center gap-5 w-full h-[80vh] lg:h-auto">
        
        <h1 className="text-[4rem] font-normal leading-tight text-black">
          Log in
        </h1>

        <form className="flex flex-col items-center gap-5 w-auto h-full lg:h-auto">
          
          <input 
            type="text" 
            placeholder="Email" 
            className="h-[50px] w-full lg:w-[500px] border border-gray-300 rounded px-4 text-lg outline-none focus:border-black transition-colors"
          />
          
          <input 
            type="password" 
            placeholder="Password" 
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
            Confirm
          </button>

        </form>
      </div>
    </div>
  );
};