import { useOutletContext } from "react-router-dom";
import arrowGrey from "../../assets/img/arrowGrey.svg";

type UserLayoutContextType = {
  isFullScreenNavOpen: boolean;
  setIsFullScreenNavOpen: (value: boolean) => void;
};

export const PersonalInformation = () => {
  const { setIsFullScreenNavOpen } = useOutletContext<UserLayoutContextType>();

  const inputClasses = `
    w-full h-[50px] lg:h-[60px] px-4 
    bg-transparent border border-gray-300 rounded-lg 
    text-lg outline-none focus:border-black transition-colors 
    placeholder-gray-400
  `;

  return (
    <div className="bg-white w-full min-h-[70vh] rounded-[20px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.15)] 
                    p-6 lg:p-[60px] lg:px-[100px] flex flex-col gap-[30px]">
      
      <button
        onClick={() => setIsFullScreenNavOpen(true)}
        className="lg:hidden flex items-center gap-2 text-gray-500 font-medium hover:text-black transition mb-2"
      >
        <img src={arrowGrey} alt="back" className="w-4 h-4 rotate-90" />
        Indietro
      </button>

      <h2 className="text-[2rem] lg:text-[2.5rem] font-bold uppercase leading-none">
        Informazioni personali
      </h2>

      <form className="flex flex-col gap-5 w-full lg:w-[60%]">
        
        <input 
          className={inputClasses} 
          placeholder="Name" 
          type="text" 
          defaultValue="Maxim"
        />
        
        <input 
          className={inputClasses} 
          placeholder="Numero di telefono" 
          type="tel" 
        />
        
        <input 
          className={inputClasses} 
          placeholder="Posta" 
          type="email" 
        />
        
        <input 
          className={inputClasses} 
          placeholder="Città" 
          type="text" 
        />
        
        <input 
          className={inputClasses} 
          placeholder="Indirizzo" 
          type="text" 
        />

        <button 
          className="mt-4 w-full h-[65px] bg-[#191A19] text-white font-bold text-xl rounded-lg hover:bg-black transition shadow-md"
        >
          Modificare
        </button>

      </form>
    </div>
  );
};