import { NavLink, useParams } from "react-router-dom";
import { useGetRecommendationByIdQuery, useGetRecommendationsQuery } from "../../store/api/recommendationsApi";
import { Recommendation } from "../../components/userPanel/recommendation/Recommendation";

import arrowGrey from "../../assets/img/arrowGrey.svg";
import defaultImg from "../../assets/img/recommendation2.png";
import defaultThumb from "../../assets/img/recommendation1.png";

export const RecommendationDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: recommendation, isLoading } = useGetRecommendationByIdQuery(id || "");
  
  const { data: allRecommendations } = useGetRecommendationsQuery();

  const popularArticles = allRecommendations?.filter(a => a.id !== Number(id)).slice(0, 5);

  if (isLoading) return <div className="p-10">Caricamento...</div>;
  if (!recommendation) return <div className="p-10">Articolo non trovato</div>;

  return (
    <div className="bg-white w-full min-h-[70vh] rounded-[20px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.15)] 
                    p-[60px_30px_60px_100px] lg:p-[60px_40px] xl:p-[60px_60px]
                    flex flex-col gap-[30px] relative">
      
      <div className="flex flex-col gap-3">
        <h3 className="text-sm lg:text-base uppercase tracking-widest font-bold text-gray-800">
          Raccomandazioni / <span className="text-black font-normal tracking-normal">{recommendation.title}</span>
        </h3>

        <NavLink 
          to="/user-panel/recommendations" 
          className="flex items-center gap-2 text-gray-500 font-medium hover:text-black transition absolute top-0 left-0 p-5 lg:static lg:p-0"
        >
          <img src={arrowGrey} alt="back" className="w-4 h-4 rotate-90" />
          Indietro
        </NavLink>
      </div>

      <div className="flex flex-col gap-5">
        
        <h2 className="text-[2rem] lg:text-[2.5rem] font-bold leading-tight mb-4">
          {recommendation.title}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-10 xl:gap-16 items-start">
          
          <div className="flex flex-col gap-8 w-full">
            <img 
              src={recommendation.imageUrl || defaultImg} 
              alt={recommendation.title} 
              className="w-full h-auto max-h-[500px] object-cover rounded-xl" 
            />
            
            <div className="flex flex-col gap-6 text-sm lg:text-base uppercase text-gray-500 leading-relaxed text-justify whitespace-pre-wrap">
              {recommendation.content}
            </div>
          </div>

          <div className="w-full rounded-[20px] p-5 flex flex-col gap-5 
                          bg-white shadow-[0px_0px_15px_0px_rgba(0,0,0,0.1)] 
                          lg:max-h-[700px] lg:overflow-y-auto custom-scrollbar">
            
            <p className="text-sm font-bold uppercase text-center lg:text-left sticky top-0 bg-white pb-2 z-10">
              Articoli popolari
            </p>

            <div className="flex flex-col gap-6">
               {popularArticles?.map((item) => (
                 <div key={item.id} className="w-full border-b border-gray-100 pb-4 last:border-0">
                   <NavLink to={`/user-panel/recommendations/${item.id}`}>
                     <Recommendation 
                       name={item.title} 
                       img={item.imageUrl || defaultThumb} 
                     />
                   </NavLink>
                 </div>
               ))}
               
               {popularArticles?.length === 0 && (
                   <p className="text-xs text-gray-400 text-center">Nient'altro da leggere</p>
               )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};