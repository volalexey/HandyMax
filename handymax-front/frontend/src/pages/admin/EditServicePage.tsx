import { NavLink } from "react-router-dom";
import homeBlue from "../../assets/img/homeBlue.svg";
import arrowGreyBold from "../../assets/img/arrowGreyBold.svg";
import arrowBlackBold from "../../assets/img/arrowBlackBold.svg";
import serviceImg from "../../assets/img/services1.png";
import editIcon from "../../assets/img/edit.svg";

export const EditServicePage = () => {
  return (
    <div className="bg-white w-full min-h-[80vh] flex flex-col gap-[20px]
                    rounded-[20px] p-[20px] 
                    lg:rounded-[80px] lg:p-[40px_60px]">
      
      <div className="flex items-center gap-[20px] font-sans text-sm lg:text-base relative">
        <NavLink to="/admin/services" className="text-[#0D6EFD] pl-[15px] relative flex items-center">
          <img src={homeBlue} alt="home" className="absolute top-[3px] left-[-5px] w-4 h-4" />
          Services
        </NavLink>
        
        <p className="text-[#6C757D] pl-[10px] relative flex items-center">
          <span className="absolute left-[-10px] top-[5px] w-[10px] h-[10px] bg-no-repeat bg-contain" 
                style={{ backgroundImage: `url(${arrowGreyBold})` }}></span>
          Montaggio mobili
        </p>
      </div>

      <NavLink to="/admin/services" className="font-bold text-black pl-[15px] relative w-fit flex items-center mt-2">
        <span className="absolute left-[-3px] top-[6px] w-[10px] h-[10px] bg-no-repeat bg-contain"
              style={{ backgroundImage: `url(${arrowBlackBold})` }}></span>
        Back
      </NavLink>

      <h1 className="text-[2.25rem] font-extrabold mb-[25px]">
        Montaggio mobili
      </h1>

      <form className="flex flex-col gap-[50px]">
        
        <div className="flex flex-col gap-[15px]">
          <h2 className="text-[1.5rem] font-semibold">Photo</h2>
          <div className="relative w-fit">
            <img 
              src={serviceImg} 
              alt="service" 
              className="w-[200px] h-[200px] object-cover border-[1.73px] border-[#ADB5BD] p-[15px] rounded-sm" 
            />
            <img src={editIcon} alt="edit" className="absolute bottom-[5px] -right-[50px] w-[25px] h-[25px] cursor-pointer" />
          </div>
        </div>

        <div className="flex flex-col gap-[15px]">
          <h2 className="text-[1.5rem] font-semibold">Description</h2>
          <div className="relative w-fit">
            <textarea 
              placeholder="Description" 
              className="w-full lg:w-[300px] h-[110px] border border-[#d7dde3] rounded-lg p-3 outline-none resize-none focus:border-orange-500 transition"
            />
            <img src={editIcon} alt="edit" className="absolute bottom-[5px] -right-[50px] w-[25px] h-[25px] cursor-pointer" />
          </div>
        </div>

        <div className="flex flex-col gap-[15px]">
          <h2 className="text-[1.5rem] font-semibold">Price</h2>
          <div className="relative w-fit">
            <input 
              type="text" 
              placeholder="Price" 
              className="w-full lg:w-[300px] h-[30px] border border-[#d7dde3] rounded-lg p-2 outline-none focus:border-orange-500 transition"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-[17px] mt-4">
          <button className="w-[220px] h-[55px] bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition">
            Save
          </button>
          <button className="w-[220px] h-[55px] bg-[#191A19] text-white font-medium rounded-xl hover:bg-black transition border border-black">
            Cancel
          </button>
        </div>

      </form>

    </div>
  );
};