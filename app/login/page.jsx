'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Loader2, Cpu, AlertCircle } from 'lucide-react'; 
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); 
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Logic remains untouched as per your requirement
      const res = await api.post('auth/login', { email, password });
      
      if (res.data.status === 'success') {
        toast.success('Login Successful!');
        setTimeout(() => {
          router.push('/dashboard/user');
        }, 800);
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid Email or Password';
      setError(msg); 
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f172a] relative overflow-hidden">
      
      {/* 1. SMALL DIAGONAL FLOWING TEXT BACKGROUND */}
      <motion.div 
        initial={{ x: "-10%", y: "-10%" }}
        animate={{ x: "10%", y: "10%" }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "linear" 
        }}
        className="absolute inset-0 pointer-events-none select-none flex flex-col items-center justify-center opacity-[0.04] rotate-[-15deg] scale-125"
      >
        {/* Repeated lines to fill the screen diagonal space */}
        {[...Array(10)].map((_, i) => (
          <h1 key={i} className="text-[4rem] font-bold text-white whitespace-nowrap leading-tight tracking-widest">
            HPC PORTAL UET MARDAN — HPC PORTAL UET MARDAN — HPC PORTAL UET MARDAN
          </h1>
        ))}
      </motion.div>

      {/* 2. GLOW RADIANCE (Purely Aesthetic) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[150px]" />
      </div>

      {/* 3. LOGIN CARD (Glassmorphism Style) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="z-10 bg-white/5 backdrop-blur-xl p-10 rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] w-full max-w-md border border-white/10"
      >
        <div className="flex flex-col items-center mb-8">
          <motion.div 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="bg-green-600 p-3 rounded-2xl mb-4 shadow-lg shadow-green-900/40"
          >
            <Cpu className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Sign In</h2>
          <p className="text-green-400 font-medium text-sm mt-1">UET Mardan HPC System</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email</label>
            <input 
              type="email" 
              placeholder="user@uetmardan.edu.pk" 
              required
              className="w-full p-4 bg-black/20 border border-white/5 rounded-2xl focus:ring-2 focus:ring-green-500 text-white outline-none transition-all placeholder:text-gray-600"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                required
                className="w-full p-4 bg-black/20 border border-white/5 rounded-2xl focus:ring-2 focus:ring-green-500 text-white outline-none transition-all placeholder:text-gray-600"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-400 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error Message Reaction */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-red-400 text-sm"
            >
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-green-900/30 transition-all flex items-center justify-center gap-2 disabled:bg-gray-800 disabled:text-gray-500 active:scale-[0.98]"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              'Initialize Session'
            )}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-white/5 flex justify-center">
           <span className="text-[10px] text-gray-600 font-medium tracking-[0.2em] uppercase">Authorized Personnel Only</span>
        </div>
      </motion.div>
    </div>
  );
}