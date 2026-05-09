'use client';

import React, { useState } from 'react';
import { Play, Loader2, Cpu, Clock, Terminal } from 'lucide-react';
import api from '@/utils/api'; 
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const JobForm = () => {
  const [jobName, setJobName] = useState('');
  const [nodes, setNodes] = useState(1);
  const [timeLimit, setTimeLimit] = useState('1');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = { jobName, nodes, timeLimit };

    try {
      const response = await api.post('hpc/submit-job', payload);
      if (response.data.status === 'success') {
        toast.success("Job successfully dispatched to cluster!");
        setJobName(''); 
        setNodes(1);
        setTimeLimit('1');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to connect to Slurm backend";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = "w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm text-white placeholder:text-white/20 transition-all";
  const labelStyles = "flex items-center gap-2 text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-[0.2em]";

  return (
    <div className="space-y-6">
      <form onSubmit={handleJobSubmit} className="space-y-5">
        
        {/* JOB NAME INPUT */}
        <div>
          <label className={labelStyles}>
            <Terminal size={12} className="text-blue-400" /> Job Identifier
          </label>
          <input
            type="text"
            placeholder="Enter simulation name..."
            className={inputStyles}
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        {/* NODES & TIME GRID */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelStyles}>
              <Cpu size={12} className="text-blue-400" /> Compute Nodes
            </label>
            <input
              type="number"
              min="1"
              max="16"
              className={inputStyles}
              value={nodes}
              onChange={(e) => setNodes(parseInt(e.target.value))}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className={labelStyles}>
              <Clock size={12} className="text-blue-400" /> Wall Time
            </label>
            <div className="relative">
              <select
                className={`${inputStyles} appearance-none cursor-pointer`}
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
                disabled={isSubmitting}
              >
                <option value="1" className="bg-slate-900 text-white">1 Hour</option>
                <option value="12" className="bg-slate-900 text-white">12 Hours</option>
                <option value="24" className="bg-slate-900 text-white">24 Hours</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white/40">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full relative group overflow-hidden bg-blue-600 disabled:bg-white/10 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-[0_20px_40px_rgba(37,99,235,0.2)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.4)] flex items-center justify-center gap-3"
        >
          {/* Subtle button glare effect */}
          <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
          
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Allocating Resources...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              Execute on Cluster
            </>
          )}
        </motion.button>

        {/* CLUSTER FOOTNOTE */}
        <p className="text-[10px] text-center text-gray-500 font-mono">
          Priority Partition: <span className="text-blue-400">Standard-Compute</span>
        </p>
      </form>
    </div>
  );
};

export default JobForm;