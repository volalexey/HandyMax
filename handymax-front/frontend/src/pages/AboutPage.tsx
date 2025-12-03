import { Breadcrumbs } from "../components/Breadcrumbs";
import { Description } from "../components/home/Description";

export const AboutPage = () => {
  return (
    <div className="relative min-h-screen"> 
      
      <Breadcrumbs name="Maestro" />

      <div className="container mx-auto px-4 pt-20">
        
        <Description title="" background="white" />
      </div>
    </div>
  );
};