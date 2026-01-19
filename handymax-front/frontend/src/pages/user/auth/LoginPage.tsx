import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeLoginModal } from '../../../store/slices/authSlice';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const LoginPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeLoginModal());
  };

  return (
    <div className="fixed inset-0 bg-white md:bg-black/60 z-[9999] flex items-center justify-center overflow-y-auto py-10 md:py-0">
      
      <div className="absolute inset-0 hidden md:block" onClick={handleClose}></div>

      <div className="w-full min-h-screen md:min-h-0 md:h-auto md:w-[500px] bg-white md:rounded-[24px] p-6 md:p-10 relative flex flex-col justify-center shadow-2xl z-10 transition-all">
        
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-black transition text-xl font-bold z-20"
        >
          ✕
        </button>

        {isLoginMode ? (
          <LoginForm onSwitchToRegister={() => setIsLoginMode(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLoginMode(true)} />
        )}

      </div>
    </div>
  );
};