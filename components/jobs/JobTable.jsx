import React from 'react';
import { Clock, User, Timer, CheckCircle2, XCircle } from 'lucide-react';

const JobTable = ({ jobs, handleViewLog, onTerminateJob }) => {

    // Helper function to handle Terminate clicks
    const handleTerminate = (jobId) => {
        if (window.confirm(`Are you sure you want to terminate Job #${jobId}?`)) {
            onTerminateJob(jobId);
        }
    };

    return (
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            {/* HEADER */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
                <div className="flex items-center gap-4">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-600" /> Active Job Queue
                    </h3>
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-600 border border-emerald-100 animate-pulse">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        Live Sync Active
                    </span>
                </div>
                <span className="text-xs font-bold text-slate-400">
                    Total: {jobs ? jobs.length : 0} Jobs Found
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 text-slate-500 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100">
                            <th className="px-6 py-4">Job ID</th>
                            <th className="px-6 py-4"><div className="flex items-center gap-2"><User className="w-3 h-3" /> User/Job</div></th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Execution</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {jobs && jobs.length > 0 ? jobs.map((job) => {

                            // ─── STATUS NORMALIZATION ──────────────────────
                            const status = (job.state || job.status)?.toUpperCase();
                            const isRunning   = ['RUNNING', 'R'].includes(status);
                            const isQueued    = ['PENDING', 'PD', 'QUEUED', 'CG'].includes(status);
                            const isCompleted = ['COMPLETED', 'CD', 'COMPLETING'].includes(status);
                            const isFailed    = ['FAILED', 'F', 'TIMEOUT', 'TO', 'NODE_FAIL', 'NF', 'CANCELLED', 'CA'].includes(status);

                            return (
                                <tr key={job.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="px-6 py-5 font-mono text-sm font-bold text-blue-700">#{job.id}</td>
                                    <td className="px-6 py-5">
                                        <p className="text-sm font-semibold text-slate-800">{job.name}</p>
                                        <p className="text-[10px] text-slate-400 font-mono italic">{job.user || 'barkat_u'}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${
                                            isRunning   ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                            isQueued    ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                            isCompleted ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                            isFailed    ? 'bg-rose-50 text-rose-700 border-rose-100' :
                                                          'bg-slate-100 text-slate-600 border-slate-200'
                                        }`}>
                                            {isRunning   ? '● Running'   :
                                             isQueued    ? '◷ Queued'    :
                                             isCompleted ? '✓ Completed' :
                                             isFailed    ? '✕ Failed'    :
                                             job.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-mono text-xs text-slate-600 flex items-center gap-1">
                                                <Timer className="w-3 h-3 text-slate-400" /> {job.time}
                                            </span>
                                            <span className="text-[10px] font-medium text-blue-600 bg-blue-50 w-fit px-1 rounded">
                                                {job.node || 'node[01]'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        {isCompleted ? (
                                            <button
                                                onClick={() => handleViewLog(job.id)}
                                                className="text-xs font-bold text-blue-600 hover:text-blue-800 underline underline-offset-4"
                                            >
                                                View Output
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleTerminate(job.id)}
                                                className="opacity-0 group-hover:opacity-100 flex items-center gap-1 ml-auto text-[10px] font-bold text-rose-500 hover:text-rose-700 transition-all"
                                            >
                                                <XCircle className="w-3 h-3" /> Terminate
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        }) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-10 text-center text-slate-400 italic text-sm">
                                    No active jobs in queue.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JobTable;