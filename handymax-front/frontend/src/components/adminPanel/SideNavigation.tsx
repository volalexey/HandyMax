import { useState } from "react";
import { NavLink } from "react-router-dom";

import logo from "../../assets/img/adminPanelLogo.svg";
import handyMax from "../../assets/img/HandyMax.svg";
import burger from "../../assets/img/burgerAdmin.svg";

export const SideNavigation = () => {
  const [isFullScreenActive, setIsFullScreenActive] = useState(false);

  const linkClasses = ({ isActive }: { isActive: boolean }) => `
    text-lg font-medium transition-colors duration-200
    ${isActive ? 'text-white font-bold' : 'text-white/50 hover:text-white/80'}
  `;

  return (
    <div className={`
      flex flex-col gap-[70px] w-full transition-all duration-300 ease-in-out
      
      /* Mobile logic */
      lg:h-auto lg:static lg:bg-transparent lg:p-0 lg:z-0 lg:overflow-visible
      ${isFullScreenActive 
         ? 'absolute top-0 left-0 h-screen bg-[#191A19] z-50 p-5' 
         : 'h-[50px] overflow-hidden px-5 lg:h-auto'
       }
    `}>
      
      <img src={logo} alt="logo" className="w-[110px] self-center hidden lg:block" />

      <div className="flex justify-between items-center lg:hidden gap-2">
        
        {!isFullScreenActive && (
           <img src={handyMax} alt="HandyMax" className="h-8" />
        )}

        {!isFullScreenActive && (
           <img 
             src={burger} 
             alt="menu" 
             onClick={() => setIsFullScreenActive(true)}
             className="border border-white/10 rounded p-1 cursor-pointer" 
           />
        )}

        {isFullScreenActive && (
           <img 
             src={logo} 
             alt="logo" 
             onClick={() => setIsFullScreenActive(false)}
             className="mx-auto mt-12 w-[110px] cursor-pointer"
           />
        )}
      </div>

      <nav className="flex flex-col gap-4 lg:gap-2">
        <NavLink to="statistics" className={linkClasses} onClick={() => setIsFullScreenActive(false)}>
          Statistics
        </NavLink>
        <NavLink to="services" className={linkClasses} onClick={() => setIsFullScreenActive(false)}>
          Services
        </NavLink>
        <NavLink to="about" className={linkClasses} onClick={() => setIsFullScreenActive(false)}>
          About the master
        </NavLink>
        <NavLink to="reviews" className={linkClasses} onClick={() => setIsFullScreenActive(false)}>
          Reviews
        </NavLink>
        <NavLink to="contacts" className={linkClasses} onClick={() => setIsFullScreenActive(false)}>
          Contacts
        </NavLink>
        <NavLink to="recommendations" className={linkClasses} onClick={() => setIsFullScreenActive(false)}>
          Recommendations
        </NavLink>
      </nav>

    </div>
  );
};