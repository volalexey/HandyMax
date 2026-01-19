import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../store/api/authApi';
import { setCredentials, closeLoginModal } from '../../../store/slices/authSlice';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ user: userData.user, token: userData.access_token }));
      if(userData.user.role === "ADMIN"){
        navigate('/admin-panel/services');
      }
      else{
        navigate('/user-panel');
      }
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <div className="animate-fadeIn">
      <h1 className="text-[2rem] font-extrabold text-[#191A19] mb-2 text-center">
        Login
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <input
            type="email"
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-[50px] border border-[#E0E0E0] rounded-xl px-4 outline-none focus:border-orange-500 transition"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-[50px] border border-[#E0E0E0] rounded-xl px-4 outline-none focus:border-orange-500 transition"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 w-full h-[55px] bg-[#FF7A00] text-white font-bold rounded-xl hover:bg-[#e66e00] transition disabled:bg-gray-300"
        >
          {isLoading ? 'Confermate...' : 'Confermate'}
        </button>
      </form>

      <div className="mt-6 text-center text-gray-500 text-sm">
        Don't have an account?{' '}
        <button 
          onClick={onSwitchToRegister}
          className="text-[#FF7A00] font-bold cursor-pointer hover:underline"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};