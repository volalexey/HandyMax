import { NavLink } from "react-router-dom";

interface ProductProps {
  img: string;
  title: string;
  text: string;
  price: string;
  link: string;
}

export const Product = ({ img, title, text, price, link }: ProductProps) => {
  return (
    <div className="flex flex-col w-full h-full gap-4 group">
      
      <div className="w-full aspect-[4/3] rounded-[20px] overflow-hidden relative bg-gray-100">
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col flex-grow gap-2">
        
        <h3 className="text-[1.125rem] font-bold leading-tight line-clamp-2">
          {title}
        </h3>

        <p className="text-[#6C757D] text-sm leading-relaxed line-clamp-3">
          {text}
        </p>
        
        <div className="mt-auto pt-2 flex flex-col gap-3">
          
          <p className="text-[1.125rem] font-bold text-black">
            Prezzo - da €{price}
          </p>

          <NavLink 
            to={link}
            className="w-fit px-8 py-2.5 bg-orange-500 text-white rounded-lg font-bold uppercase text-sm hover:bg-orange-600 transition-colors text-center"
          >
            Ordina ora
          </NavLink>
        </div>

      </div>
    </div>
  );
};