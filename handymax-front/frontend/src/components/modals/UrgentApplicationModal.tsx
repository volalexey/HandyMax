import { useState } from "react";
import { createPortal } from "react-dom";

import cross from "../../assets/img/crossWhite.png";
import bucket from "../../assets/img/bucket.png";
import fileButtonIcon from "../../assets/img/fileButton.svg";
import arrowGrey from "../../assets/img/arrowGrey.svg";

interface UrgentModalProps {
  onClose: () => void;
}

export const UrgentApplicationModal = ({ onClose }: UrgentModalProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageName(file.name);
      e.target.value = "";
    }
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
    setImageName(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Срочная заявка отправлена! +20% к стоимости.");
    onClose();
  };

  const inputClasses = "w-full bg-transparent border border-white rounded px-4 text-white placeholder-white outline-none focus:border-black transition-colors h-[70px] lg:h-[40px]";

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end lg:items-center justify-center">
      
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative z-10 bg-orange-500 w-full lg:w-[500px] h-[90vh] lg:h-auto 
                      rounded-t-[30px] lg:rounded-xl p-6 lg:p-8 text-white shadow-2xl 
                      animate-in slide-in-from-bottom duration-300 overflow-y-auto lg:overflow-visible">
        
        <img 
          src={cross} 
          alt="Close" 
          onClick={onClose}
          className="absolute top-6 right-6 cursor-pointer w-6 h-6 hover:opacity-80 transition-opacity" 
        />

        <h2 className="text-center text-[1.5rem] lg:text-[2.25rem] font-bold uppercase mt-8 lg:mt-5 mb-2">
          Chiamata urgente
        </h2>
        <h3 className="text-center text-sm lg:text-base font-normal uppercase mb-8 px-2 leading-relaxed">
          quando si ordina una chiamata urgente, viene aggiunto +20% al costo del servizio
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-2 lg:px-12 pb-10 lg:pb-0">
          
          <div className="relative">
            <input 
              name="type" 
              type="text" 
              placeholder="Scegli un tipo di lavoro" 
              className={inputClasses}
            />
            <img 
              src={arrowGrey} 
              alt="arrow" 
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 -rotate-90 pointer-events-none"
            />
          </div>

          <input type="text" placeholder="Orario di arrivo preferito" className={inputClasses} />
          <input type="text" placeholder="Name" className={inputClasses} />
          <input type="tel" placeholder="Phone" className={inputClasses} />
          
          <textarea 
            placeholder="Descrivi il problema"
            className={`${inputClasses} h-[130px] lg:h-[150px] py-3 resize-none`}
          />

          <input onChange={handleFileChange} type="file" id="urgent-file" className="hidden" />
          
          {!imageName && (
            <label htmlFor="urgent-file" className="cursor-pointer hover:opacity-90 transition">
              <img src={fileButtonIcon} alt="Upload" className="w-full" />
            </label>
          )}

          {imagePreview && (
            <div className="flex items-center justify-between bg-white/10 p-2 rounded border border-white/30">
              <div className="flex items-center gap-4 overflow-hidden">
                <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded" />
                <span className="truncate max-w-[150px] text-sm">{imageName}</span>
              </div>
              <img src={bucket} alt="Delete" className="w-6 h-6 cursor-pointer hover:scale-110" onClick={handleDeleteImage} />
            </div>
          )}

          <button 
            type="submit"
            className="mt-2 w-full h-[50px] bg-[#6F6F6F] hover:bg-[#5a5a5a] text-white font-bold uppercase rounded transition-colors"
          >
            Invia la domanda
          </button>

        </form>
      </div>
    </div>,
    document.body
  );
};