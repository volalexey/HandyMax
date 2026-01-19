import { useOutletContext, NavLink, useNavigate } from "react-router-dom";
import { Order } from "../../components/userPanel/order/Order";
import { useGetMyOrdersQuery } from "../../store/api/ordersApi";

import arrowGrey from "../../assets/img/arrowGrey.svg";
import defaultImg from "../../assets/img/services1.png";

type UserLayoutContextType = {
  isFullScreenNavOpen: boolean;
  setIsFullScreenNavOpen: (value: boolean) => void;
};

export const OrdersPage = () => {
  const { isFullScreenNavOpen, setIsFullScreenNavOpen } = useOutletContext<UserLayoutContextType>();

  const { data: orders, isLoading, isError } = useGetMyOrdersQuery();
  const navigate = useNavigate();

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PENDING': return 'In attesa';
      case 'IN_PROGRESS': return 'In corso';
      case 'COMPLETED': return 'Fatto';
      case 'CANCELLED': return 'Annullato';
      default: return status;
    }
  };

  return (
    <div className={`
      bg-white w-full min-h-[70vh] rounded-[20px] 
      flex flex-col gap-[40px]
      
      /* Desktop shadows/padding */
      shadow-[0px_0px_20px_0px_rgba(0,0,0,0.15)] 
      p-[20px_10px_60px] lg:p-[60px_40px] xl:p-[60px_100px]

      /* Mobile logic: hide content if menu is open */
      ${!isFullScreenNavOpen ? 'flex' : 'hidden lg:flex'}
    `}>
      
      <button
        onClick={() => setIsFullScreenNavOpen(true)}
        className="lg:hidden flex items-center gap-2 text-gray-500 font-medium hover:text-black transition w-fit"
      >
        <img src={arrowGrey} alt="back" className="w-6 h-6 rotate-90" />
        Indietro
      </button>

      <h2 className="text-[2.5rem] font-bold uppercase lg:text-left text-center">
        Ordini
      </h2>

      <div className="flex flex-col gap-[40px]">
        
        {isLoading && <div className="text-center text-gray-500">Caricamento ordini...</div>}
        
        {!isLoading && (!orders || orders.length === 0) && (
             <div className="text-center text-gray-500 py-10">
                 Non hai ancora ordini.
             </div>
        )}

        {!isLoading && orders?.map((order) => {
            const mainItem = order.items[0];
            const serviceTitle = mainItem?.service.title || "Servizio";
            const description = order.items.length > 1 
                ? `${serviceTitle} e altri ${order.items.length - 1} servizi`
                : "Servizio standard";

            return (
                <div 
                    key={order.id} 
                    onClick={() => navigate(`/user-panel/orders/${order.id}`)}
                    className="cursor-pointer block"
                >
                    <Order 
                        number={`Ordine n. ${order.id}`}
                        image={mainItem?.service.imageUrl || defaultImg} 
                        name={serviceTitle} 
                        description={description} 
                        status={getStatusLabel(order.status)} 
                    />
                </div>
            );
        })}

      </div>
    </div>
  );
};