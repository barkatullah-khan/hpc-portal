"use client";

import { useState, useEffect } from 'react';
import JobTable from '@/components/jobs/JobTable';
import api from '@/utils/api'; // 👈 Use our Axios instance
import { Activity, Server, Cpu, Database } from 'lucide-react';

export default function AdminDashboard() {
  const [isOnline, setIsOnline] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const [stats, setStats] = useState({
    nodes: "—",
    cpu: "—",
    memory: "—",
    jobs: "—"
  });

  // Admin Log View
  const handleViewLog = (jobId) => {
    alert("Admin Viewing Output for Job #" + jobId);
  };

  // Fetch Cluster Stats & Master Status
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Use our 'api' instance to ensure Cookies are sent!
        const statusRes = await api.get('hpc/master-status');
        
        setIsOnline(statusRes.data.online === true);
        setConnectionError(false);

        if (statusRes.data.online === true) {
          const statsRes = await api.get('hpc/stats');
          setStats(statsRes.data);
        }
      } catch (err) {
        setIsOnline(false);
        setConnectionError(true);
        setStats({ nodes: "OFFLINE", cpu: "—", memory: "—", jobs: "—" });
      }
    };

    fetchAllData();
    const interval = setInterval(fetchAllData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Cluster Dashboard</h1>
          <p className="text-slate-500 font-medium">UET Mardan SLURM Monitoring</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold border ${
          isOnline ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'
        }`}>
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></div>
          {isOnline ? 'Master Node Online' : 'Master Node Offline'}
        </div>
      </div>

      {/* 2. Connection Error Alert */}
      {connectionError && (
        <div className="bg-red-600 text-white p-4 rounded-lg flex items-center justify-between">
          <p className="font-bold">⚠️ Connection Lost! Check Rocky Linux server.</p>
          <button onClick={() => window.location.reload()} className="bg-white text-red-600 px-3 py-1 rounded text-sm">Retry</button>
        </div>
      )}

      {/* 3. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Nodes", val: stats.nodes, icon: <Server className="w-4 h-4 text-blue-600" /> },
          { label: "CPU Usage", val: stats.cpu, icon: <Cpu className="w-4 h-4 text-emerald-600" /> },
          { label: "Memory Load", val: stats.memory, icon: <Database className="w-4 h-4 text-amber-600" /> },
          { label: "Jobs Active", val: stats.jobs, icon: <Activity className="w-4 h-4 text-rose-600" /> }
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-slate-50">{s.icon}</div>
              <p className="text-xs font-bold text-slate-500 uppercase">{s.label}</p>
            </div>
            <p className="text-3xl font-bold text-slate-900">{s.val}</p>
          </div>
        ))}
      </div>

      {/* 4. The Smart Job Table */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Live Job Queue</h2>
        {/* Notice: We don't pass 'jobs' here anymore. The component will fetch them! */}
        <JobTable handleViewLog={handleViewLog} />
      </div>

    </div>
  );
}