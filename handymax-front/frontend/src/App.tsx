import { useAppSelector, useAppDispatch } from './store/hooks';
import { login, logout } from './store/slices/authSlice';

function App() {
  // Читаем данные
  const { isAuth, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Redux Test</h1>
      
      {/* Показываем статус */}
      <p>Status: {isAuth ? `Привет, ${user?.name}` : 'Гость'}</p>

      {/* Кнопки меняют состояние */}
      <div className="flex gap-4">
        <button 
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => dispatch(login({ id: 1, email: 'test@test.com', name: 'Max', role: 'ADMIN' }))}
        >
          Войти
        </button>
        
        <button 
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          onClick={() => dispatch(logout())}
        >
          Выйти
        </button>
      </div>
    </div>
  );
}

export default App;
