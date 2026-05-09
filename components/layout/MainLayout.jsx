'use client';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout({ children }) {
  return (
    // The background color and overflow control
    <div className="min-h-screen bg-[#0f172a] relative overflow-hidden text-white flex flex-col">
      
      {/* 1. THE DIAGONAL BACKGROUND (Fixed so it doesn't move when scrolling content) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          initial={{ x: "-5%", y: "-5%" }}
          animate={{ x: "5%", y: "5%" }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "linear" 
          }}
          className="absolute inset-0 opacity-[0.03] rotate-[-15deg] scale-125 flex flex-col items-center justify-center"
        >
          {[...Array(12)].map((_, i) => (
            <h1 key={i} className="text-[3.5rem] font-black whitespace-nowrap leading-tight tracking-[0.5em] uppercase select-none">
              HPC PORTAL UET MARDAN — HPC PORTAL UET MARDAN — HPC PORTAL UET MARDAN
            </h1>
          ))}
        </motion.div>
      </div>

      {/* 2. THE NAV BAR */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* 3. THE PAGE CONTENT (Grows to fill space) */}
      <main className="relative z-10 grow">
        {children}
      </main>

      {/* 4. THE FOOTER */}
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
}