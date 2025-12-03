import { AdminPanelRecommendation } from "../../components/adminPanel/AdminPanelRecommendation";
import recommendationImg from "../../assets/img/recommendation3.png";
import { NavLink } from "react-router-dom";
import arrowBlackBold from "../../assets/img/arrowBlackBold.svg";

export const RecommendationsAdminPage = () => {
  return (
    <div className="bg-white w-full min-h-[80vh] flex flex-col gap-[60px]
                    rounded-[20px] p-[20px] 
                    lg:rounded-[80px] lg:p-[40px_60px]">
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        
        <NavLink 
          to="/admin-panel/services" 
          className="hidden lg:flex items-center gap-2 text-black font-bold pl-[15px] relative"
        >
          <img src={arrowBlackBold} alt="back" className="w-[10px] h-[10px] rotate-90" />
          Back
        </NavLink>

        <h1 className="text-[2.25rem] font-extrabold ml-0 lg:ml-[30px] font-sans">
          Recommendations for customers
        </h1>

        <button className="w-[220px] h-[50px] bg-[#191A19] text-white rounded-lg text-xl font-light hover:opacity-80 transition">
          Add a recommendation
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-[60px] justify-items-start items-start">
        
        {[1, 2, 3, 4, 5].map((i) => (
          <AdminPanelRecommendation 
            key={i}
            id={String(i)}
            title="Video or article title" 
            img={recommendationImg} 
          />
        ))}

      </div>

    </div>
  );
};