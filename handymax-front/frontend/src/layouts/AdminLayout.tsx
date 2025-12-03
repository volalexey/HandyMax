import { Outlet } from "react-router-dom";
import { SideNavigation } from "../components/adminPanel/SideNavigation";

export const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#191A19] text-white relative
                    grid grid-cols-1 lg:grid-cols-[200px_minmax(0,1fr)] 
                    gap-5 lg:gap-10 
                    p-2 py-8 lg:p-8">
      
      <SideNavigation />

      <div className="w-full text-black">
        <Outlet />
      </div>

    </div>
  );
};