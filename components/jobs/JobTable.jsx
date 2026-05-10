'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, CheckCircle2, XCircle, RefreshCw, Terminal, Cpu, Eye } from 'lucide-react';
import api from '@/utils/api';
import toast from 'react-hot-toast';

const JobTable = ({ handleViewLog }) => {
    const [jobs, setJobs] = useState([]);
    const [finishedJobs, setFinishedJobs] = useState([]); // Persistent History
    const [loading, setLoading] = useState(true);
    
    const prevJobsRef = useRef([]);

    const fetchJobs = async () => {
        try {
            const res = await api.get('hpc/job-status');
            if (res.data.status === 'success') {
                const liveJobs = res.data.data;

                // --- PERSISTENCE LOGIC ---
                // If a job was in prevJobs but is NOT in liveJobs, it finished!
                prevJobsRef.current.forEach(oldJob => {
                    if (!liveJobs.find(j => j.id === oldJob.id) && !finishedJobs.find(f => f.id === oldJob.id)) {
                        setFinishedJobs(prev => [{ ...oldJob, state: 'COMPLETED', time: 'Finished' }, ...prev].slice(0, 5));
                    }
                });

                setJobs(liveJobs);
                prevJobsRef.current = liveJobs;
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
        const interval = setInterval(fetchJobs, 3000); // Faster sync
        return () => clearInterval(interval);
    }, [finishedJobs]);

    const allRows = [...jobs, ...finishedJobs];

    return (
        <div className="w-full flex flex-col">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-2">
                    <thead>
                        <tr className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.2em]">
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Simulation</th>
                            <th className="px-6 py-4">Cluster Status</th>
                            <th className="px-6 py-4">Resources</th>
                            <th className="px-6 py-4 text-right">Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence mode='popLayout'>
                            {allRows.length > 0 ? allRows.map((job, index) => {
                                const status = (job.state || job.status)?.toUpperCase();
                                const isRunning = ['RUNNING', 'R'].includes(status);
                                const isCompleted = ['COMPLETED', 'CD', 'FINISHED'].includes(status);
                                const isQueued = ['PENDING', 'PD'].includes(status);

                                return (
                                    <motion.tr
                                        key={job.id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="bg-white/2 hover:bg-white/5 border border-white/5 backdrop-blur-sm"
                                    >
                                        <td className="px-6 py-4 rounded-l-2xl">
                                            <span className="font-mono text-xs font-bold text-blue-400">#{job.id}</span>
                                        </td>
                                        <td className="px-6 py-4 text-white font-bold text-sm">{job.name}</td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black border ${isRunning ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                isCompleted ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-white/5 text-amber-400 border-white/10'
                                                }`}>
                                                {isRunning && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />}
                                                {isRunning ? 'EXECUTING' : isCompleted ? 'SUCCESS' : 'QUEUED'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[10px] font-mono text-gray-400 flex items-center gap-2">
                                                <Cpu size={12} /> {job.node || 'Pending Allocation'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 rounded-r-2xl text-right">
                                            {isCompleted ? (
                                                <button
                                                    onClick={() => handleViewLog(job.id)}
                                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black tracking-widest transition-all cursor-pointer shadow-lg shadow-blue-500/20 flex items-center gap-2 active:scale-95"
                                                >
                                                    <Eye size={14} />
                                                    VIEW RESULT
                                                </button>
                                            ) : (
                                                <span className="text-[10px] text-gray-500 italic">Processing...</span>
                                            )}
                                        </td>
                                    </motion.tr>
                                );
                            }) : null}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JobTable;