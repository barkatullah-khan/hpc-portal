'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, GraduationCap, ShieldCheck } from 'lucide-react';
import { diagonalTilt } from '@/utils/animations'; 

export default function Team() {
  const members = [
    {
      name: "Barkat Ullah Khan",
      reg: "22MDSWE241",
      role: "Frontend Developer & System UI Designer",
      focus: "Next.js, Tailwind CSS, Dashboard Integration",
      icon: <Code className="w-6 h-6" />,
      direction: -80 
    },
    {
      name: "Muhammad Adnan",
      reg: "22MDSWE220",
      role: "HPC Infrastructure & Backend Engineer",
      focus: "SLURM Configuration, Node Management, Ansible",
      icon: <Server className="w-6 h-6" />,
      direction: 80 
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-20 px-6 min-h-screen">
      
      {/* HEADER SECTION - UPDATED FOR DIAGONAL ENTRY */}
      <div className="text-center mb-20 relative">
        <motion.div
          // Starts from Top (y: -100) and Right (x: 100)
          initial={{ opacity: 0, x: 100, y: -100 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.22, 1, 0.36, 1] // Smooth cinematic deceleration
          }}
          className="inline-block relative"
        >
          <motion.h1 
            variants={diagonalTilt}
            initial="initial"
            whileHover="hover"
            className="text-5xl md:text-7xl font-black text-white tracking-tighter cursor-pointer relative z-10"
          >
            Project <span className="text-blue-500">Team</span>
          </motion.h1>

          {/* BOTTOM GREEN LINE ANIMATION */}
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '100%', opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
            className="absolute -bottom-2 left-0 h-0.5 bg-linear-to-r from-transparent via-green-400 to-transparent shadow-[0_0_15px_rgba(74,222,128,0.8)]"
          />
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-blue-400 font-bold mt-8 uppercase tracking-[0.3em] text-[10px]"
        >
          Department of Computer Software Engineering
        </motion.p>
        <p className="text-gray-500 font-mono text-xs mt-1">UET Mardan • High Performance Computing Lab</p>
      </div>

      {/* MEMBER CARDS SECTION - (No changes here) */}
      <div className="grid md:grid-cols-2 gap-10 mb-24">
        {members.map((m, index) => (
          <motion.div
            key={m.reg}
            initial={{ opacity: 0, x: m.direction }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: "circOut" }}
            className="group relative bg-white/8 backdrop-blur-xl border border-white/20 p-10 rounded-[2.5rem] shadow-2xl"
          >
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                {m.icon}
              </div>
              <h3 className="text-2xl font-black text-white mb-1 group-hover:text-blue-400 transition-colors">{m.name}</h3>
              <p className="text-blue-400 text-xs font-mono font-bold tracking-widest mb-6">REG No: {m.reg}</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0" />
                  <p className="text-sm font-bold text-gray-200">{m.role}</p>
                </div>
                <div className="p-5 bg-black/40 rounded-2xl border border-white/5">
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-black mb-2">Primary Focus</p>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">{m.focus}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* SUPERVISOR SECTION - (No changes here) */}
      <div className="relative py-12 text-center flex flex-col items-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="relative z-10">
          <div className="mb-6 p-3 inline-block bg-white/5 rounded-full border border-white/10">
            <GraduationCap className="w-10 h-10 text-blue-400" />
          </div>
          <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.5em] mb-4">Project Supervisor</p>
          <motion.h2 variants={diagonalTilt} initial="initial" whileHover="hover" className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter cursor-pointer">
            Prof. Dr. Ibrar Ali Shah
          </motion.h2>
          <p className="text-gray-400 font-bold text-lg max-w-xl mx-auto leading-tight">
            Chairman & Professor 
            <span className="block text-gray-600 text-xs mt-2 uppercase tracking-widest font-mono">Dept. of Computer Software Engineering • UET Mardan</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}