import { NavLink } from "react-router-dom";
import arrowBlack from "../../../assets/img/arrowBlack.svg";

interface OrderProps {
  number: string;
  image: string;
  name: string;
  description: string;
  status?: string;
  isDetails?: boolean;
}

export const Order = ({ number, image, name, description, status, isDetails = false }: OrderProps) => {
  return (
    <div className={`flex flex-col gap-5 w-full ${isDetails ? 'max-w-full' : 'lg:max-w-[90%]'}`}>
      
      {(number || status) && (
        <div className="flex justify-between items-center">
          {number && <h4 className="text-2xl font-bold uppercase">{number}</h4>}
          
          {status && (
            <p className="text-2xl bg-[#08A63D] rounded-[23px] text-white px-[30px] lg:px-[60px] py-[3px]">
              {status}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-5 items-start lg:items-center">
        
        <img 
          src={image} 
          alt={name} 
          className="w-[70%] h-auto lg:w-[200px] lg:h-[130px] object-cover rounded-lg"
        />

        <div className="flex flex-col">
          <p className="text-2xl font-bold uppercase text-orange-500">
            {name}
          </p>
          
          <p className="text-2xl text-[#575757] uppercase">
            {description}
          </p>
        </div>
      </div>

      {!isDetails && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-2.5 w-full lg:max-w-[70%]">
            <button className="w-full h-[35px] bg-orange-500 text-white text-sm font-bold rounded-lg">
              Riordinare
            </button>
            
            <NavLink 
              to="/user-panel/create-review" 
              className="flex items-center justify-center w-full h-[35px] bg-[#191A19] text-white text-sm font-bold rounded-lg whitespace-nowrap"
            >
              Lascia una recensione
            </NavLink>
          </div>

          <NavLink 
            to="/user-panel/order-details" 
            className="text-[#575757] uppercase relative w-fit flex items-center"
          >
            Visualizza i dettagli dell'ordine
            <img src={arrowBlack} alt="->" className="ml-2 w-6 h-6" />
          </NavLink>
        </>
      )}

    </div>
  );
};