import { HashLink } from 'react-router-hash-link';
import bigLogo from '../../assets/img/bigLogo.svg';

export const Form = () => {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Пока что это просто заглушка. Скоро подключим API!");
  };

  return (
    <section className="py-20 lg:py-32 mb-20">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 lg:gap-20">
          
          <div className="flex flex-col gap-10 w-full lg:w-auto order-2 lg:order-1 items-center lg:items-start">
            
            <img src={bigLogo} alt="HandyMax" className="w-full max-w-[320px]" />

            <nav className="flex flex-col gap-5 text-2xl text-[#191A19] font-medium items-center lg:items-start">
              <HashLink smooth to="/#top" className="hover:text-orange-500 transition-colors">Casa</HashLink>
              <HashLink smooth to="/#about" className="hover:text-orange-500 transition-colors">Maestro</HashLink>
              <HashLink smooth to="/#services" className="hover:text-orange-500 transition-colors">Servizi</HashLink>
              <HashLink smooth to="/#reviews" className="hover:text-orange-500 transition-colors">Recensioni</HashLink>
              <HashLink smooth to="/#contacts" className="hover:text-orange-500 transition-colors">Contatti</HashLink>
            </nav>
          </div>

          <form 
            onSubmit={handleSubmit}
            className="bg-orange-500 rounded-xl p-6 lg:p-12 lg:px-24 w-full lg:w-1/2 max-w-[700px] flex flex-col gap-4 order-1 lg:order-2 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-4">
              Hai una domanda?
            </h2>

            <input 
              type="text" 
              placeholder="Name" 
              className="w-full h-20 px-6 rounded text-lg outline-none focus:ring-4 focus:ring-[#191A19]/20 transition"
            />
            
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full h-20 px-6 rounded text-lg outline-none focus:ring-4 focus:ring-[#191A19]/20 transition"
            />
            
            <input 
              type="tel" 
              placeholder="Phone" 
              className="w-full h-20 px-6 rounded text-lg outline-none focus:ring-4 focus:ring-[#191A19]/20 transition"
            />
            
            <textarea 
              placeholder="Commento" 
              rows={4}
              className="w-full p-6 rounded text-lg outline-none focus:ring-4 focus:ring-[#191A19]/20 transition resize-none h-[150px]"
            ></textarea>

            <button className="w-full h-20 bg-[#191A19] text-white text-xl font-bold rounded hover:bg-black transition-colors mt-4">
              Submit
            </button>

          </form>

        </div>
      </div>
    </section>
  );
};