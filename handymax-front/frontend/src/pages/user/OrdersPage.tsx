import { useOutletContext } from "react-router-dom";
import { Order } from "../../components/userPanel/order/Order";
import arrowGrey from "../../assets/img/arrowGrey.svg";
import img from "../../assets/img/services1.png";

type UserLayoutContextType = {
  isFullScreenNavOpen: boolean;
  setIsFullScreenNavOpen: (value: boolean) => void;
};

export const OrdersPage = () => {
  const { isFullScreenNavOpen, setIsFullScreenNavOpen } = useOutletContext<UserLayoutContextType>();

  return (
    <div className={`
      bg-white w-full min-h-[70vh] rounded-[20px] 
      flex flex-col gap-[40px]
      
      /* Desktop shadows/padding */
      shadow-[0px_0px_20px_0px_rgba(0,0,0,0.15)] 
      p-[20px_10px_60px] lg:p-[60px_40px] xl:p-[60px_100px]

      /* Mobile logic: hide content if menu is open (inverted logic from your code) */
      ${!isFullScreenNavOpen ? 'flex' : 'hidden lg:flex'}
    `}>
      
      <button
        onClick={() => setIsFullScreenNavOpen(true)}
        className="lg:hidden flex items-center gap-2 text-gray-500 font-medium hover:text-black transition w-fit"
      >
        <img src={arrowGrey} alt="back" className="w-6 h-6 rotate-90" />
        Indietro
      </button>

      <h2 className="text-[2.5rem] font-bold uppercase lg:text-left text-center">
        Ordini
      </h2>

      <div className="flex flex-col gap-[40px]">
        
        <Order 
          number="Ordine n. 0202" 
          image={img} 
          name="Montaggio mobili" 
          description="Assemblaggio di armadi, tavoli, letti, scaffali e altri mobili secondo le istruzioni o su misura" 
          status="Fatto" 
        />

        <Order 
          number="Ordine n. 0203" 
          image={img} 
          name="Riparazione idraulica" 
          description="Riparazione di tubi, rubinetti e installazione di nuovi sanitari" 
          status="In corso" 
        />

      </div>
    </div>
  );
};