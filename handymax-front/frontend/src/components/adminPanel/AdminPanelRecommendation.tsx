import { NavLink } from "react-router-dom";

interface AdminPanelRecommendationProps {
  title: string;
  img: string;
  id: string;
  onDelete: (id: string) => void;
}

export const AdminPanelRecommendation = ({ title, img, id, onDelete }: AdminPanelRecommendationProps) => {
  return (
    <div className="flex flex-col gap-3 items-center w-full max-w-[230px]">
      
      <h2 className="text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">
        {title}
      </h2>

      <div className="border-[2.14px] border-[#ADB5BD] p-[15px_20px] mb-[15px] w-full">
        <img src={img} alt="recommendation" className="w-full h-auto object-contain aspect-square" />
      </div>

      <div className="flex flex-col gap-3 w-full">
        
        <NavLink 
          to={`/admin-panel/edit-recommendation/${id}`}
          className="w-full h-[55px] bg-orange-500 text-white rounded-xl font-medium flex items-center justify-center hover:bg-orange-600 transition"
        >
          View article
        </NavLink>
        
        <button 
          onClick={() => onDelete(id)}
          className="w-full h-[55px] bg-[#191A19] text-white rounded-xl font-medium hover:bg-black transition"
        >
          Remove
        </button>

      </div>

    </div>
  );
};