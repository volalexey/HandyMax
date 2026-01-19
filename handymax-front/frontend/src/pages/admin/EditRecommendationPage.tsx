import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useGetRecommendationByIdQuery, useUpdateRecommendationMutation } from "../../store/api/recommendationsApi";
import { useUploadFileMutation } from "../../store/api/filesApi";

import homeBlue from "../../assets/img/homeBlue.svg";
import arrowGreyBold from "../../assets/img/arrowGreyBold.svg";
import arrowBlackBold from "../../assets/img/arrowBlackBold.svg";
import trashIcon from "../../assets/img/trash.svg"; // Убедись, что иконка есть

export const EditRecommendationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- API HOOKS ---
  // 1. Получаем данные статьи по ID
  const { data: recommendation, isLoading: isFetching } = useGetRecommendationByIdQuery(id || "");
  
  // 2. Мутации для обновления и загрузки фото
  const [updateRecommendation, { isLoading: isUpdating }] = useUpdateRecommendationMutation();
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();

  // --- STATE ---
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  // --- EFFECT: Pre-fill form ---
  // Как только данные пришли с сервера, заполняем ими форму
  useEffect(() => {
    if (recommendation) {
      setFormData({
        title: recommendation.title,
        content: recommendation.content,
        imageUrl: recommendation.imageUrl || "",
      });
    }
  }, [recommendation]);

  // --- HANDLERS ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const response = await uploadFile(file).unwrap();
      setFormData(prev => ({ ...prev, imageUrl: response.url }));
    } catch (err) {
      alert("Failed to upload image");
    } finally {
        e.target.value = ''; // Сброс инпута
    }
  };

  const handleRemoveImage = () => {
      setFormData(prev => ({ ...prev, imageUrl: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      // Отправляем ID и обновленные данные
      await updateRecommendation({ 
        id: Number(id), 
        body: formData 
      }).unwrap();
      
      navigate("/admin-panel/recommendations");
    } catch (err) {
      console.error(err);
      alert("Failed to update recommendation");
    }
  };

  // Styles (твои классы)
  const labelClass = "font-sans text-base font-normal text-gray-600";
  const inputClass = "w-full lg:w-[300px] h-[30px] border border-[#d7dde3] rounded-lg p-2 text-base outline-none focus:border-orange-500 transition";
  const textareaClass = "w-full lg:w-[350px] h-[160px] border border-[#d7dde3] rounded-lg p-3 text-base outline-none focus:border-orange-500 transition resize-none";

  const isBusy = isUpdating || isUploading;

  if (isFetching) return <div className="p-10 text-gray-500">Loading...</div>;

  return (
    <div className="bg-white w-full min-h-[80vh] flex flex-col gap-[20px] rounded-[20px] p-[20px] lg:rounded-[80px] lg:p-[40px_60px]">
      
      {/* BREADCRUMBS */}
      <div className="flex items-center gap-[20px] font-sans text-sm lg:text-base relative">
        <NavLink to="/admin-panel/recommendations" className="text-[#0D6EFD] pl-[15px] relative flex items-center">
          <img src={homeBlue} alt="home" className="absolute top-[3px] left-[-5px] w-4 h-4" />
          Recommendations
        </NavLink>
        
        <p className="text-[#6C757D] pl-[10px] relative flex items-center">
          <span className="absolute left-[-10px] top-[5px] w-[10px] h-[10px] bg-no-repeat bg-contain" 
                style={{ backgroundImage: `url(${arrowGreyBold})` }}></span>
          {/* Показываем название статьи или Edit */}
          {recommendation?.title || "Edit recommendation"}
        </p>
      </div>

      <NavLink to="/admin-panel/recommendations" className="font-bold text-black pl-[15px] relative w-fit flex items-center mt-2">
        <span className="absolute left-[-3px] top-[6px] w-[10px] h-[10px] bg-no-repeat bg-contain"
              style={{ backgroundImage: `url(${arrowBlackBold})` }}></span>
        Back
      </NavLink>

      <h1 className="text-[2.25rem] font-extrabold mb-[25px]">
        Edit recommendation
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-[50px]">
        
        {/* TITLE */}
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="title" className={labelClass}>About the article</label>
          <div className="relative w-fit">
            <input 
                id="title" 
                value={formData.title}
                onChange={handleChange}
                type="text" 
                placeholder="Article title" 
                className={inputClass} 
            />
          </div>
        </div>

        {/* PHOTO UPLOAD (Встроенная логика вместо AddPhoto) */}
        <div className="flex flex-col gap-[10px]">
          <p className={labelClass}>Add video or photo</p>
          
          <div className="flex items-start gap-4">
             {/* 1. Кнопка загрузки (если фото нет) */}
             {!formData.imageUrl && (
                 <div 
                    onClick={() => !isBusy && fileInputRef.current?.click()}
                    className={`w-[150px] h-[150px] border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition ${isBusy ? 'opacity-50' : ''}`}
                 >
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="hidden" 
                        accept="image/*"
                    />
                    {isUploading ? (
                        <span className="text-sm text-gray-500 animate-pulse">Uploading...</span>
                    ) : (
                        <>
                            <span className="text-3xl text-gray-400 mb-1">+</span>
                            <span className="text-gray-500 text-sm">Upload</span>
                        </>
                    )}
                 </div>
             )}

             {/* 2. Превью фото (если фото есть) */}
             {formData.imageUrl && (
                 <div className="relative w-[300px] h-[180px] rounded-xl overflow-hidden border border-gray-200 group">
                     <img 
                        src={formData.imageUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                     />
                     {/* Кнопка удаления */}
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                         <button 
                            type="button"
                            onClick={handleRemoveImage}
                            className="bg-white p-2 rounded-full hover:bg-red-50"
                         >
                             <img src={trashIcon} alt="delete" className="w-6 h-6" />
                         </button>
                     </div>
                 </div>
             )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="content" className={labelClass}>Add description</label>
          <div className="relative w-fit">
            <textarea 
                id="content" 
                value={formData.content}
                onChange={handleChange}
                placeholder="Enter description" 
                className={textareaClass} 
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-[17px] mt-4">
          <button 
            type="submit"
            disabled={isBusy}
            className="w-[220px] h-[55px] bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition disabled:opacity-50"
          >
            {isUpdating ? "Saving..." : "Save changes"}
          </button>
          
          <button 
            type="button"
            onClick={() => navigate("/admin-panel/recommendations")}
            className="w-[220px] h-[55px] bg-[#191A19] text-white font-medium rounded-xl hover:bg-black transition"
          >
            Cancel
          </button>
        </div>

      </form>

    </div>
  );
};