import { useState } from "react";
import { createPortal } from "react-dom";
import { useCreateUrgentRequestMutation } from "../../store/api/urgentApi";
import { useUploadFileMutation } from "../../store/api/filesApi";

import cross from "../../assets/img/crossWhite.png";
import bucket from "../../assets/img/bucket.png";
import fileButtonIcon from "../../assets/img/fileButton.svg";
import arrowGrey from "../../assets/img/arrowGrey.svg";

interface UrgentModalProps {
  onClose: () => void;
}

const WORK_TYPES = [
  "RUBINETTO ROTTO",
  "WC CHE PERDE",
  "TUBO DANNEGGIATO",
  "PRESA NON FUNZIONANTE",
  "CORTO CIRCUITO",
  "LUCE CHE LAMPEGGIA",
  "MENSOLE, ARMADI O LAMPADARI STACCATI",
  "INTASAMENTO DI SCARICHI O WC"
];

export const UrgentApplicationModal = ({ onClose }: UrgentModalProps) => {
  const [createRequest, { isLoading: isSubmitting }] = useCreateUrgentRequestMutation();
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();

  const [formData, setFormData] = useState({
    workType: "",
    arrivalTime: "",
    name: "",
    phone: "",
    description: "",
    imageUrl: ""
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectType = (type: string) => {
    setFormData({ ...formData, workType: type });
    setIsDropdownOpen(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageName(file.name);
      e.target.value = ""; 

      try {
        const response = await uploadFile(file).unwrap();
        
        setFormData(prev => ({ ...prev, imageUrl: response.url }));
        
      } catch (error) {
        console.error("Ошибка загрузки файла:", error);
        alert("Не удалось загрузить фото");
        handleDeleteImage();
      }
    }
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
    setImageName(null);
    setFormData(prev => ({ ...prev, imageUrl: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.workType) {
        alert("Пожалуйста, выберите тип работы и заполните контакты");
        return;
    }

    try {
        await createRequest(formData).unwrap();
        alert("Срочная заявка отправлена!");
        onClose();
    } catch (error) {
        console.error(error);
        alert("Ошибка при отправке заявки.");
    }
  };

  const inputClasses = "w-full bg-white border border-white rounded px-4 text-black placeholder-gray-400 outline-none focus:border-black transition-colors h-[70px] lg:h-[40px]";

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
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`${inputClasses} flex items-center cursor-pointer relative bg-transparent`}
            >
              <span className={formData.workType ? "text-gray-400" : "text-gray-400"}>
                {formData.workType || "SCEGLI UN TIPO DI LAVORO"}
              </span>
              <img 
                src={arrowGrey} 
                alt="arrow" 
                className={`absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 transition-transform duration-200 pointer-events-none 
                  ${isDropdownOpen ? 'rotate-90' : '-rotate-90'}`}
              />
            </div>

            {isDropdownOpen && (
              <div className="absolute top-[110%] left-0 w-full bg-white text-[#6F6F6F] rounded-xl shadow-lg z-50 max-h-[250px] overflow-y-auto py-2">
                 {WORK_TYPES.map((type, index) => (
                   <div 
                     key={index}
                     onClick={() => handleSelectType(type)}
                     className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm font-medium border-b last:border-0 border-gray-100 uppercase"
                   >
                     {type}
                   </div>
                 ))}
              </div>
            )}
          </div>

          <input 
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleInputChange}
            type="text" 
            placeholder="Orario di arrivo preferito" 
            className={inputClasses} 
          />
          
          <input 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            type="text" 
            placeholder="Name" 
            className={inputClasses} 
            required
          />
          
          <input 
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            type="tel" 
            placeholder="Phone" 
            className={inputClasses} 
            required
          />
          
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Descrivi il problema"
            className={`${inputClasses} h-[130px] lg:h-[150px] py-3 resize-none`}
          />

          <input onChange={handleFileChange} type="file" id="urgent-file" className="hidden" />
          
          {!imageName && (
            <label htmlFor="urgent-file" className="cursor-pointer hover:opacity-90 transition">
              {isUploading ? (
                  <div className="text-center text-sm py-2 bg-white/20 rounded">Caricamento foto...</div>
              ) : (
                  <img src={fileButtonIcon} alt="Upload" className="w-full" />
              )}
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
            disabled={isSubmitting || isUploading}
            className="mt-2 w-full h-[50px] bg-[#6F6F6F] hover:bg-[#5a5a5a] text-white font-bold uppercase rounded transition-colors disabled:opacity-70"
          >
            {isSubmitting ? "Invio..." : isUploading ? "Attesa foto..." : "Invia la domanda"}
          </button>

        </form>
      </div>
    </div>,
    document.body
  );
};