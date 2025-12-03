import { Breadcrumbs } from "../components/Breadcrumbs";

import { Sort } from "../components/services/Sort";
import { CalculateCost } from "../components/services/CalculateCost";
import { Products } from "../components/services/Products";

export const ServicesPage = () => {
  return (
    <div className="relative min-h-screen">
      
      <Breadcrumbs name="Servizi" />

      <div className="container mx-auto px-4 pt-4 pb-20 flex flex-col gap-4">
        <h1 className="text-center text-[3rem] font-bold uppercase">
          Servizi
        </h1>
        <Sort />

        <Products />

      </div>
    </div>
  );
};