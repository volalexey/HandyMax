import { NavLink } from "react-router-dom";
import { Order } from "../../components/userPanel/order/Order";
import img from "../../assets/img/services1.png"; 
import arrowGrey from "../../assets/img/arrowGrey.svg";
import downloadIcon from "../../assets/img/download.svg";

export const OrderDetailsPage = () => {
  return (
    <div className="bg-white w-full min-h-[70vh] rounded-[20px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.15)] 
                    p-[30px_10px_20px] lg:p-[60px_40px] xl:p-[60px_100px] flex flex-col gap-[20px]">
      
      <h2 className="text-[2.5rem] font-bold uppercase text-center lg:text-left">
        Ordine n. 0202
      </h2>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 relative w-full">
        
        <NavLink 
          to="/user-panel/orders" 
          className="flex items-center gap-2 text-gray-500 font-medium hover:text-black transition absolute -top-16 left-0 lg:static lg:top-auto"
        >
          <img src={arrowGrey} alt="back" className="w-6 h-6 rotate-90" />
          Indietro
        </NavLink>

        <button className="flex items-center gap-2 uppercase font-medium bg-transparent border-none cursor-pointer ml-auto lg:ml-0">
          Scarica l'assegno
          <img src={downloadIcon} alt="download" className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col gap-[20px]">
        
        <Order 
          number=""
          image={img}
          name="Montaggio mobili"
          description="Assemblaggio di armadi, tavoli, letti, scaffali e altri mobili secondo le istruzioni o su misura"
          isDetails={true} 
        />

        <div className="w-full h-[1px] bg-[#8B8B8B] my-[20px]"></div>

        <div className="flex flex-col gap-[20px]">
          <h3 className="text-[1.5rem] font-bold uppercase">Lavori eseguiti:</h3>
          
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2.5 max-w-[40%]">
              <p className="text-sm font-bold uppercase">Lorem Ipsum</p>
              <p className="text-xs text-[#575757] uppercase">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <p className="text-sm font-bold uppercase">X2</p>
            <p className="text-sm font-bold uppercase">Prezzo: €20</p>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2.5 max-w-[40%]">
              <p className="text-sm font-bold uppercase">Lorem Ipsum</p>
              <p className="text-xs text-[#575757] uppercase">Lorem Ipsum is simply dummy text...</p>
            </div>
            <p className="text-sm font-bold uppercase">X2</p>
            <p className="text-sm font-bold uppercase">Prezzo: €20</p>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#8B8B8B] my-[20px]"></div>

        <div className="flex flex-col gap-[20px]">
          <h3 className="text-[1.5rem] font-bold uppercase">Contare:</h3>
          
          <div className="flex flex-col gap-[15px] w-full lg:max-w-[40%]">
            <div className="flex justify-between items-center">
              <p className="text-sm font-bold uppercase">Prezzo base:</p>
              <p className="text-sm font-bold uppercase text-[#B7B7B7]">€XX.XX</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-bold uppercase">parametri aggiuntivi:</p>
              <p className="text-sm font-bold uppercase text-[#B7B7B7]">€XX.XX</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-bold uppercase">urgenza:</p>
              <p className="text-sm font-bold uppercase text-[#B7B7B7]">€XX.XX</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm font-bold uppercase">tasse:</p>
              <p className="text-sm font-bold uppercase text-[#B7B7B7]">€XX.XX</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[20px] w-full lg:max-w-[70%] mt-[30px]">
          <div className="flex justify-between items-center text-[1.5rem] font-bold uppercase text-orange-500">
            <h3>Costo totale:</h3>
            <p>€XX.XX</p>
          </div>
          
          <p className="text-xs text-[#575757] uppercase">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_2fr] gap-2.5 w-full lg:max-w-[90%]">
            <button className="h-[35px] bg-orange-500 text-white font-bold uppercase rounded-lg text-sm">
              Riordinare
            </button>
            <button className="h-[35px] bg-[#191A19] text-white font-bold uppercase rounded-lg text-sm">
              Lascia una recensione
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};