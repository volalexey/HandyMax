import { useOutletContext, useNavigate } from "react-router-dom";
import { Recommendation } from "../../components/userPanel/recommendation/Recommendation";
import { useGetRecommendationsQuery } from "../../store/api/recommendationsApi";

import arrowGrey from "../../assets/img/arrowGrey.svg";
import defaultImg from "../../assets/img/recommendation1.png";

type UserLayoutContextType = {
  isFullScreenNavOpen: boolean;
  setIsFullScreenNavOpen: (value: boolean) => void;
};

export const RecommendationsPage = () => {
  const { isFullScreenNavOpen, setIsFullScreenNavOpen } = useOutletContext<UserLayoutContextType>();

  const { data: recommendations, isLoading } = useGetRecommendationsQuery();
  const navigate = useNavigate();

  return (
    <div className={`
      bg-white w-full min-h-[70vh] rounded-[20px] 
      flex flex-col gap-[20px]
      
      p-[20px_10px_60px] lg:p-[60px] xl:p-[60px_100px]
      shadow-none lg:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.15)]

      ${!isFullScreenNavOpen ? 'flex' : 'hidden lg:flex'}
    `}>
      
      <button
        onClick={() => setIsFullScreenNavOpen(true)}
        className="lg:hidden flex items-center gap-2 text-gray-500 font-medium hover:text-black transition w-fit bg-transparent border-none"
      >
        <img src={arrowGrey} alt="back" className="w-6 h-6 rotate-90" />
        Indietro
      </button>

      <h2 className="text-[2.5rem] font-bold uppercase leading-none">
        Consigli e suggerimenti
      </h2>

      <div className="grid gap-[30px] mt-[25px] w-full
                      grid-cols-1        
                      sm:grid-cols-2  
                      lg:grid-cols-3 
                      xl:grid-cols-3  
      ">
        
        {isLoading && <div className="col-span-full text-center text-gray-400">Caricamento...</div>}

        {!isLoading && recommendations?.map((article) => (
          <div 
            key={article.id} 
            onClick={() => navigate(`/user-panel/recommendations/${article.id}`)}
            className="block h-full cursor-pointer hover:opacity-90 transition-opacity"
          >
            <Recommendation 
              name={article.title} 
              img={article.imageUrl || defaultImg} 
            />
          </div>
        ))}

        {!isLoading && recommendations?.length === 0 && (
           <div className="col-span-full text-center text-gray-400">Nessun articolo trovato.</div>
        )}

      </div>

    </div>
  );
};