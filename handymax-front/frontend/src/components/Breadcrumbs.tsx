import { Link } from 'react-router-dom';
import homeIcon from '../assets/img/home.png';

interface BreadcrumbsProps {
  name: string;
}

export const Breadcrumbs = ({ name }: BreadcrumbsProps) => {
  return (
    <nav className="absolute top-5 left-[5vw] flex items-center gap-2 text-sm text-[#333] z-10">

      <Link to="/" className="flex items-center hover:text-orange-500 transition-colors">
        <img src={homeIcon} alt="Home" className="w-4 h-4 object-contain" />
      </Link>

      <span className="font-serif font-bold text-xl text-black leading-none pb-1">
        &gt;
      </span>

      <span className="font-medium underline decoration-1 underline-offset-2">
        {name}
      </span>
    </nav>
  );
};