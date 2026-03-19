import { Activity, Server, Cpu, Database, Play, Clock, User, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const jobs = [
    { id: "2026-01", name: "Genome_Seq", user: "barkat_u", status: "Running", nodes: 2, time: "01:22:10" },
    { id: "2026-02", name: "CFD_Sim_A1", user: "adnan_m", status: "Queued", nodes: 4, time: "00:00:00" },
    { id: "2026-00", name: "ML_Train_04", user: "research_01", status: "Completed", nodes: 1, time: "14:45:12" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Cluster Dashboard</h1>
          <p className="text-slate-500 font-medium">Monitoring SLURM Workload & Resource Allocation</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-100">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            Master Node Online
          </div>
          <div className="text-slate-400 text-xs px-2 border-l border-slate-200">
            UET Mardan Network
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Nodes", val: "04 / 04", icon: <Server className="w-4 h-4 text-blue-600"/> },
          { label: "CPU Usage", val: "42.8%", icon: <Cpu className="w-4 h-4 text-emerald-600"/> },
          { label: "Memory Load", val: "12.4 GB", icon: <Database className="w-4 h-4 text-amber-600"/> },
          { label: "Jobs Active", val: "02", icon: <Activity className="w-4 h-4 text-rose-600"/> }
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

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Job Submission Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Play className="w-5 h-5 text-blue-600 fill-current"/> Quick Job Submit
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Job Name</label>
                <input type="text" placeholder="simulation_v1" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Nodes</label>
                  <input type="number" defaultValue="1" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Time Limit</label>
                  <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm appearance-none cursor-pointer">
                    <option>1 Hour</option>
                    <option>24 Hours</option>
                  </select>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 mt-4 active:scale-95">
                Submit to SLURM
              </button>
            </div>
          </div>
        </div>

        {/* Job Queue Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600"/> Active Job Queue
            </h3>
            <span className="text-xs font-bold text-slate-400">Total: 3 Jobs Found</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-500 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100">
                  <th className="px-6 py-4">Job ID</th>
                  <th className="px-6 py-4 font-medium flex items-center gap-2"><User className="w-3 h-3"/> User</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Run Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-5 font-mono text-sm font-bold text-blue-700">{job.id}</td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-semibold text-slate-800">{job.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono italic">{job.user}</p>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${
                        job.status === 'Running' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                        job.status === 'Queued' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                        'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {job.status === 'Completed' && <CheckCircle2 className="w-3 h-3"/>}
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-mono text-xs text-slate-500">{job.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}