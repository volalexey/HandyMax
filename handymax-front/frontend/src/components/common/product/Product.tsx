import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';

interface ProductProps {
  img: string;
  title: string;
  text: string;
  price: string;
  buttonText?: string;
  link?: string;
}

export const Product = ({ img, title, text, price, buttonText = "Ordina ora", link }: ProductProps) => {
  
  const buttonClasses = "w-full block py-3 border-2 border-[#191A19] text-[#191A19] font-bold uppercase rounded hover:bg-[#191A19] hover:text-white transition-colors text-center";

  return (
    <div className="flex flex-col gap-4 max-w-[350px] mx-auto w-full">
      
      <img src={img} alt={title} className="w-full h-auto rounded-lg object-cover shadow-md" />
      
      <h3 className="text-xl font-bold uppercase min-h-[3rem] line-clamp-2">
        {title}
      </h3>
      
      <p className="text-gray-500 text-sm line-clamp-3 min-h-[4.5rem]">
        {text}
      </p>
      
      <div className="text-2xl font-bold text-[#191A19]">
        €{price}
      </div>
      
      {link ? (
        <Link to={link} className={buttonClasses}>
          {buttonText}
        </Link>
      ) : (
        <HashLink smooth to="/#contacts" className={buttonClasses}>
          {buttonText}
        </HashLink>
      )}

    </div>
  );
};