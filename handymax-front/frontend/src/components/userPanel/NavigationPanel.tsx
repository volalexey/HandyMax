import { useState } from "react";
import { NavLink } from "react-router-dom";
import profile from "../../assets/img/profileIcon.png";
import { UrgentApplicationModal } from "../../components/modals/UrgentApplicationModal";

type Props = {
  isFullScreenNavOpen: boolean;
  setIsFullScreenNavOpen: (value: boolean) => void;
};

export const NavigationPanel = ({ isFullScreenNavOpen, setIsFullScreenNavOpen }: Props) => {
  const [isUrgentApplicationModalOpen, setIsUrgentApplicationModalOpen] = useState(false);

  const linkClasses = ({ isActive }: { isActive: boolean }) => `
    text-[1.5rem] font-medium transition-colors w-fit cursor-pointer
    ${isActive ? 'font-bold border-b border-black text-black' : 'text-black hover:text-orange-500'}
  `;

  return (
    <>
      <aside className={`
        bg-white rounded-[20px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.15)] 
        relative pt-[90px] pb-[30px] px-[20px] lg:px-[40px] flex flex-col gap-[30px]
        
        /* Mobile logic based on isFullScreenNavOpen */
        ${isFullScreenNavOpen ? 'flex h-[80vh] w-full' : 'hidden'}
        
        /* Desktop logic (всегда показываем как сайдбар) */
        lg:flex lg:h-[70vh] lg:w-full lg:relative
      `}>
        
        <img 
          src={profile} 
          alt="profile" 
          className="absolute -top-[25px] left-1/2 -translate-x-1/2 w-[120px] lg:w-auto"
        />

        <nav className="flex flex-col gap-[30px] items-center lg:items-start mt-4 lg:mt-0">
          
          <NavLink 
            to="personal-info" 
            className={linkClasses}
            onClick={() => setIsFullScreenNavOpen(false)}
          >
            Informazioni personali
          </NavLink>

          <NavLink 
            to="orders" 
            className={linkClasses}
            onClick={() => setIsFullScreenNavOpen(false)}
          >
            Ordine
          </NavLink>

          <NavLink 
            to="recommendations" 
            className={linkClasses}
            onClick={() => setIsFullScreenNavOpen(false)}
          >
            Raccomandazioni
          </NavLink>
        </nav>

        <div className="mt-auto flex flex-col gap-3 w-full">
          <button 
            onClick={() => setIsUrgentApplicationModalOpen(true)}
            className="w-full h-[65px] bg-orange-500 text-white font-bold text-xl rounded-lg hover:bg-orange-600 transition"
          >
            Ordina un servizio urgente
          </button>
          
          <button className="w-full h-[65px] bg-[#191A19] text-white font-bold text-xl rounded-lg hover:bg-black transition lg:hidden">
            Log out
          </button>
        </div>

      </aside>

      {isUrgentApplicationModalOpen && (
        <UrgentApplicationModal onClose={() => setIsUrgentApplicationModalOpen(false)} />
      )}
    </>
  );
};