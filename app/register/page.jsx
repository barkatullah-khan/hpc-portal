'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// Change line 4 to this:
import api from '@/utils/api';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      return toast.error("Passwords do not match!");
    }

    try {
      const res = await api.post('/auth/register', formData);
      if (res.data.status === 'success') {
        toast.success('Account created! Please login.');
        router.push('/login');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">Join HPC Portal</h2>
        
        <input name="name" type="text" placeholder="Full Name" required
          className="w-full p-2 mb-4 border rounded" onChange={handleChange} />
        
        <input name="email" type="email" placeholder="Email" required
          className="w-full p-2 mb-4 border rounded" onChange={handleChange} />
        
        <input name="password" type="password" placeholder="Password" required
          className="w-full p-2 mb-4 border rounded" onChange={handleChange} />
        
        <input name="passwordConfirm" type="password" placeholder="Confirm Password" required
          className="w-full p-2 mb-6 border rounded" onChange={handleChange} />
        
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Register
        </button>
      </form>
    </div>
  );
}