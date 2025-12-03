import editIcon from "../../assets/img/edit.svg";

export const ContactsAdminPage = () => {
  
  const inputClasses = "w-full lg:w-[300px] h-[40px] border border-[#d7dde3] rounded-lg px-3 outline-none focus:border-orange-500 transition text-base placeholder-gray-400";

  return (
    <div className="bg-white w-full min-h-[80vh] flex flex-col gap-[20px]
                    rounded-[20px] p-[20px] 
                    lg:rounded-[80px] lg:p-[40px_60px]">
      
      <h1 className="text-[2.25rem] font-extrabold mb-[25px]">
        Contacts
      </h1>

      <form className="flex flex-col gap-[20px]">
        
        <div className="flex flex-col gap-[15px]">
          <label htmlFor="phone" className="text-lg font-medium">Phone:</label>
          <div className="relative w-fit">
            <input id="phone" type="text" placeholder="Enter" className={inputClasses} />
            <img 
              src={editIcon} 
              alt="edit" 
              className="absolute top-1/2 -translate-y-1/2 -right-[50px] w-[25px] h-[25px] cursor-pointer hover:scale-110 transition" 
            />
          </div>
        </div>

        <div className="flex flex-col gap-[15px]">
          <label htmlFor="email" className="text-lg font-medium">Email:</label>
          <div className="relative w-fit">
            <input id="email" type="text" placeholder="Enter" className={inputClasses} />
            <img 
              src={editIcon} 
              alt="edit" 
              className="absolute top-1/2 -translate-y-1/2 -right-[50px] w-[25px] h-[25px] cursor-pointer hover:scale-110 transition" 
            />
          </div>
        </div>

        <div className="flex flex-col gap-[15px]">
          <label htmlFor="hours" className="text-lg font-medium">Working hours:</label>
          <div className="relative w-fit">
            <input id="hours" type="text" placeholder="Enter" className={inputClasses} />
            <img 
              src={editIcon} 
              alt="edit" 
              className="absolute top-1/2 -translate-y-1/2 -right-[50px] w-[25px] h-[25px] cursor-pointer hover:scale-110 transition" 
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-[17px] mt-[40px]">
          <button className="w-[220px] h-[55px] bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition text-lg uppercase">
            Save
          </button>
          
          <button className="w-[220px] h-[55px] bg-[#191A19] text-white font-bold rounded-lg hover:bg-black hover:text-white transition text-lg uppercase border border-[#191A19]">
            Cancel
          </button>
        </div>

      </form>

    </div>
  );
};