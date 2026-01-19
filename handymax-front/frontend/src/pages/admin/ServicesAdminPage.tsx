import { Product } from "../../components/common/product/Product";
import defaultImg from "../../assets/img/services1.png";
import { NavLink } from "react-router-dom";
import { useGetServicesQuery } from "../../store/api/servicesApi";

export const ServicesAdminPage = () => {
  
  const { data: services, isLoading, isError }  = useGetServicesQuery();

  return (
    <div className="bg-white w-full min-h-[80vh] flex flex-col gap-[60px] rounded-[20px] p-[20px] lg:rounded-[80px] lg:p-[40px_60px]">
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-[2.25rem] font-extrabold text-black lg:ml-[30px]">
          Services
        </h2>
        
        <NavLink 
          to={'/admin-panel/add-service'} 
          className="flex items-center justify-center w-[150px] h-[50px] bg-[#191A19] text-white rounded-lg text-xl font-light hover:opacity-80 transition"
        >
          Add a service
        </NavLink>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      )}

      {isError && (
        <div className="text-center text-red-500 text-xl font-bold">
          Error loading services. Please try again later.
        </div>
      )}

      {!isLoading && !isError && services?.length === 0 && (
        <div className="text-center text-gray-400 text-xl">
          No services found. Add your first one!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[30px] w-full">
        {services && services.map((service) => (
          <Product
            key={service.id}
            img={service.imageUrl || defaultImg} 
            title={service.title}
            text={service.description}
            price={String(service.price)}
            buttonText="View service"
            link={`/admin-panel/edit-service/${service.id}`}
          />
        ))}
      </div>

    </div>
  );
};