'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, User, Timer, CheckCircle2, XCircle, RefreshCw, Terminal, Cpu, Eye } from 'lucide-react';
import api from '@/utils/api'; 
import toast from 'react-hot-toast';

const JobTable = ({ handleViewLog }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchJobs = async () => {
        try {
            const res = await api.get('hpc/job-status');
            if (res.data.status === 'success') {
                setJobs(res.data.data);
            }
            setLoading(false);
        } catch (err) {
            console.error("Fetch jobs failed:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
        const interval = setInterval(fetchJobs, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleTerminate = async (jobId) => {
        if (window.confirm(`Confirm termination of high-priority Job #${jobId}?`)) {
            try {
                await api.delete(`hpc/terminate/${jobId}`);
                toast.success(`SIGTERM sent to Job #${jobId}`);
                fetchJobs(); 
            } catch (err) {
                toast.error("Termination protocol failed");
            }
        }
    };

    if (loading && jobs.length === 0) {
        return (
            <div className="p-20 text-center space-y-4">
                <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mx-auto opacity-50" />
                <p className="text-gray-500 font-mono text-xs tracking-widest uppercase">Initializing Queue Stream...</p>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col">
            <div className="overflow-x-auto overflow-y-hidden">
                <table className="w-full text-left border-separate border-spacing-y-2">
                    <thead>
                        <tr className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em]">
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Simulation / User</th>
                            <th className="px-6 py-4">Cluster Status</th>
                            <th className="px-6 py-4">Resources</th>
                            <th className="px-6 py-4 text-right">Operations</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        <AnimatePresence mode='popLayout'>
                            {jobs.length > 0 ? jobs.map((job, index) => {
                                const status = (job.state || job.status)?.toUpperCase();
                                const isRunning   = ['RUNNING', 'R'].includes(status);
                                const isQueued    = ['PENDING', 'PD', 'QUEUED', 'CG'].includes(status);
                                const isCompleted = ['COMPLETED', 'CD', 'COMPLETING'].includes(status);
                                const isFailed    = ['FAILED', 'F', 'TIMEOUT', 'TO', 'NODE_FAIL', 'NF', 'CANCELLED', 'CA'].includes(status);

                                return (
                                    <motion.tr 
                                        key={job.id}
                                        layout
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group bg-white/2 hover:bg-white/5 border border-white/5 transition-all duration-300 backdrop-blur-sm"
                                    >
                                        <td className="px-6 py-4 first:rounded-l-2xl border-y border-l border-white/5">
                                            <span className="font-mono text-xs font-bold text-blue-400">
                                                {job.id.toString().padStart(5, '0')}
                                            </span>
                                        </td>
                                        
                                        <td className="px-6 py-4 border-y border-white/5">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-white tracking-tight">{job.name}</span>
                                                <span className="text-[10px] text-gray-500 font-mono uppercase tracking-tighter">
                                                    {job.user || 'system_root'}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 border-y border-white/5">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black tracking-widest border transition-all duration-500 ${
                                                isRunning   ? 'bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]' :
                                                isQueued    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                isCompleted ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                isFailed    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                                'bg-white/5 text-gray-400 border-white/10'
                                            }`}>
                                                {isRunning && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />}
                                                {isRunning ? 'EXECUTING' : isQueued ? 'QUEUED' : isCompleted ? 'FINISHED' : isFailed ? 'TERMINATED' : status}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 border-y border-white/5">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
                                                    <Timer size={12} className="text-blue-500" /> {job.time}
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
                                                    <Cpu size={12} className="text-purple-500" /> {job.node || 'node-v1'}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 last:rounded-r-2xl border-y border-r border-white/5 text-right">
                                            {isCompleted ? (
                                                <button
                                                    onClick={() => handleViewLog(job.id)}
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white rounded-xl text-[10px] font-bold transition-all border border-blue-500/20"
                                                >
                                                    <Eye size={14} /> RESULT
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleTerminate(job.id)}
                                                    className="opacity-0 group-hover:opacity-100 inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white rounded-xl text-[10px] font-bold transition-all border border-rose-500/20"
                                                >
                                                    <XCircle size={14} /> ABORT
                                                </button>
                                            )}
                                        </td>
                                    </motion.tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3 opacity-20">
                                            <Terminal size={40} className="text-white" />
                                            <p className="text-sm font-mono text-white tracking-[0.3em] uppercase">No Data Packets Found</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JobTable;