import { useState } from "react";
import cross from "../../assets/img/crossWhite.png";

interface CalculatorProps {
  onClose: () => void;
}

export const Calculator = ({ onClose }: CalculatorProps) => {
  const [isPriceVisible, setIsPriceVisible] = useState(false);

  return (
    <div className="flex flex-col gap-4 text-white w-full lg:w-[400px]">
      
      <div className={`bg-[#353535] rounded-t-xl lg:rounded-xl p-6 shadow-2xl ${isPriceVisible ? 'hidden lg:block' : 'block'}`}>
        
        <div className="flex items-center justify-between mb-6 border-b border-gray-600 pb-4">
          <h2 className="text-xl font-bold text-orange-500 uppercase">
            Calcolatore dei costi
          </h2>
          <img src={cross} alt="Close" onClick={onClose} className="w-5 h-5 cursor-pointer hover:opacity-70" />
        </div>

        <form className="flex flex-col gap-5">
          
          <div className="flex flex-col lg:flex-row gap-2 lg:items-center justify-between">
            <label htmlFor="service" className="uppercase text-sm w-1/4">Servizio:</label>
            <input id="service" type="text" placeholder="Seleziona..." 
              className="w-full lg:w-3/4 bg-transparent border border-white rounded h-10 px-3 placeholder-gray-400 focus:border-orange-500 outline-none transition" />
          </div>

          <div className="flex flex-col lg:flex-row gap-2 lg:items-center justify-between">
            <label htmlFor="units" className="uppercase text-sm w-1/4">Numero:</label>
            <input id="units" type="number" placeholder="Valore" 
              className="w-full lg:w-3/4 bg-transparent border border-white rounded h-10 px-3 placeholder-gray-400 focus:border-orange-500 outline-none transition" />
          </div>

          <div className="flex flex-col lg:flex-row gap-2 lg:items-center justify-between">
            <label htmlFor="params" className="uppercase text-sm w-1/4">Parametri:</label>
            <input id="params" type="text" placeholder="Valore" 
              className="w-full lg:w-3/4 bg-transparent border border-white rounded h-10 px-3 placeholder-gray-400 focus:border-orange-500 outline-none transition" />
          </div>

          <div className="flex flex-col lg:flex-row gap-2 lg:items-center justify-between">
            <label htmlFor="urgency" className="uppercase text-sm w-1/4">Urgenza:</label>
            <input id="urgency" type="text" placeholder="Seleziona..." 
              className="w-full lg:w-3/4 bg-transparent border border-white rounded h-10 px-3 placeholder-gray-400 focus:border-orange-500 outline-none transition" />
          </div>

          <button 
            type="button" 
            onClick={() => setIsPriceVisible(true)}
            className="lg:hidden w-full bg-orange-500 text-white font-bold h-12 rounded mt-4"
          >
            Calcolare
          </button>

        </form>
      </div>

      <div className={`bg-[#353535] rounded-t-xl lg:rounded-xl p-6 shadow-2xl ${isPriceVisible ? 'block' : 'hidden lg:block'}`}>
        
        <button onClick={() => setIsPriceVisible(false)} className="lg:hidden text-gray-400 text-sm mb-4">
          ← Indietro
        </button>

        <div className="flex flex-col gap-3 border-b border-gray-600 pb-6 mb-6">
          <Row title="Prezzo base:" value="XX.XX" />
          <Row title="Opzioni aggiuntive:" value="XX.XX" />
          <Row title="Urgenza:" value="XX.XX" />
          <Row title="Tasse:" value="XX.XX" />
        </div>

        <div className="flex justify-between items-center mb-4">
           <h3 className="text-xl uppercase font-bold">Costo totale:</h3>
           <p className="text-xl font-bold text-orange-500">€XX.XX</p>
        </div>

        <p className="text-xs text-gray-400 mb-6 uppercase">
          Lorem Ipsum is simply dummy text of the printing industry.
        </p>

        <button className="w-full lg:w-1/2 mx-auto block bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 rounded transition">
          Ordina ora
        </button>
      </div>

    </div>
  );
};

const Row = ({title, value}: {title: string, value: string}) => (
  <div className="flex justify-between items-center w-3/4 lg:w-1/2">
    <span className="font-bold uppercase text-sm">{title}</span>
    <span className="text-gray-400">{value}</span>
  </div>
);