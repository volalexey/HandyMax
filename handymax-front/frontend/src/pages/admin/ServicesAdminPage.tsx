import { Product } from "../../components/common/product/Product";
import service1 from "../../assets/img/services1.png";

export const ServicesAdminPage = () => {
  const services = [
    {
      title: "Montaggio mobili",
      text: "Assemblaggio di armadi, tavoli, letti, scaffali e altri mobili secondo le istruzioni o su misura.",
      price: "50"
    },
    {
      title: "Installazione di bastoni per tende, mensole, TV",
      text: "Fissaggio a parete di oggetti d'arredo tenendo conto del tipo di superficie e del peso",
      price: "50"
    },
    {
      title: "Riparazione idraulica",
      text: "Riparazione di tubi, rubinetti e installazione di nuovi sanitari",
      price: "50"
    },
    {
      title: "Lavori elettrici",
      text: "Sostituzione di prese, interruttori e installazione di lampadari",
      price: "50"
    },
    {
      title: "Tuttofare",
      text: "Piccoli lavori domestici e riparazioni generali",
      price: "50"
    }
  ];

  return (
    <div className="bg-white w-full min-h-[80vh] flex flex-col gap-[60px]
                    rounded-[20px] p-[20px] 
                    lg:rounded-[80px] lg:p-[40px_60px]">
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-[2.25rem] font-extrabold text-black lg:ml-[30px]">
          Services
        </h2>
        
        <button className="w-[150px] h-[50px] bg-[#191A19] text-white rounded-lg text-xl font-light hover:opacity-80 transition">
          Add a service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[50px] justify-items-center items-start">
        {services.map((s, index) => (
          <Product
            key={index}
            img={service1}
            title={s.title}
            text={s.text}
            price={s.price}
            buttonText="View service"
            link={`/admin-panel/edit-service/${index}`}
          />
        ))}
      </div>

    </div>
  );
};