"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Activity, CheckCircle2, 
  Clock, AlertCircle, Terminal, Cpu, HardDrive 
} from 'lucide-react';
import JobForm from '@/components/jobs/JobForm';
import JobTable from '@/components/jobs/JobTable';
import { diagonalTilt } from '@/utils/animations';

export default function UserDashboard() {
  // Original logic for backend connectivity
  const handleViewLog = (jobId) => {
    console.log("Fetching logs for:", jobId);
    alert("Viewing Output for Job #" + jobId);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-400 mx-auto p-4 md:p-8 space-y-8"
    >
      {/* --- STEP 1: GLASS HEADER WITH DIAGONAL TILT --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-white/5">
        <div>
          <motion.h1 
            variants={diagonalTilt}
            initial="initial"
            whileHover="hover"
            className="text-4xl font-black text-white tracking-tighter cursor-default"
          >
            RESEARCHER <span className="text-green-500">PORTAL</span>
          </motion.h1>
          <div className="flex items-center gap-3 mt-2 text-gray-500 font-mono text-xs uppercase tracking-widest">
            <span className="flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
            System Status: Optimal / Node-01
          </div>
        </div>

        {/* Quick Actions / Time */}
        <div className="hidden lg:flex gap-4">
           <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-right">
              <p className="text-[10px] text-gray-500 uppercase">Current Session</p>
              <p className="text-sm font-bold text-white font-mono">04:12:45</p>
           </div>
        </div>
      </header>

      --- STEP 2: REAL-TIME METRICS (Professional Polish) ---
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Jobs", val: "02", icon: <Activity />, color: "border-blue-500/50 text-blue-400" },
          { label: "Success Rate", val: "98%", icon: <CheckCircle2 />, color: "border-green-500/50 text-green-400" },
          { label: "Credits Left", val: "1.2k", icon: <Cpu />, color: "border-purple-500/50 text-purple-400" },
          { label: "Storage Used", val: "45GB", icon: <HardDrive />, color: "border-amber-500/50 text-amber-400" },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-white/3 backdrop-blur-md border ${stat.color} p-5 rounded-4xl hover:bg-white/6 transition-all`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold uppercase tracking-tighter opacity-60">{stat.label}</span>
              <span className="opacity-80">{stat.icon}</span>
            </div>
            <div className="text-3xl font-black text-white">{stat.val}</div>
          </motion.div>
        ))}
      </div>

      {/* --- STEP 3: DUAL-COLUMN WORKSPACE --- */}
      <div className="grid xl:grid-cols-12 gap-8 items-start">
        
        {/* Left: Configuration & Submission (4 Cols) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="xl:col-span-4 space-y-6"
        >
          <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Terminal size={80} />
            </div>
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="h-2 w-8 bg-blue-500 rounded-full" />
              Configure Job
            </h2>
            <JobForm />
          </div>

          {/* New Element: System Alerts/Notice */}
          <div className="bg-linear-to-r from-amber-500/10 to-transparent p-6 rounded-4xl border border-amber-500/20">
            <div className="flex gap-4 items-start text-amber-200">
              <AlertCircle className="shrink-0" />
              <div className="text-xs">
                <p className="font-bold uppercase tracking-widest mb-1">Queue Warning</p>
                <p className="opacity-70">Cluster Node-04 is undergoing maintenance. Expect slight delays in partition scheduling.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Monitoring & Table (8 Cols) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="xl:col-span-8 bg-white/5 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/10 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
               <span className="h-2 w-8 bg-green-500 rounded-full" />
               Job Execution History
            </h2>
            <div className="flex gap-2">
               <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
               <span className="text-[10px] text-gray-500 uppercase font-mono">Live Sync</span>
            </div>
          </div>
          
          <div className="rounded-2xl overflow-hidden border border-white/5 bg-black/20">
            <JobTable handleViewLog={handleViewLog} />
          </div>
        </motion.div>
      </div>

      {/* --- FOOTER DECORATION --- */}
      <footer className="text-center pt-10">
         <p className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">
           High Performance Computing Portal / Powered by Slurm & Warewulf
         </p>
      </footer>
    </motion.div>
  );
}