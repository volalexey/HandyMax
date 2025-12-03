import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { NavigationPanel } from "../components/userPanel/NavigationPanel";

export type UserLayoutContextType = {
  isFullScreenNavOpen: boolean;
  setIsFullScreenNavOpen: (v: boolean) => void;
};

export const UserLayout = () => {
  const [isFullScreenNavOpen, setIsFullScreenNavOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col">
      
      <Header />

      <div className="container mx-auto px-4 
                      grid grid-cols-1 lg:grid-cols-[1.25fr_3fr] 
                      gap-10 lg:gap-[40px] 
                      my-[30px] lg:my-[90px] lg:mb-[120px]">
        
        <NavigationPanel
          isFullScreenNavOpen={isFullScreenNavOpen}
          setIsFullScreenNavOpen={setIsFullScreenNavOpen}
        />

        <div className="w-full">
          <Outlet context={{ isFullScreenNavOpen, setIsFullScreenNavOpen }} />
        </div>

      </div>

      <div className="hidden lg:block mt-auto">
        <Footer />
      </div>
      
    </div>
  );
};