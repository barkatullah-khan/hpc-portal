import React, { useState } from 'react';
import { Play } from 'lucide-react';

const JobForm = () => {
  // Define the local states for the form inputs
  const [jobName, setJobName] = useState('');
  const [nodes, setNodes] = useState(1);
  const [timeLimit, setTimeLimit] = useState('1');

  const handleJobSubmit = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    
   
   
    const payload = { jobName, nodes, timeLimit };
    console.log("Submitting Payload to Backend:", payload);

    try {
      const response = await fetch('http://localhost:5000/api/hpc/submit-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Job submitted successfully!");
        setJobName(''); // Clear form after success
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to connect to Slurm backend");
    }
  };

  return (
    <div className="lg:col-span-1 space-y-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Play className="w-5 h-5 text-blue-600 fill-current" /> Quick Job Submit
        </h3>

        <form onSubmit={handleJobSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Job Name</label>
            <input
              type="text"
              placeholder="simulation_v1"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Nodes</label>
              <input
                type="number"
                min="1"
                max="2"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                value={nodes}
                onChange={(e) => setNodes(parseInt(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Time Limit</label>
              <select
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm appearance-none cursor-pointer"
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
              >
                <option value="1">1 Hour</option>
                <option value="12">12 Hours</option>
                <option value="24">24 Hours</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 mt-4 active:scale-95"
          >
            Submit to SLURM
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobForm;