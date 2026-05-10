"use client";
import toast, { Toaster } from 'react-hot-toast';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Added AnimatePresence for smoother modal
import api from '@/utils/api'; // <--- FIX 1: Import your custom api instance
import { Activity, Cpu, Info, ListChecks } from 'lucide-react';
import JobForm from '@/components/jobs/JobForm';
import JobTable from '@/components/jobs/JobTable';
import { diagonalTilt } from '@/utils/animations';

export default function UserDashboard() {
  const [availableNodes, setAvailableNodes] = useState(0);
  const [activeJobsCount, setActiveJobsCount] = useState(0);
  const [logContent, setLogContent] = useState(null);
  const [isLogOpen, setIsLogOpen] = useState(false);

  useEffect(() => {
    const fetchUserContext = async () => {
      try {
        // Use 'api' instead of axios to maintain consistency
        const response = await api.get('/hpc/stats'); 
        const data = response.data.data || response.data;

        const idle = parseInt(data.nodes?.split('/')[0]) || 0;
        setAvailableNodes(idle);
        setActiveJobsCount(data.jobs || 0);
      } catch (err) {
        console.error("User Context Sync Error:", err.message);
      }
    };

    fetchUserContext();
    const interval = setInterval(fetchUserContext, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleViewLog = async (jobId) => {
    const toastId = toast.loading("Fetching execution logs...");
    try {
      // FIX 1: This now uses the imported 'api'
      const res = await api.get(`/hpc/job-logs/${jobId}`); 
      setLogContent(res.data.output);
      setIsLogOpen(true);
      toast.success("Logs retrieved", { id: toastId });
    } catch (err) {
      toast.error("Log file not found yet.", { id: toastId });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto p-4 md:p-8 space-y-8"
    >
      {/* FIX 2: Add the Toaster component so notifications actually show up */}
      <Toaster position="top-right" reverseOrder={false} />

      <header className="flex flex-col md:flex-row justify-between items-end pb-6 border-b border-white/5">
        <div>
          <motion.h1
            variants={diagonalTilt}
            initial="initial"
            whileHover="hover"
            className="text-4xl font-black text-white tracking-tighter uppercase"
          >
            Job <span className="text-blue-500">Controller</span>
          </motion.h1>
          <p className="text-gray-500 font-mono text-[10px] mt-1 tracking-widest uppercase">
            UET Mardan Cluster / Slurm Workload Manager
          </p>
        </div>

        <div className="flex gap-4">
          <div className="text-right border-r border-white/10 pr-4">
            <p className="text-[10px] text-gray-500 uppercase font-bold">Idle Resources</p>
            <p className="text-lg font-mono text-green-400 font-bold">{availableNodes} Nodes</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-500 uppercase font-bold">In Queue</p>
            <p className="text-lg font-mono text-blue-400 font-bold">{activeJobsCount} Jobs</p>
          </div>
        </div>
      </header>

      <div className="grid xl:grid-cols-12 gap-8">
        <div className="xl:col-span-4">
          <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-[2rem] border border-white/10 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Cpu size={18} className="text-blue-400" />
              </div>
              <h2 className="text-lg font-bold text-white uppercase tracking-tight">New Simulation</h2>
            </div>
            <JobForm idleNodes={availableNodes} />
          </div>
        </div>

        <div className="xl:col-span-8 bg-white/5 backdrop-blur-3xl p-8 rounded-[2rem] border border-white/10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <ListChecks size={18} className="text-green-400" />
              </div>
              <h2 className="text-lg font-bold text-white uppercase tracking-tight">My Executions</h2>
            </div>
          </div>
          <JobTable handleViewLog={handleViewLog} />
        </div>
      </div>

      {/* Terminal Modal wrapped in AnimatePresence for smooth exit */}
      <AnimatePresence>
        {isLogOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0b0e14] border border-white/10 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="bg-white/5 p-4 flex justify-between items-center border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-400" onClick={() => setIsLogOpen(false)} />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs font-mono text-gray-400">slurm_output.log</span>
                <button onClick={() => setIsLogOpen(false)} className="text-gray-400 hover:text-white transition-colors">✕</button>
              </div>

              <div className="p-6 h-[500px] overflow-y-auto font-mono text-sm text-green-400 custom-scrollbar">
                <pre className="whitespace-pre-wrap">{logContent || "No output available..."}</pre>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}