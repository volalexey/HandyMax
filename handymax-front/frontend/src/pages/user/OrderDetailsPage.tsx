import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../store/api/ordersApi";
import { Order } from "../../components/userPanel/order/Order";

import defaultImg from "../../assets/img/services1.png"; 
import arrowGrey from "../../assets/img/arrowGrey.svg";
import downloadIcon from "../../assets/img/download.svg";

export const OrderDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Запрос к API
  const { data: order, isLoading, isError } = useGetOrderByIdQuery(id || "");

  if (isLoading) return <div className="p-10 text-center">Loading details...</div>;
  if (isError || !order) return <div className="p-10 text-center text-red-500">Order not found</div>;

  // Данные для отображения "Главной" услуги заказа (берем первую)
  const mainService = order.items[0]?.service;
  const mainImage = mainService?.imageUrl || defaultImg;
  const mainTitle = mainService ? mainService.title : "Order details";
  const mainDesc = order.items.length > 1 
    ? `And ${order.items.length - 1} more service(s)` 
    : "Service details";

  return (
    <div className="bg-white w-full min-h-[70vh] rounded-[20px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.15)] 
                    p-[30px_10px_20px] lg:p-[60px_40px] xl:p-[60px_100px] flex flex-col gap-[20px]">
      
      <h2 className="text-[2.5rem] font-bold uppercase text-center lg:text-left">
        Order n. {order.id}
      </h2>

      {/* HEADER WITH BACK BUTTON */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 relative w-full">
        <NavLink 
          to="/user-panel/orders" 
          className="flex items-center gap-2 text-gray-500 font-medium hover:text-black transition absolute -top-16 left-0 lg:static lg:top-auto"
        >
          <img src={arrowGrey} alt="back" className="w-6 h-6 rotate-90" />
          Indietro
        </NavLink>

        <button 
          onClick={() => alert("Receipt download coming soon!")}
          className="flex items-center gap-2 uppercase font-medium bg-transparent border-none cursor-pointer ml-auto lg:ml-0 hover:opacity-70 transition"
        >
          Scarica l'assegno
          <img src={downloadIcon} alt="download" className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col gap-[20px]">
        
        {/* Main Order Card (Visual representation) */}
        <Order 
          number={`#${order.id}`}
          image={mainImage}
          name={mainTitle}
          description={mainDesc}
          isDetails={true} 
          status={order.status} // Если компонент Order принимает статус, передай его
        />

        <div className="w-full h-[1px] bg-[#8B8B8B] my-[20px]"></div>

        {/* LIST OF SERVICES (Items) */}
        <div className="flex flex-col gap-[20px]">
          <h3 className="text-[1.5rem] font-bold uppercase">Lavori eseguiti:</h3>
          
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0">
              <div className="flex flex-col gap-1 max-w-[60%]">
                <p className="text-sm font-bold uppercase">{item.service.title}</p>
                {/* Если будет описание в OrderItem, вывести тут */}
              </div>
              <div className="flex flex-col items-end">
                  <p className="text-sm font-bold uppercase">x{item.quantity}</p>
                  <p className="text-sm font-bold uppercase">€{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full h-[1px] bg-[#8B8B8B] my-[20px]"></div>

        {/* CALCULATION (Contare) */}
        <div className="flex flex-col gap-[20px]">
          <h3 className="text-[1.5rem] font-bold uppercase">Contare:</h3>
          
          <div className="flex flex-col gap-[15px] w-full lg:max-w-[40%]">
            <div className="flex justify-between items-center">
              <p className="text-sm font-bold uppercase">Prezzo base:</p>
              <p className="text-sm font-bold uppercase text-[#B7B7B7]">€{order.totalPrice}</p>
            </div>
            {/* Пока у нас нет отдельного поля для налогов и допов в базе, можно скрыть или поставить 0 */}
            <div className="flex justify-between items-center">
              <p className="text-sm font-bold uppercase">tasse (0%):</p>
              <p className="text-sm font-bold uppercase text-[#B7B7B7]">€0.00</p>
            </div>
          </div>
        </div>

        {/* TOTAL FOOTER */}
        <div className="flex flex-col gap-[20px] w-full lg:max-w-[70%] mt-[30px]">
          <div className="flex justify-between items-center text-[1.5rem] font-bold uppercase text-orange-500">
            <h3>Costo totale:</h3>
            <p>€{order.totalPrice}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_2fr] gap-2.5 w-full lg:max-w-[90%]">
            {/* Кнопка повторного заказа - пока просто алерт */}
            <button 
                onClick={() => alert("Re-order functionality coming soon!")}
                className="h-[35px] bg-orange-500 text-white font-bold uppercase rounded-lg text-sm hover:bg-orange-600 transition"
            >
              Riordinare
            </button>
            
            {/* Кнопка отзыва - ведет на страницу создания */}
            <button 
                onClick={() => navigate(`/user-panel/create-review?orderId=${order.id}`)}
                className="h-[35px] bg-[#191A19] text-white font-bold uppercase rounded-lg text-sm hover:bg-black transition"
            >
              Lascia una recensione
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};