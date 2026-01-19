import { useState } from 'react';
import { Product } from '../../components/common/product/Product'; // Проверь путь
import { Calculator } from './Calculator';
import service1 from '../../assets/img/services1.png'; 

const productsData = Array(6).fill({
  title: "Installazione di bastoni per tende, mensole, TV",
  text: "Fissaggio a parete di oggetti d'arredo tenendo conto del tipo di superficie e del peso",
  price: "50",
  img: service1,
  link: "/order"
});

export const Products = () => {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  return (
    <section className="w-full relative">
      
      {!isCalculatorOpen && (
        <div className="flex justify-center lg:justify-end mb-8">
          <button 
            onClick={() => setIsCalculatorOpen(true)}
            className="bg-[#191A19] text-white font-bold text-xl rounded-lg h-[60px] w-full max-w-[400px] hover:bg-black transition shadow-md"
          >
            Calcola il costo del servizio
          </button>
        </div>
      )}

      <div className="flex gap-8 relative items-start">
        
        <div className={`
           grid gap-x-6 gap-y-12 w-full transition-all duration-300
           
           /* Мобилка: 1 колонка, Планшет: 2 колонки */
           grid-cols-1 sm:grid-cols-2 

           /* Десктопная логика */
           ${isCalculatorOpen 
             ? 'lg:w-[calc(100%-420px)] lg:grid-cols-3 blur-sm lg:blur-0 pointer-events-none lg:pointer-events-auto' 
             : 'lg:grid-cols-4'}
        `}>
          {productsData.map((item, idx) => (
            <Product key={idx} {...item} />
          ))}
        </div>

        {isCalculatorOpen && (
          <div className="
            fixed inset-x-0 bottom-0 z-50 w-full animate-in slide-in-from-bottom duration-300
            lg:static lg:w-[400px] lg:block lg:animate-none lg:sticky lg:top-24
          ">
            <div 
              className="lg:hidden absolute inset-0 -top-[100vh] bg-black/50" 
              onClick={() => setIsCalculatorOpen(false)}
            ></div>
            
            <div className="relative z-10">
              <Calculator onClose={() => setIsCalculatorOpen(false)} />
            </div>
          </div>
        )}

      </div>
    </section>
  );
};