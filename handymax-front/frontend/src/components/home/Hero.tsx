import heroBg from '../../assets/img/hero.png';

interface HeroProps {
  onOpen: () => void;
}

export const Hero = ({ onOpen }: HeroProps) => {
  return (
    <section 
      className="w-full h-[90vh] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="container mx-auto px-4 h-full relative z-10">
        <div className="flex flex-col h-full pt-[100px] lg:pt-[8%] max-w-full lg:max-w-[65%]">
          
          <h1 className="text-white font-extrabold uppercase mb-4 
            text-[2.5rem] leading-[3rem]
            lg:text-[4.5rem] lg:leading-[5rem]"
          >
            Un artigiano affidabile, quando ne hai bisogno
          </h1>

          <h2 className="text-white font-normal uppercase mb-10
            text-[1.5rem]
            lg:text-[2rem]"
          >
            Veloce, di alta qualità, con garanzia
          </h2>

          <button 
            onClick={onOpen}
            className="bg-orange-500 text-white font-bold rounded transition-colors hover:bg-orange-600
              w-full h-[70px] text-2xl
              lg:w-[190px]"
          >
            Ordina ora
          </button>

        </div>
      </div>
    </section>
  );
};