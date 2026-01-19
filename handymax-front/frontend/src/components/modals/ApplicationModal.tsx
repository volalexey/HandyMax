import { useState } from "react";
import { createPortal } from "react-dom";

import cross from "../../assets/img/crossWhite.png";
import bucket from "../../assets/img/bucket.png";
import fileButtonIcon from "../../assets/img/fileButton.svg"; 

interface ApplicationModalProps {
  onClose: () => void;
}

export const ApplicationModal = ({ onClose }: ApplicationModalProps) => {
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
    alert("Заявка отправлена!");
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end lg:items-center justify-center">
      
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative z-10 bg-orange-500 w-full h-[90vh] lg:h-auto lg:w-[500px] lg:min-h-[675px] 
                      rounded-t-[30px] lg:rounded-xl p-6 lg:p-8 text-white shadow-2xl 
                      animate-in slide-in-from-bottom duration-300">
        
        <img 
          src={cross} 
          alt="Close" 
          onClick={onClose}
          className="absolute top-6 right-6 cursor-pointer w-6 h-6 hover:opacity-80 transition-opacity" 
        />

        <h2 className="text-center text-[1.5rem] lg:text-[2.25rem] font-bold uppercase mt-8 lg:mt-5 mb-2">
          Compila la domanda
        </h2>
        <h3 className="text-center text-base lg:text-lg font-normal uppercase mb-8 px-4">
          Dopo aver compilato il modulo, l'assistente ti contatterà a breve
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-2 lg:px-12">
          
          <input 
            type="text" 
            placeholder="Name" 
            className="w-full h-[70px] lg:h-[40px] px-4 py-7 rounded-xl text-black outline-none focus:ring-4 focus:ring-black/20 transition"
          />
          
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full h-[70px] lg:h-[40px] px-4 py-7 rounded-xl text-black outline-none focus:ring-4 focus:ring-black/20 transition"
          />
          
          <input 
            type="tel" 
            placeholder="Phone" 
            className="w-full h-[70px] lg:h-[40px] px-4 py-7 rounded-xl text-black outline-none focus:ring-4 focus:ring-black/20 transition"
          />
          
          <textarea 
            placeholder="Descrivi il problema"
            className="w-full h-[130px] lg:h-[100px] p-4 rounded-xl text-black outline-none focus:ring-4 focus:ring-black/20 transition resize-none"
          />

          <input 
            onChange={handleFileChange} 
            type="file" 
            id="file" 
            className="hidden" 
          />

          {!imageName && (
            <label htmlFor="file" className="cursor-pointer hover:opacity-90 transition">
              <img src={fileButtonIcon} alt="Upload" className="w-full" />
            </label>
          )}

          {imagePreview && (
            <div className="flex items-center justify-between bg-white/10 p-2 rounded border border-white/30">
              <div className="flex items-center gap-4 overflow-hidden">
                <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded" />
                <span className="truncate max-w-[150px] text-sm">{imageName}</span>
              </div>
              
              <img 
                src={bucket} 
                alt="Delete" 
                className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                onClick={handleDeleteImage}
              />
            </div>
          )}

          <button 
            type="submit"
            className="mt-4 w-full h-[50px] bg-[#6F6F6F] hover:bg-[#5a5a5a] text-white font-bold uppercase rounded transition-colors"
          >
            Invia la domanda
          </button>

        </form>
      </div>
    </div>,
    document.body
  );
};