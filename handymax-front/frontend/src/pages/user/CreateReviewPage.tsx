import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Order } from "../../components/userPanel/order/Order";

import img from "../../assets/img/services1.png";
import arrowGrey from "../../assets/img/arrowGrey.svg";
import fileButtonBlack from "../../assets/img/fileButtonBlack.svg";
import starIcon from  "../../assets/img/star.svg";

export const CreateReviewPage = () => {
  const [rating, setRating] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };

  return (
    <div className="bg-white w-full min-h-[70vh] rounded-[20px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.15)] 
                    p-[60px_20px_20px] lg:p-[60px_100px] flex flex-col gap-[20px] relative">
      
      <div className="flex flex-col gap-3">
        <h3 className="text-[1.17em] font-bold uppercase tracking-wide">
          <span className="mr-4">Ordine n. 0202</span> / risposta
        </h3>

        <NavLink 
          to="/user-panel/orders" 
          className="flex items-center gap-2 text-gray-500 font-medium hover:text-black transition absolute top-0 left-0 p-5 lg:static lg:p-0"
        >
          <img src={arrowGrey} alt="back" className="w-4 h-4 rotate-90" />
          Indietro
        </NavLink>
      </div>

      <div className="flex flex-col gap-[40px]">
        
        <Order 
          number="Ordine n. 0202"
          image={img}
          name="Montaggio mobili"
          description="Assemblaggio di armadi, tavoli, letti, scaffali e altri mobili secondo le istruzioni o su misura"
          isDetails={true}
        />

        <form className="flex flex-col gap-[25px] w-full lg:max-w-[60%]">
          
          <textarea 
            name="text" 
            className="h-[130px] w-full resize-none rounded-lg border border-gray-300 p-3 text-base font-normal focus:border-black outline-none transition"
            placeholder="Scrivi la tua recensione..."
          ></textarea>

          <div className="w-full">
            <label htmlFor="review-file" className="cursor-pointer block w-full lg:w-auto">
              <img src={fileButtonBlack} alt="Upload" className="w-full lg:w-auto object-cover" />
            </label>
            <input 
              id="review-file" 
              type="file" 
              className="hidden" 
              onChange={handleFileChange} 
            />
          </div>

          <div className="flex flex-col gap-[10px]">
            <h4 className="text-sm font-bold uppercase">Valuta il servizio</h4>
            <div className="flex gap-[5px]">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  type="button"
                  onClick={() => setRating(star)}
                  className={`w-6 h-6 transition-transform hover:scale-110 ${rating >= star ? 'opacity-100' : 'opacity-30 grayscale'}`}
                >
                  <img src={starIcon} alt="star" className="w-full h-full" />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1.5fr] gap-[10px] w-full lg:max-w-[80%] mt-[20px]">
            
            <button className="h-[35px] bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition">
              Invia feedback
            </button>
            
            <button className="h-[35px] bg-[#191A19] text-white text-sm font-medium rounded-lg hover:bg-black transition">
              Cancellare
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};