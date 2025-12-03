export const Footer = () => {
  return (
    <footer className="bg-[#191A19] text-[#A8A8A8] py-5 lg:py-0 lg:min-h-[85px] flex items-center">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center lg:justify-start">
        
        <div className="flex flex-col lg:flex-row items-center gap-5 lg:gap-[55px] text-sm lg:text-base">
          
          <a href="#" className="underline hover:text-white transition-colors">
            політика конфіденційності
          </a>
          
          <a href="#" className="underline hover:text-white transition-colors">
            умови та положення
          </a>
          
          <p className="lg:ml-[180px]">
            Всі права захищенні.
          </p>
          
          <p>
            P.IVA 123456789
          </p>

        </div>
      </div>
    </footer>
  );
};