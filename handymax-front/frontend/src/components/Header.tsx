import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';

import logo from '../assets/img/logo.png';
import logoBig from '../assets/img/bigLogoWhite.png';
import earth from '../assets/img/earth.png';
import arrow from '../assets/img/arrow.png';
import burger from '../assets/img/burger.png';
import cross from '../assets/img/cross.png';
import profileIcon from '../assets/img/profileIcon.png';

const LogInModal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
    <div className="bg-white p-8 rounded">
      <h2>Тут будет форма входа</h2>
      <button onClick={onClose} className="mt-4 text-red-500">Закрыть</button>
    </div>
  </div>
);

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogInModalOpen, setIsLogInModalOpen] = useState(false);
  
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-xl text-white hover:text-orange-500 transition-colors ${
      isActive ? 'text-orange-500 border-b-2 border-orange-500' : ''
    }`;

  return (
    <div className="bg-[#191A19] min-h-[100px] relative">
      <div className="container mx-auto px-4 min-h-[100px] flex justify-between items-center">
        
        <img className="hidden lg:block h-16 object-contain" src={logo} alt="logo" />

        <img 
          onClick={() => setIsMenuOpen(true)} 
          className="lg:hidden w-8 cursor-pointer" 
          src={burger} 
          alt="menu" 
        />
        <img className="lg:hidden h-12 object-contain" src={logoBig} alt="logo mobile" />
        
        <img 
          onClick={() => isAuth ? alert("Переход в профиль") : setIsLogInModalOpen(true)}
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
              <img src={earth} alt="lang" className="w-5" />
              <span>Italian</span>
              <img src={arrow} alt="arr" className="w-3" />
            </div>

            {isAuth ? (
              <div className="flex items-center gap-4">
                <span className="text-white">Привет, {user?.name}</span>
                <button 
                  onClick={() => dispatch(logout())}
                  className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                >
                  Выйти
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLogInModalOpen(true)}
                className="bg-orange-500 text-white px-8 py-2 rounded hover:bg-orange-600 transition font-medium"
              >
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

      {isLogInModalOpen && <LogInModal onClose={() => setIsLogInModalOpen(false)} />}
    </div>
  );
};