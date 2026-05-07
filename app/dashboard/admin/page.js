"use client";

import { useState, useEffect } from 'react';
import JobTable from '@/components/jobs/JobTable';
import { Activity, Server, Cpu, Database } from 'lucide-react';

export default function AdminDashboard() {

  const [allJobs, setAllJobs] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [stats, setStats] = useState({
    nodes: "—",
    cpu: "—",
    memory: "—",
    jobs: "—"
  });

  // Admin: View any job log
  const handleViewLog = (jobId) => {
    console.log("Admin fetching logs for:", jobId);
    alert("Admin Viewing Output for Job #" + jobId);
  };

  // Fetch ALL jobs every 3s
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hpc/job-status');
        const result = await response.json();
        if (result.status === 'success') {
          setAllJobs(result.data);
        }
      } catch (err) {
        console.error("Admin job fetch failed:", err);
      }
    };

    fetchAllJobs();
    const interval = setInterval(fetchAllJobs, 3000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Cluster Stats & Master Status every 5s
  useEffect(() => {
    const controller = new AbortController();

    const fetchAllData = async () => {
      try {
        const statusRes = await fetch('http://localhost:5000/api/hpc/master-status', { signal: controller.signal });
        if (!statusRes.ok) throw new Error("Server Response Error");

        const statusData = await statusRes.json();
        setIsOnline(statusData.online === true);
        setConnectionError(false);

        if (statusData.online === true) {
          const statsRes = await fetch('http://localhost:5000/api/hpc/stats', { signal: controller.signal });
          if (statsRes.ok) {
            const statsData = await statsRes.json();
            setStats(statsData);
          }
        }
      } catch (err) {
        if (err.name === 'AbortError') return;
        setIsOnline(false);
        setConnectionError(true);
        setStats({ nodes: "OFFLINE", cpu: "—", memory: "—", jobs: "—" });
      }
    };

    fetchAllData();
    const interval = setInterval(fetchAllData, 5000);
    return () => {
      clearInterval(interval);
      controller.abort();
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* Header + Master Node Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Cluster Dashboard</h1>
          <p className="text-slate-500 font-medium">Monitoring SLURM Workload & Resource Allocation</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold border ${isOnline
            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
            : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></div>
            {isOnline ? 'Master Node Online' : 'Master Node Offline'}
          </div>
          <div className="text-slate-400 text-xs px-2 border-l border-slate-200">
            UET Mardan Network
          </div>
        </div>
      </div>

      {/* Connection Error */}
      {connectionError && (
        <div className="bg-red-600 text-white p-4 rounded-lg flex items-center justify-between animate-pulse">
          <div>
            <h3 className="font-bold">⚠️ Connection Lost!</h3>
            <p className="text-sm">The HPC Gateway is not responding. Please check your Rocky Linux server.</p>
          </div>
          <button onClick={() => window.location.reload()} className="bg-white text-red-600 px-3 py-1 rounded text-sm font-bold">
            Retry
          </button>
        </div>
      )}

      {/* Cluster Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Nodes", val: stats.nodes, icon: <Server   className="w-4 h-4 text-blue-600"    /> },
          { label: "CPU Usage",    val: stats.cpu,    icon: <Cpu      className="w-4 h-4 text-emerald-600" /> },
          { label: "Memory Load",  val: stats.memory, icon: <Database className="w-4 h-4 text-amber-600"   /> },
          { label: "Jobs Active",  val: stats.jobs,   icon: <Activity className="w-4 h-4 text-rose-600"    /> }
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-slate-50">{s.icon}</div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
            </div>
            <p className="text-3xl font-bold text-slate-900 mt-2 tracking-tight">{s.val}</p>
          </div>
        ))}
      </div>

      {/* All Users Jobs Table */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">All User Jobs</h2>
        <JobTable jobs={allJobs} handleViewLog={handleViewLog} />
      </div>

    </div>
  );
}