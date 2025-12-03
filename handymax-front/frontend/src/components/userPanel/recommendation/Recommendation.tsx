import { NavLink } from "react-router-dom";

interface RecommendationProps {
  name: string;
  img: string;
}

export const Recommendation = ({ name, img }: RecommendationProps) => {
  return (
    <div className="flex flex-col gap-5">

      <p className="text-2xl font-bold text-black">
        {name}
      </p>

      <img 
        className="object-contain w-full h-auto rounded-lg" 
        src={img} 
        alt="image" 
      />

      <NavLink 
        to="/user-panel/recommendation-details"
        className="flex items-center justify-center w-full h-[35px] bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
      >
        Revisione
      </NavLink>

    </div>
  );
};