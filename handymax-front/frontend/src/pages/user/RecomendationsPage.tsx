import { useOutletContext } from "react-router-dom";
import { Recommendation } from "../../components/userPanel/recommendation/Recommendation";
import recommendationImg from "../../assets/img/recommendation1.png";
import arrowGrey from "../../assets/img/arrowGrey.svg";

type UserLayoutContextType = {
  isFullScreenNavOpen: boolean;
  setIsFullScreenNavOpen: (value: boolean) => void;
};

export const RecommendationsPage = () => {
  const { isFullScreenNavOpen, setIsFullScreenNavOpen } = useOutletContext<UserLayoutContextType>();

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

      <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[50px] mt-[25px] justify-center">
        
        <Recommendation 
          name="Titolo del video o dell'articolo" 
          img={recommendationImg} 
        />
        <Recommendation 
          name="Titolo del video o dell'articolo" 
          img={recommendationImg} 
        />
        <Recommendation 
          name="Titolo del video o dell'articolo" 
          img={recommendationImg} 
        />
        <Recommendation 
          name="Titolo del video o dell'articolo" 
          img={recommendationImg} 
        />

      </div>

    </div>
  );
};