import { NavLink } from "react-router-dom";
import { AddPhoto } from "../../components/adminPanel/AddPhoto";

import homeBlue from "../../assets/img/homeBlue.svg";
import arrowGreyBold from "../../assets/img/arrowGreyBold.svg";
import arrowBlackBold from "../../assets/img/arrowBlackBold.svg";

export const EditRecommendationPage = () => {
  
  const labelClass = "font-sans text-base font-normal";
  const inputClass = "w-full lg:w-[300px] h-[30px] border border-[#d7dde3] rounded-lg p-2 text-base outline-none focus:border-orange-500 transition";
  const textareaClass = "w-full lg:w-[350px] h-[160px] border border-[#d7dde3] rounded-lg p-3 text-base outline-none focus:border-orange-500 transition resize-none";

  return (
    <div className="bg-white w-full min-h-[80vh] flex flex-col gap-[20px]
                    rounded-[20px] p-[20px] 
                    lg:rounded-[80px] lg:p-[40px_60px]">
      
      <div className="flex items-center gap-[20px] font-sans text-sm lg:text-base relative">
        <NavLink to="/admin/recommendations" className="text-[#0D6EFD] pl-[15px] relative flex items-center">
          <img src={homeBlue} alt="home" className="absolute top-[3px] left-[-5px] w-4 h-4" />
          Recommendations
        </NavLink>
        
        <p className="text-[#6C757D] pl-[10px] relative flex items-center">
          <span className="absolute left-[-10px] top-[5px] w-[10px] h-[10px] bg-no-repeat bg-contain" 
                style={{ backgroundImage: `url(${arrowGreyBold})` }}></span>
          Add a recommendation
        </p>
      </div>

      <NavLink to="/admin/recommendations" className="font-bold text-black pl-[15px] relative w-fit flex items-center mt-2">
        <span className="absolute left-[-3px] top-[6px] w-[10px] h-[10px] bg-no-repeat bg-contain"
              style={{ backgroundImage: `url(${arrowBlackBold})` }}></span>
        Back
      </NavLink>

      <h1 className="text-[2.25rem] font-extrabold mb-[25px]">
        New recommendation
      </h1>

      <form className="flex flex-col gap-[50px]">
        
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="title" className={labelClass}>About the article</label>
          <div className="relative w-fit">
            <input id="title" type="text" placeholder="Article title" className={inputClass} />
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <p className={labelClass}>Add video or photo</p>
          <AddPhoto />
        </div>

        <div className="flex flex-col gap-[10px]">
          <label htmlFor="description" className={labelClass}>Add description</label>
          <div className="relative w-fit">
            <textarea id="description" placeholder="Enter" className={textareaClass} />
          </div>
        </div>

        <div className="flex gap-[17px] mt-4">
          <button className="w-[220px] h-[55px] bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition">
            Save and publish
          </button>
          <button className="w-[220px] h-[55px] bg-[#191A19] text-white font-medium rounded-xl hover:bg-black transition">
            Cancel
          </button>
        </div>

      </form>

    </div>
  );
};