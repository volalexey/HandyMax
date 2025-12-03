export const CalculateCost = () => {
  return (
    <div className="absolute z-10
      top-[120px] left-1/2 -translate-x-1/2 w-[90vw]
      lg:top-[60px] lg:left-auto lg:translate-x-0 lg:right-[5vw] lg:w-auto"
    >
      <button 
        className="
          bg-[#191A19] text-white font-bold text-xl rounded-lg
          h-[60px] w-full
          lg:w-[25vw] 
          hover:bg-black transition-colors shadow-md"
      >
        Calcola il costo
      </button>
    </div>
  );
};