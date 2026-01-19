const steps = [
  { title: "Ordina un maestro", step: "Step 1" },
  { title: "Discutere il problema", step: "Step 2" },
  { title: "Flusso di lavoro", step: "Step 3" },
  { title: "Ottieni un risultato di qualità", step: "Step 4" },
];

export const StepFlow = () => {
  return (
    <section className="bg-[#191A19] text-white pt-10 pb-20 lg:pt-10 mb-20">
      <div className="container mx-auto px-4">
        
        <h2 className="text-[2.25rem] lg:text-[3rem] font-bold uppercase mb-10 text-center lg:text-left">
          Come funziona?
        </h2>

        <div className="relative flex flex-col gap-10 pl-12 ml-4 border-l-[3px] border-orange-500
                        lg:flex-row lg:gap-0 lg:pl-0 lg:ml-0 lg:border-l-0 lg:border-b-[3px] lg:pb-12 lg:justify-between">
          
          {steps.map((item, index) => (
            <div key={index} className="relative flex flex-col items-start lg:items-center gap-2 lg:w-1/4">
              
              <h3 className="text-2xl font-medium lg:text-center">
                {item.title}
              </h3>
              
              <p className="text-orange-500 text-2xl font-medium">
                {item.step}
              </p>

              <div className="w-[35px] h-[35px] bg-orange-500 rounded-full border-[8px] border-black/50
                              absolute top-2 -left-[69px]
                              lg:top-auto lg:left-1/2 lg:-translate-x-1/2 lg:-bottom-[68px]"
              ></div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};