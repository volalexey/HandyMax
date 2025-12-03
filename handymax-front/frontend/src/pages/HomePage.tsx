import { useState } from "react";

import { Hero } from "../components/home/Hero"
import { Description } from "../components/home/Description";
import { StepFlow } from "../components/home/StepFlow";
import { Advantages } from "../components/home/Advantages";
import { Contacts } from "../components/home/Contacts";
import { Form } from "../components/home/Form";
import { ApplicationModal } from "../components/modals/ApplicationModal";

export const HomePage = () => {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  const handleOpenModal = () => setIsApplicationModalOpen(true);

  return (
    <>
      <div className={`transition-all duration-300 ${isApplicationModalOpen ? 'blur-sm pointer-events-none select-none' : ''}`}>
        
        <Hero onOpen={handleOpenModal} />
        
        <Description title="A proposito del maestro" background="black" />

        <StepFlow />
        
        <Advantages />
        
        <Contacts />
        
        <Form />
        
      </div>

      {isApplicationModalOpen && (
        <ApplicationModal onClose={() => setIsApplicationModalOpen(false)} />
      )}
    </>
  );
};