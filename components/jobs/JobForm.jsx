'use client';

import React, { useState, useEffect } from 'react';
import { Play, Loader2, Cpu, Clock, Terminal, AlertTriangle } from 'lucide-react';
import api from '@/utils/api'; 
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

// We pass idleNodes from the Dashboard to the form
const JobForm = ({ idleNodes = 2 }) => {
  const [jobName, setJobName] = useState('');
  const [nodes, setNodes] = useState(1);
  const [timeLimit, setTimeLimit] = useState('1');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isOverLimit = nodes > idleNodes;

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    if (isOverLimit) {
      toast.error(`Resource Limit Exceeded: Only ${idleNodes} nodes currently available.`);
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await api.post('hpc/submit-job', { jobName, nodes, timeLimit });
      if (response.data.status === 'success') {
        toast.success("Simulation dispatched to cluster headnode.");
        setJobName(''); 
        setNodes(1);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Slurm Controller Offline");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = "w-full p-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm text-white transition-all";
  const labelStyles = "flex items-center gap-2 text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-widest";

  return (
    <div className="space-y-6">
      <form onSubmit={handleJobSubmit} className="space-y-5">
        <div>
          <label className={labelStyles}><Terminal size={12} className="text-blue-400" /> Job Identifier</label>
          <input
            type="text"
            placeholder="Simulation ID..."
            className={inputStyles}
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelStyles}>
              <Cpu size={12} className={isOverLimit ? "text-amber-400" : "text-blue-400"} /> 
              Nodes ({idleNodes} Max)
            </label>
            <input
              type="number"
              min="1"
              max="16"
              className={`${inputStyles} ${isOverLimit ? 'border-amber-500/50 text-amber-200' : ''}`}
              value={nodes}
              onChange={(e) => setNodes(parseInt(e.target.value))}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className={labelStyles}><Clock size={12} className="text-blue-400" /> Wall Time</label>
            <select className={`${inputStyles} appearance-none cursor-pointer`} value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)}>
              <option value="1" className="bg-slate-900">1 Hour</option>
              <option value="12" className="bg-slate-900">12 Hours</option>
              <option value="24" className="bg-slate-900">24 Hours</option>
            </select>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting || isOverLimit}
          className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
            isOverLimit ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30 cursor-not-allowed' : 'bg-blue-600 text-white'
          }`}
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : isOverLimit ? <AlertTriangle size={16} /> : <Play size={14} fill="currentColor" />}
          {isSubmitting ? "Allocating..." : isOverLimit ? "Insufficient Nodes" : "Execute on Cluster"}
        </motion.button>
      </form>
    </div>
  );
};

export default JobForm;