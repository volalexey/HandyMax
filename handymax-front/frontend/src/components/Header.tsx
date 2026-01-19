import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout, openLoginModal } from '../store/slices/authSlice';

import logo from '../assets/img/logo.png';
import logoBig from '../assets/img/bigLogoWhite.png';
import earth from '../assets/img/earth.png';
import arrow from '../assets/img/arrow.png';
import burger from '../assets/img/burger.png';
import cross from '../assets/img/cross.png';
import profileIcon from '../assets/img/profileIcon.png';

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { isAuth, user } = useAppSelector((state) => state.auth);

  const dashboardPath = user?.role === 'ADMIN' ? '/admin-panel' : '/user-panel';

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-2xl text-white hover:text-[#FF7420] transition-colors p-2 ${
      isActive ? 'text-[#FF7420] border-b-2 border-[#FF7420]' : ''
    }`;

  return (
    <div className="bg-[#191A19] min-h-[100px] relative">
      <div className="container mx-auto px-12 min-h-[100px] flex justify-between items-center">
        
        <Link to="/">
            <img className="hidden lg:block h-16 object-contain" src={logo} alt="logo" />
        </Link>

        <img 
          onClick={() => setIsMenuOpen(true)} 
          className="lg:hidden w-8 cursor-pointer" 
          src={burger} 
          alt="menu" 
        />
        
        <Link to="/" className="lg:hidden">
            <img className="h-12 object-contain" src={logoBig} alt="logo mobile" />
        </Link>
        
        <img 
          onClick={isAuth ? () => dispatch(openLoginModal()) : () => {alert('yes')}}
          className="lg:hidden w-8 cursor-pointer" 
          src={profileIcon} 
          alt="profile" 
        />

        <div
          className={`
            fixed top-0 left-0 h-full w-[70%] bg-[#191A19] z-50 flex flex-col gap-8 p-8 transition-transform duration-300 ease-in-out shadow-2xl
            lg:static lg:h-auto lg:w-auto lg:bg-transparent lg:flex-row lg:shadow-none lg:p-0 lg:transform-none
            ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="flex justify-end lg:hidden">
            <img 
              onClick={() => setIsMenuOpen(false)} 
              src={cross} 
              alt="close" 
              className="w-8 cursor-pointer" 
            />
          </div>

          <img src={logoBig} alt="logo" className="w-40 self-center lg:hidden mb-4" />

          <nav className="flex flex-col items-center gap-6 lg:flex-row lg:gap-8">
            <NavLink to="/" className={linkClasses} onClick={() => setIsMenuOpen(false)}>
              Casa
            </NavLink>
            
            {isAuth && (
              <NavLink to={dashboardPath} className={linkClasses} onClick={() => setIsMenuOpen(false)}>
                Area personale
              </NavLink>
            )}

            <NavLink to="/about" className={linkClasses} onClick={() => setIsMenuOpen(false)}>
              Tuttofare
            </NavLink>
            <NavLink to="/services" className={linkClasses} onClick={() => setIsMenuOpen(false)}>
              Servizi
            </NavLink>
            <a href="#" className="text-xl text-white hover:text-orange-500 transition-colors">
              Recensioni
            </a>
            <NavLink to="/contacts" className={linkClasses} onClick={() => setIsMenuOpen(false)}>
              Contatti
            </NavLink>
          </nav>

          <div className="hidden lg:flex items-center gap-6 ml-8">
            <div className="flex items-center gap-2 text-white cursor-pointer hover:text-gray-300">
              <img src={earth} alt="lang" className="w-8" />
              <span className='text-2xl'>Italian</span>
              <img src={arrow} alt="arr" className="w-4" />
            </div>

            {isAuth ? (
              <div className="flex items-center gap-4">
                <Link to={dashboardPath} className="text-white hover:text-orange-500 transition cursor-pointer">
                    Ciao, {user?.name}
                </Link>
                <button 
                  onClick={() => dispatch(logout())}
                  className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                >
                  Esci
                </button>
              </div>
            ) : (
              <button 
                onClick={() => dispatch(openLoginModal())}
                className='text-white bg-[#FF7420] px-7 py-3 text-2xl rounded-2xl transition'>
                Log in
              </button>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </div>
    </div>
  );
};