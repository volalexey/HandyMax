import { useState } from 'react';
import { useSignupMutation } from '../../../store/api/authApi';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [signup, { isLoading }] = useSignupMutation();

  const PWD_REGEX = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  
  const PHONE_REGEX = /^\+39\d{8,15}$/;
  
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (formData.phone.trim().length > 0) {
       if (!PHONE_REGEX.test(formData.phone)) {
         newErrors.phone = 'Format must be +39XXXXXXXXXX';
       }
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!PWD_REGEX.test(formData.password)) {
      newErrors.password = 'Min 8 chars, 1 uppercase letter, 1 number';
    }

    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = validate();
    
    if (!isValid) return;

    try {
      await signup({ 
        email: formData.email, 
        password: formData.password, 
        name: formData.name,
        phone: formData.phone 
      }).unwrap();

      alert('Account created! Please log in.');
      onSwitchToLogin();
    } catch (err) {
      console.error('Registration failed', err);
    }
  };

  const getInputClasses = (fieldName: string) => {
    const hasError = !!errors[fieldName];
    return `w-full h-[50px] border rounded-xl px-4 outline-none transition
      ${hasError 
        ? 'border-red-500 text-red-900 focus:border-red-500 bg-red-50'
        : 'border-[#E0E0E0] focus:border-orange-500'
      }`;
  };

  return (
    <div className="animate-fadeIn">
      <h1 className="text-[2rem] font-extrabold text-[#191A19] mb-2 text-center">
        Create account
      </h1>
      <p className="text-gray-500 text-center mb-6">
        Fill in the details to get started
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* NAME */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-[#191A19]">Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={getInputClasses('name')}
          />
          {errors.name && <span className="text-red-500 text-xs ml-1">{errors.name}</span>}
        </div>

        {/* PHONE */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-[#191A19]">Phone</label>
          <input
            name="phone"
            type="tel"
            placeholder="+39..."
            value={formData.phone}
            onChange={handleChange}
            className={getInputClasses('phone')}
          />
          {errors.phone && <span className="text-red-500 text-xs ml-1">{errors.phone}</span>}
        </div>

        {/* EMAIL */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-[#191A19]">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={getInputClasses('email')}
          />
          {errors.email && <span className="text-red-500 text-xs ml-1">{errors.email}</span>}
        </div>

        {/* PASSWORD */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold text-[#191A19]">Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={getInputClasses('password')}
          />
          {errors.password && <span className="text-red-500 text-xs ml-1">{errors.password}</span>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 w-full h-[55px] bg-[#FF7A00] text-white font-bold rounded-xl hover:bg-[#e66e00] transition disabled:bg-gray-300"
        >
          {isLoading ? 'Processing...' : 'Sign up'}
        </button>
      </form>

      <div className="mt-6 text-center text-gray-500 text-sm">
        Already have an account?{' '}
        <button 
          onClick={onSwitchToLogin}
          className="text-[#FF7A00] font-bold cursor-pointer hover:underline"
        >
          Log in
        </button>
      </div>
    </div>
  );
};