import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";
import { setCredentials } from "../../store/slices/authSlice";

// API
import { useUpdateProfileMutation } from "../../store/api/authApi";
import { useUploadFileMutation } from "../../store/api/filesApi";
import { 
  useGetPortfolioQuery, 
  useAddPortfolioItemMutation, 
  useDeletePortfolioItemMutation 
} from "../../store/api/portfolioApi";

// Картинки
import defaultMaster from "../../assets/img/master.png";
import editIcon from "../../assets/img/edit.svg";

export const AboutMasterAdminPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state: RootState) => state.auth);

  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const [uploadFile, { isLoading: isUploadingFile }] = useUploadFileMutation();
  
  const { data: portfolioItems, isLoading: isPortfolioLoading } = useGetPortfolioQuery();
  const [addPortfolioItem, { isLoading: isAddingWork }] = useAddPortfolioItemMutation();
  const [deletePortfolioItem] = useDeletePortfolioItemMutation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    avatarUrl: "",
  });

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const portfolioInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        description: user.description || "",
        avatarUrl: user.avatarUrl || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { url } = await uploadFile(file).unwrap();
      setFormData(prev => ({ ...prev, avatarUrl: url }));
    } catch (error) {
      alert("Error uploading avatar");
    }
  };

  const handleAddWork = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { url } = await uploadFile(file).unwrap();
      await addPortfolioItem({ imageUrl: url }).unwrap();
    } catch (error) {
      alert("Error adding work");
    }
  };

  const handleDeleteWork = async (id: number) => {
    if (window.confirm("Delete this photo?")) {
      await deletePortfolioItem(id);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedUser = await updateProfile(formData).unwrap();
      
      if(!token) return;
      dispatch(setCredentials({ user: updatedUser, token }));
      
      alert("Profile saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save profile");
    }
  };

  const isBusy = isSaving || isUploadingFile || isAddingWork;

  return (
    <div className="bg-white w-full min-h-[80vh] flex flex-col gap-[20px] rounded-[20px] p-[20px] lg:rounded-[80px] lg:p-[40px_60px]">
      
      <div className="mb-[25px]">
         <label className="text-gray-400 text-sm ml-1">Master Name</label>
         <input 
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="text-[2.25rem] font-extrabold w-full outline-none border-b border-transparent focus:border-orange-500 transition placeholder-gray-300"
            placeholder="Your Name"
         />
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-[50px]">
        
        <div className="flex flex-col gap-[15px]">
          <h2 className="text-[1.5rem] font-semibold">Photo</h2>
          
          <div className="relative w-fit group">
            <input 
                type="file" 
                ref={avatarInputRef}
                onChange={handleAvatarChange}
                className="hidden" 
                accept="image/*"
            />
            
            <img 
              src={formData.avatarUrl || defaultMaster} 
              alt="Master" 
              className="w-[200px] h-[200px] object-cover border-[1.73px] border-[#ADB5BD] p-[15px] rounded-sm"
            />
            
            <img 
              src={editIcon} 
              alt="edit" 
              onClick={() => avatarInputRef.current?.click()}
              className="absolute bottom-[5px] -right-[50px] w-[25px] h-[25px] cursor-pointer hover:scale-110 transition" 
            />
          </div>
        </div>

        <div className="flex flex-col gap-[15px]">
          <h2 className="text-[1.5rem] font-semibold">Details</h2>
          
          <div className="relative w-full lg:w-[400px]">
            <label className="text-gray-400 text-sm mb-1 block">Description</label>
            <div className="relative">
                <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write something about yourself..."
                className="w-full h-[150px] border border-[#d7dde3] rounded-lg p-3 outline-none focus:border-orange-500 transition resize-none"
                ></textarea>
                
                <img 
                src={editIcon} 
                alt="edit" 
                className="absolute bottom-[10px] -right-[35px] w-[25px] h-[25px]" 
                />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[15px]">
          <h2 className="text-[2.25rem] font-extrabold">My works</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {portfolioItems?.map((item) => (
                  <div key={item.id} className="relative group aspect-square">
                      <img
                          src={item.imageUrl}
                          alt="work"
                          className="w-full h-full object-cover rounded-xl border border-gray-200"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-xl gap-2">
                          <button type="button" className="text-white hover:text-gray-200">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              </svg>
                          </button>
                          <button
                              type="button"
                              onClick={() => handleDeleteWork(item.id)}
                              className="text-white hover:text-red-400"
                          >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                              </svg>
                          </button>
                      </div>
                  </div>
              ))}

              {isAddingWork && (
                  <div className="aspect-square rounded-xl border border-gray-200 bg-gray-50 flex flex-col items-center justify-center p-4">
                      <span className="text-gray-500 mb-2">Uploading</span>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 animate-pulse w-2/3"></div>
                      </div>
                  </div>
              )}

              <div
                  onClick={() => !isBusy && portfolioInputRef.current?.click()}
                  className={`aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition ${isBusy ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                  <input
                      type="file"
                      ref={portfolioInputRef}
                      onChange={handleAddWork}
                      className="hidden"
                      accept="image/*"
                      disabled={isBusy}
                  />
                  <span className="text-3xl text-gray-400 mb-1">+</span>
                  <span className="text-gray-500">Upload</span>
              </div>
         </div>

          {(!portfolioItems || portfolioItems.length === 0) && !isPortfolioLoading && !isAddingWork && (
              <p className="text-gray-400 italic mt-2">No works added yet.</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-[17px] mt-10">
          <button 
            type="submit"
            disabled={isBusy}
            className="w-[220px] h-[55px] bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition text-lg uppercase disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          
          <button 
            type="button"
            onClick={() => navigate('/admin-panel')}
            className="w-[220px] h-[55px] bg-[#191A19] text-white font-bold rounded-lg hover:bg-black transition text-lg uppercase border border-[#191A19]"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};