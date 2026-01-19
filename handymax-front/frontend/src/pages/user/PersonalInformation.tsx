import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { setCredentials } from "../../store/slices/authSlice";
import { useUpdateProfileMutation, useGetMeQuery } from "../../store/api/authApi"; 

import arrowGrey from "../../assets/img/arrowGrey.svg";

type UserLayoutContextType = {
  isFullScreenNavOpen: boolean;
  setIsFullScreenNavOpen: (value: boolean) => void;
};

export const PersonalInformation = () => {
  const { setIsFullScreenNavOpen } = useOutletContext<UserLayoutContextType>();
  const dispatch = useDispatch();

  const { user: reduxUser, token } = useSelector((state: RootState) => state.auth);
  
  const { data: fullUserData, isSuccess } = useGetMeQuery(); 

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    address: ""
  });

  useEffect(() => {
    const actualUser = fullUserData || reduxUser;

    if (actualUser) {
      if (fullUserData && token) {
        dispatch(setCredentials({ user: fullUserData, token }));
      }

      setFormData({
        name: actualUser.name || "",
        phone: actualUser.phone || "",
        email: actualUser.email || "",
        city: actualUser.city || "", 
        address: actualUser.address || ""
      });
    }
  }, [fullUserData, reduxUser, token, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { email, ...updateData } = formData;
      
      const updatedUser = await updateProfile(updateData).unwrap();
      
      if (token) {
        dispatch(setCredentials({ user: updatedUser, token }));
      }
      
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  const inputClasses = `
    w-full h-[50px] lg:h-[60px] px-4 
    bg-transparent border border-gray-300 rounded-lg 
    text-lg outline-none focus:border-black transition-colors 
    placeholder-gray-400
  `;

  return (
    <div className="bg-white w-full min-h-[70vh] rounded-[20px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.15)] 
                    p-6 lg:p-[60px] lg:px-[100px] flex flex-col gap-[30px]">
      
      <button
        onClick={() => setIsFullScreenNavOpen(true)}
        className="lg:hidden flex items-center gap-2 text-gray-500 font-medium hover:text-black transition mb-2"
      >
        <img src={arrowGrey} alt="back" className="w-4 h-4 rotate-90" />
        Indietro
      </button>

      <h2 className="text-[2rem] lg:text-[2.5rem] font-bold uppercase leading-none">
        Informazioni personali
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full lg:w-[60%]">
        
        <input 
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={inputClasses} 
          placeholder="Name" 
          type="text" 
        />
        
        <input 
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={inputClasses} 
          placeholder="Numero di telefono" 
          type="tel" 
        />
        
        <input 
          name="email"
          value={formData.email}
          disabled 
          className={`${inputClasses} bg-gray-100 cursor-not-allowed text-gray-500`} 
          placeholder="Posta" 
          type="email" 
        />
        
        <input 
          name="city"
          value={formData.city}
          onChange={handleChange}
          className={inputClasses} 
          placeholder="Città" 
          type="text" 
        />
        
        <input 
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={inputClasses} 
          placeholder="Indirizzo" 
          type="text" 
        />

        <button 
          type="submit"
          disabled={isLoading}
          className="mt-4 w-full h-[65px] bg-[#191A19] text-white font-bold text-xl rounded-lg hover:bg-black transition shadow-md disabled:opacity-70"
        >
          {isLoading ? "Saving..." : "Modificare"}
        </button>

      </form>
    </div>
  );
};