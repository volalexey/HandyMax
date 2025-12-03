import master from "../../assets/img/master.png";
import editIcon from "../../assets/img/edit.svg";
import { AddPhotos } from "../../components/adminPanel/AddPhotos";

export const AboutMasterAdminPage = () => {
  return (
    <div className="bg-white w-full min-h-[80vh] flex flex-col gap-[20px]
                    rounded-[20px] p-[20px] 
                    lg:rounded-[80px] lg:p-[40px_60px]">
      
      <h1 className="text-[2.25rem] font-extrabold mb-[25px]">
        Montaggio mobili
      </h1>

      <form className="flex flex-col gap-[50px]">
        
        <div className="flex flex-col gap-[15px]">
          <h2 className="text-[1.5rem] font-semibold">Photo</h2>
          
          <div className="relative w-fit">
            <img 
              src={master} 
              alt="Master" 
              className="w-[200px] h-[200px] object-cover border-[1.73px] border-[#ADB5BD] p-[15px] rounded-sm"
            />
            <img 
              src={editIcon} 
              alt="edit" 
              className="absolute bottom-[5px] -right-[50px] w-[25px] h-[25px] cursor-pointer hover:scale-110 transition" 
            />
          </div>
        </div>

        <div className="flex flex-col gap-[15px]">
          <h2 className="text-[1.5rem] font-semibold">Description</h2>
          
          <div className="relative w-fit">
            <textarea 
              placeholder="Description"
              className="w-full lg:w-[300px] h-[110px] border border-[#d7dde3] rounded-lg p-3 outline-none focus:border-orange-500 transition resize-none"
            ></textarea>
            
            <img 
              src={editIcon} 
              alt="edit" 
              className="absolute bottom-[5px] -right-[50px] w-[25px] h-[25px] cursor-pointer hover:scale-110 transition" 
            />
          </div>
        </div>

        <div className="flex flex-col gap-[15px]">
          <h2 className="text-[2.25rem] font-extrabold">My works</h2>
          <AddPhotos />
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-[17px] mt-10">
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