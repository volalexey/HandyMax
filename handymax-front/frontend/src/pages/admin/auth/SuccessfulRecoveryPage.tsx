import { NavLink } from "react-router-dom";
import markIcon from "../../../assets/img/successfulRecovery.svg";

export const SuccessfulRecoveryPage = () => {
  return (
    <div className="flex flex-col w-full
                    lg:items-center lg:justify-center lg:h-[90vh]
                    mx-auto mt-[170px] lg:mt-0 max-w-[90vw] lg:max-w-full">
      
      <div className="flex flex-col items-center gap-10 w-full h-[80vh] lg:h-auto">
        
        <img src={markIcon} alt="Success" className="w-[100px] h-[100px] lg:w-auto lg:h-auto" />

        <div className="flex flex-col items-center text-center gap-2">
          <h1 className="text-[2.2rem] lg:text-[4rem] font-normal leading-tight text-black">
            Congratulations!
          </h1>
          <p className="text-[1rem] lg:text-[1.5rem] font-light max-w-[650px] text-black">
            Your password has been reset
          </p>
        </div>

        <NavLink 
          to="/admin-auth/log-in"
          className="bg-[#FFCD39] text-black rounded-[6px] text-base font-medium
                     h-[40px] flex items-center justify-center hover:opacity-80 transition-opacity
                     w-full lg:w-[85px]"
        >
          Log in
        </NavLink>

      </div>
    </div>
  );
};