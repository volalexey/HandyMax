import master from '../../assets/img/master.png';
import listLogo1 from '../../assets/img/listLogo1.png';
import listLogo2 from '../../assets/img/listLogo2.png';
import listLogo3 from '../../assets/img/listLogo3.png';
import listLogo4 from '../../assets/img/listLogo4.png';

interface DescriptionProps {
  title: string;
  background: 'black' | 'white';
}

export const Description = ({ title, background }: DescriptionProps) => {
  const themeClasses = background === 'black' 
    ? 'bg-[#191A19] text-white' 
    : 'bg-transparent text-[#191A19]';

  return (
    <section className={`py-12 lg:py-20 ${themeClasses}`}>
      <div className="container mx-auto px-4">
        
        <h2 className="text-center text-[2.25rem] lg:text-[3rem] font-bold uppercase mb-8 lg:mb-12 leading-tight">
          {title}
        </h2>

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-12">
          
          <div className="w-full lg:w-5/12">
            <img 
              src={master} 
              alt="Master Maxim" 
              className="rounded-lg w-full h-auto object-cover shadow-lg"
            />
          </div>

          <div className="w-full lg:w-7/12 flex flex-col">
            <h3 className="text-orange-500 text-2xl font-bold uppercase mb-4">
              Benvenuto!
            </h3>

            <p className="text-lg lg:text-xl mb-10 leading-relaxed opacity-90">
              Mi chiamo Maxim, sono il tuo tuttofare affidabile ad Avellino e quartieri.
              Dalle piccole riparazioni e montaggio di mobili agli
              elettrodomestici e all'impianto idraulico, mi occupo
              di tutto ciò che riguarda la tua casa, così che tu
              possa avere il tempo che serve.
            </p>

            <ul className="flex flex-col gap-5 mb-10">
              {[
                { img: listLogo1, text: "Puntualità e scadenze oneste" },
                { img: listLogo2, text: "Prezzi Trasparenti senza pagamenti nascosti" },
                { img: listLogo3, text: "Lavoro di qualità con attenzione ai dettagli" },
                { img: listLogo4, text: "Approccio umano - come se lo facessi per me stesso" },
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-4 uppercase font-medium text-sm lg:text-base">
                  <img src={item.img} alt="icon" className="w-8 h-8 object-contain flex-shrink-0" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>

            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded transition-colors w-full lg:w-[190px] text-xl">
              Ordina ora
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};