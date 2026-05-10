"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/utils/api';
import toast, { Toaster } from 'react-hot-toast';
import JobForm from '@/components/jobs/JobForm';
import JobTable from '@/components/jobs/JobTable';
import {
  Terminal as TerminalIcon, Cpu, HardDrive,
  Activity, Zap, ShieldAlert, X, Maximize2, RefreshCw
} from 'lucide-react';

export default function AdminDashboard() {
  // --- States ---
  const [stats, setStats] = useState({ nodes: "0/0", jobs: "0", cpu: "0%", memory: "0%", nodeDetails: [] });
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [logContent, setLogContent] = useState(null);
  const [isLogOpen, setIsLogOpen] = useState(false);

  // --- Real-Time Sync ---
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await api.get('hpc/stats');
        const data = res.data.data || res.data;
        setStats(data);
      }  catch (err) {
  console.error("Admin Sync Error:", err.message);
  // Reset to string format so .split() doesn't fail on next render
  setStats({ 
    nodes: "0/0", 
    jobs: "0", 
    cpu: "0%", 
    memory: "0%", 
    nodeDetails: [] 
  });
}
    };
    

    fetchAdminData();
    const interval = setInterval(fetchAdminData, 3000); // 3-second heartbeat
    return () => clearInterval(interval);
  }, []);

  // --- Shared Result Logic (Fixes the "No Result" issue) ---
  const handleViewLog = async (jobId) => {
    const toastId = toast.loading(`Fetching logs for #${jobId}...`);
    try {
      const res = await api.get(`hpc/job-logs/${jobId}`);
      setLogContent(res.data.output);
      setIsLogOpen(true);
      toast.success("Execution logs retrieved", { id: toastId });
    } catch (err) {
      toast.error("Log file not found or job still initializing.", { id: toastId });
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto p-4 md:p-8 space-y-8 pb-20">
      <Toaster position="top-right" />

      {/* 1. DYNAMIC NODE GRIDS (Heatmap / Grafana Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.nodeDetails?.length > 0 ? (
          stats.nodeDetails.map((node) => (
            <motion.div
              layout
              key={node.id}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-[2rem] hover:border-blue-500/50 transition-colors"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${node.status.includes('idle') ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`} />
                  <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-tighter">{node.id}</span>
                </div>
                <span className="text-[8px] text-gray-500 font-bold uppercase">{node.status}</span>
              </div>

              {/* REAL-TIME GRAPH BARS */}
              <div className="h-16 flex items-end gap-1 mb-3 px-1">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{
                      height: i === 9 ? `${node.cpu}%` : `${Math.random() * 15 + (node.cpu - 5)}%`
                    }}
                    className={`flex-1 rounded-t-[2px] ${node.status.includes('idle') ? 'bg-blue-500/20' : 'bg-blue-500'}`}
                  />
                ))}
              </div>

              <div className="flex justify-between text-[10px] font-mono text-gray-500 border-t border-white/5 pt-3">
                <span>CPU: {node.cpu}%</span>
                <span>MEM: {node.mem}GB</span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-10 text-center text-gray-500 font-mono text-xs animate-pulse">
            INITIALIZING HARDWARE MONITORING...
          </div>
        )}
      </div>

      <div className="grid xl:grid-cols-12 gap-8">
        {/* 2. ADMIN CONTROL SIDEBAR */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              <ShieldAlert size={18} className="text-red-500" />
              Root Submission
            </h2>
            {/* Safely handle the split by checking if nodes is a string first */}
            <JobForm
              idleNodes={
                typeof stats.nodes === 'string'
                  ? parseInt(stats.nodes.split('/')[0])
                  : (parseInt(stats.nodes) || 0)
              }
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsTerminalOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white p-6 rounded-[2rem] font-bold flex items-center justify-between group transition-all shadow-xl shadow-blue-900/20"
          >
            <div className="flex items-center gap-4 text-sm uppercase tracking-widest">
              <TerminalIcon />
              <span>SSH Master Shell</span>
            </div>
            <Maximize2 size={18} className="opacity-50" />
          </motion.button>

          <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-gray-500">SYSTEM HEALTH</span>
              <RefreshCw size={14} className="text-gray-500 animate-spin-slow" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="opacity-50">Cluster Usage</span><span>{stats.cpu}</span></div>
              <div className="flex justify-between text-sm"><span className="opacity-50">Memory Usage</span><span>{stats.memory}</span></div>
            </div>
          </div>
        </div>

        {/* 3. GLOBAL JOB MONITORING */}
        <div className="xl:col-span-8">
          <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                  <Activity size={18} />
                </div>
                <h2 className="text-lg font-bold text-white uppercase tracking-tight">Global Queue</h2>
              </div>
              <span className="text-[10px] bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20 font-black">
                {stats.jobs} ACTIVE
              </span>
            </div>
            <JobTable handleViewLog={handleViewLog} />
          </div>
        </div>
      </div>

      {/* --- RESULT TERMINAL MODAL --- */}
      <AnimatePresence>
        {isLogOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="bg-[#0b0e14] border border-white/10 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="bg-white/5 p-4 flex justify-between items-center border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={() => setIsLogOpen(false)} />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">Job_Output_Stream</span>
                <button onClick={() => setIsLogOpen(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>
              <div className="p-6 h-[500px] overflow-y-auto font-mono text-sm text-green-400">
                <pre className="whitespace-pre-wrap">{logContent}</pre>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MASTER SSH OVERLAY --- */}
      <AnimatePresence>
        {isTerminalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-[#0f172a]/95 backdrop-blur-xl p-4 md:p-10 flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-2xl text-blue-400 shadow-lg">
                  <TerminalIcon />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tighter uppercase">Root Shell Access</h2>
                  <p className="text-xs text-gray-500 font-mono">root@headnode:~# authenticated</p>
                </div>
              </div>
              <button onClick={() => setIsTerminalOpen(false)} className="p-3 hover:bg-white/10 rounded-full transition-colors"><X /></button>
            </div>

            <div className="flex-grow bg-black/60 border border-white/10 rounded-3xl p-8 font-mono text-sm shadow-2xl overflow-hidden flex flex-col">
              <div className="flex-grow overflow-y-auto space-y-2 text-gray-300">
                <p className="text-green-500">[System] Welcome to Rocky Linux 9.4 (Blue Onyx)</p>
                <p className="text-blue-400"># sinfo -N -l</p>
                <div className="grid grid-cols-5 text-[10px] text-gray-500 uppercase border-b border-white/5 pb-1">
                  <span>Node</span><span>State</span><span>CPUs</span><span>Memory</span><span>TmpDisk</span>
                </div>
                <div className="grid grid-cols-5 text-xs">
                  <span>node01</span><span className="text-green-500">idle</span><span>2</span><span>4096</span><span>20000</span>
                </div>
                <div className="grid grid-cols-5 text-xs">
                  <span>node02</span><span className="text-green-500">idle</span><span>2</span><span>4096</span><span>20000</span>
                </div>
                <p className="mt-8 text-blue-400"># _</p>
              </div>
              <input
                autoFocus
                className="bg-transparent border-t border-white/5 pt-4 outline-none w-full text-white placeholder:text-gray-700"
                placeholder="Execute Slurm command (e.g. scontrol show partition)..."
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}