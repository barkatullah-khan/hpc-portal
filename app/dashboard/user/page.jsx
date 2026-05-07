"use client";

import { useState, useEffect } from 'react';
import JobForm from '@/components/jobs/JobForm';
import JobTable from '@/components/jobs/JobTable';

export default function UserDashboard() {

  const [activeJobs, setActiveJobs] = useState([]);
  const [connectionError, setConnectionError] = useState(false);

  // View Log
  const handleViewLog = (jobId) => {
    console.log("Fetching logs for:", jobId);
    alert("Viewing Output for Job #" + jobId);
  };

  // Fetch User Jobs every 3s
  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hpc/job-status');
        const result = await response.json();
        if (result.status === 'success') {
          console.log('🔍 Job data:', result.data); // ← ADD THIS
          setActiveJobs(result.data);
          setConnectionError(false);
        }
      } catch (err) {
        console.error("Queue fetch failed:", err);
        setConnectionError(true);
      }
    };

    fetchQueue();
    const interval = setInterval(fetchQueue, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">My Workspace</h1>
        <p className="text-slate-500 font-medium">Submit & Monitor Your HPC Jobs</p>
      </div>

      {/* Connection Error */}
      {connectionError && (
        <div className="bg-red-600 text-white p-4 rounded-lg flex items-center justify-between animate-pulse">
          <div>
            <h3 className="font-bold">⚠️ Connection Lost!</h3>
            <p className="text-sm">The HPC Gateway is not responding.</p>
          </div>
          <button onClick={() => window.location.reload()} className="bg-white text-red-600 px-3 py-1 rounded text-sm font-bold">
            Retry
          </button>
        </div>
      )}

      {/* Job Form + Job Table */}
      <div className="grid lg:grid-cols-3 gap-8">
        <JobForm />
        <JobTable jobs={activeJobs} handleViewLog={handleViewLog} />
      </div>

    </div>
  );
}