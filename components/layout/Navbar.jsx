"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, LogOut, User } from 'lucide-react';
import api from '@/utils/api';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check for login status (basic check for now)
  useEffect(() => {
    // If the 'token' cookie exists, the browser will handle it via 'api.js'
    // For the UI, we check if we can reach a public endpoint or check a small flag
    const checkAuth = async () => {
      try {
        // Optional: Call /getMe here to verify session
        // setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await api.get('/auth/logout');
      toast.success('Successfully logged out');
      setIsLoggedIn(false);
      router.push('/login');
      router.refresh();
    } catch (err) {
      toast.error('Logout failed');
    }
  };

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Architecture', href: '/architecture' },
    { name: 'Features', href: '/features' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Team', href: '/team' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-[#1e293b] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="text-xl font-bold flex items-center group shrink-0">
          <span className="bg-blue-600 px-2 py-0.5 rounded mr-2 uppercase text-xs transition-colors group-hover:bg-blue-500">HPC</span> 
          <span className="tracking-tight">Portal</span>
        </Link>
        
        {/* DESKTOP LINKS */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors border-b-2 border-transparent hover:border-blue-500 pb-1"
            >
              {link.name}
            </Link>
          ))}
          
          {/* AUTH BUTTONS - THE NEW FUNCTIONALITY */}
          <div className="flex items-center ml-4 pl-4 border-l border-slate-700 space-x-4">
            <button 
              onClick={handleLogout}
              className="flex items-center text-sm font-medium text-slate-300 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </button>

            {/* STATUS TAG */}
            <div className="hidden lg:block">
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                SYSTEM: ONLINE
              </span>
            </div>
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button 
          className="md:hidden p-2" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-[#1e293b] border-t border-slate-700 p-6 space-y-4 absolute top-16 left-0 w-full shadow-2xl z-50">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-slate-300 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-700 flex flex-col space-y-4">
              <button 
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="text-left text-red-400 font-medium"
              >
                Logout
              </button>
              <span className="text-[10px] font-mono text-emerald-400 uppercase">System: Online</span>
          </div>
        </div>
      )}
    </nav>
  );
}