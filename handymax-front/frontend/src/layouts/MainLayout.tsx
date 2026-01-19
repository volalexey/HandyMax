import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { LoginPage } from '../pages/user/auth/LoginPage';

export const MainLayout = () => {
  const isLoginModalOpen = useSelector((state: RootState) => state.auth.isLoginModalOpen);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />

      {
        //login modal
      }
      {isLoginModalOpen && <LoginPage/>}
    </div>
  );
};