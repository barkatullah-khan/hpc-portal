import { Server, Network, Shield, Cpu, Activity } from 'lucide-react';

export default function Architecture() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Cluster Architecture</h1>
        <p className="text-slate-500 mt-3 text-lg max-w-2xl mx-auto">
          Hardware Topology and Software Stack Integration for UET Mardan HPC.
        </p>
      </div>

      {/* Visual Diagram Section */}
      <div className="bg-white border-2 border-slate-100 rounded-4xl p-12 mb-16 shadow-xl flex flex-col items-center relative overflow-hidden">
        {/* Connection Background Line */}
        <div className="absolute top-0 bottom-0 w-1 bg-slate-100 left-1/2 -translate-x-1/2 -z-10 hidden md:block"></div>

        {/* Head Node Card */}
        <div className="w-full max-w-sm p-6 bg-[#1e293b] text-white rounded-2xl shadow-2xl border-4 border-blue-500/30 text-center mb-12 relative z-10">
          <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Server className="text-white w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Head Node (Master)</h3>
          <p className="text-blue-300 text-xs font-mono mt-1 tracking-widest uppercase">Controller & Scheduler</p>
          <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-2 gap-2 text-[10px] font-mono opacity-80 uppercase">
            
            <div>External: 192.168.1.x</div>
            <div>Internal: 10.0.0.1</div>
          </div>
        </div>

        {/* Network Switch Simulation */}
        <div className="w-full max-w-2xl h-8 bg-slate-800 rounded-full mb-12 flex justify-around px-12 items-center border-t-4 border-slate-700 shadow-inner">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#34d399]"></div>
          ))}
        </div>

        {/* Compute Nodes cluster */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full relative z-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-lg text-center hover:-translate-y-2 transition-transform duration-300 group">
              <div className="bg-slate-100 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-50 transition-colors">
                <Cpu className="text-slate-400 w-5 h-5 group-hover:text-blue-600" />
              </div>
              <h4 className="font-bold text-slate-800">Node-0{i}</h4>
              <p className="text-[10px] font-mono text-slate-400 mt-1">10.0.0.{10+i}</p>
              <div className="mt-3 flex space-x-1 justify-center">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full opacity-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Software Stack Description */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: <Shield className="w-5 h-5 text-blue-600"/>, title: "SLURM Scheduler", desc: "Handles job queuing and resource allocation across nodes." },
          { icon: <Network className="w-5 h-5 text-emerald-600"/>, title: "Warewulf v4", desc: "Stateless node provisioning and image management." },
          { icon: <Activity className="w-5 h-5 text-rose-600"/>, title: "Ansible", desc: "Configuration management and automated software setup." }
        ].map((item, idx) => (
          <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="mb-3">{item.icon}</div>
            <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}