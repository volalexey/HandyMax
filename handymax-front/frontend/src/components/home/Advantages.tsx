import mark from '../../assets/img/mark.png';

const advantagesList = [
  "Partenza veloce",
  "Garanzia di 14 giorni",
  "Prezzo trasparente",
  "Artigiano esperto",
  "Lavoro di qualità"
];

export const Advantages = () => {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        
        <h2 className="text-center text-[2.25rem] lg:text-[3rem] font-bold uppercase mb-10">
          Vantaggi
        </h2>

        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-6 lg:gap-y-12 lg:gap-x-[7vw]">
          
          {advantagesList.map((text, index) => {
            let desktopClasses = "lg:col-span-2";

            if (index === 3) desktopClasses += " lg:col-start-2";
            
            return (
              <div 
                key={index}
                className={`
                  bg-orange-500 text-white rounded-xl
                  flex flex-col items-center justify-center gap-4 text-center
                  p-5 h-[190px] w-full max-w-[350px] mx-auto lg:max-w-none
                  text-2xl lg:text-[1.75rem]
                  ${desktopClasses}
                `}
              >
                <img src={mark} alt="check" className="w-auto h-auto" />
                <p>{text}</p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};