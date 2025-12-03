export const NewPasswordPage = () => {
  return (
    <div className="flex flex-col w-full
                    lg:items-center lg:justify-center lg:h-[90vh]
                    mx-auto mt-[70px] max-w-[90vw] lg:mt-0 lg:max-w-full">
      
      <div className="flex flex-col items-center gap-5 w-full h-[80vh] lg:h-auto">
        
        <div className="flex flex-col items-center text-center gap-2">
          <h1 className="text-[2.2rem] lg:text-[4rem] font-normal leading-tight text-black">
            Recover password
          </h1>
          <p className="text-[1rem] lg:text-[1.5rem] font-light max-w-[650px] text-black">
            Enter new password
          </p>
        </div>

        <form className="flex flex-col items-center gap-5 w-full h-full lg:h-auto">
          
          <input 
            type="password" 
            placeholder="New password" 
            className="h-[50px] w-full lg:w-[500px] border border-gray-300 rounded px-4 text-lg outline-none focus:border-black transition-colors"
          />
          
          <input 
            type="password" 
            placeholder="Repeat password" 
            className="h-[50px] w-full lg:w-[500px] border border-gray-300 rounded px-4 text-lg outline-none focus:border-black transition-colors"
          />

          <button 
            className="bg-[#FFCD39] text-black rounded-[6px] text-base font-medium
                       h-[40px] flex items-center justify-center hover:opacity-80 transition-opacity
                       w-full mt-auto lg:mt-0 lg:w-[85px]"
          >
            Confirm
          </button>

        </form>
      </div>
    </div>
  );
};