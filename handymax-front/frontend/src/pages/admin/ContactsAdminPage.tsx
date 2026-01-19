import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";
import { setCredentials } from "../../store/slices/authSlice";
import { useUpdateProfileMutation } from "../../store/api/authApi";

import editIcon from "../../assets/img/edit.svg";

export const ContactsAdminPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [formData, setFormData] = useState({
    phone: "",
    contactEmail: "",
    workingHours: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        phone: user.phone || "",
        contactEmail: user.contactEmail || "", 
        workingHours: user.workingHours || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedUser = await updateProfile(formData).unwrap();
      if (token) {
        dispatch(setCredentials({ user: updatedUser, token }));
      }
      alert("Contacts updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update contacts");
    }
  };

  const inputClasses = "w-full lg:w-[300px] h-[40px] border border-[#d7dde3] rounded-lg px-3 outline-none focus:border-orange-500 transition text-base placeholder-gray-400";

  return (
    <div className="bg-white w-full min-h-[80vh] flex flex-col gap-[20px] rounded-[20px] p-[20px] lg:rounded-[80px] lg:p-[40px_60px]">
      
      <h1 className="text-[2.25rem] font-extrabold mb-[25px]">
        Contacts
      </h1>
      
      <p className="text-gray-400 text-sm mb-4">
        This information will be visible to all site visitors.
      </p>

      <form onSubmit={handleSave} className="flex flex-col gap-[20px]">
        
        <div className="flex flex-col gap-[15px]">
          <label htmlFor="phone" className="text-lg font-medium">Public Phone:</label>
          <div className="relative w-fit">
            <input 
              id="phone" 
              type="text" 
              value={formData.phone}
              onChange={handleChange}
              placeholder="+39..." 
              className={inputClasses} 
            />
            <img src={editIcon} alt="edit" className="absolute top-1/2 -translate-y-1/2 -right-[50px] w-[25px] h-[25px] cursor-pointer hover:scale-110 transition" />
          </div>
        </div>

        <div className="flex flex-col gap-[15px]">
          <label htmlFor="contactEmail" className="text-lg font-medium">Public Email:</label>
          <div className="relative w-fit">
            <input 
              id="contactEmail"
              type="email" 
              value={formData.contactEmail}
              onChange={handleChange}
              placeholder="contact@handymax.com" 
              className={inputClasses} 
            />
            <img src={editIcon} alt="edit" className="absolute top-1/2 -translate-y-1/2 -right-[50px] w-[25px] h-[25px] cursor-pointer hover:scale-110 transition" />
          </div>
        </div>

        <div className="flex flex-col gap-[15px]">
          <label htmlFor="workingHours" className="text-lg font-medium">Working hours:</label>
          <div className="relative w-fit">
            <input 
              id="workingHours" 
              type="text" 
              value={formData.workingHours}
              onChange={handleChange}
              placeholder="Mon - Fri: 09:00 - 18:00" 
              className={inputClasses} 
            />
            <img src={editIcon} alt="edit" className="absolute top-1/2 -translate-y-1/2 -right-[50px] w-[25px] h-[25px] cursor-pointer hover:scale-110 transition" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-[17px] mt-[40px]">
          <button 
            type="submit"
            disabled={isLoading}
            className="w-[220px] h-[55px] bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition text-lg uppercase disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save"}
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