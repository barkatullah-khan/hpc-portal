'use client';
import { motion } from 'framer-motion';
import { Server, Network, Shield, Cpu, Activity, Database, Share2 } from 'lucide-react';

export default function Architecture() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-6 relative">
      
      {/* --- HEADER --- */}
  <div className="text-center mb-20 overflow-hidden">
  <motion.h1 
    initial={{ opacity: 0, y: -100 }} // Increased distance for a more dramatic drop
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 1.8,            // Significantly slower (1.8 seconds)
      ease: [0.22, 1, 0.36, 1], // Cinematic "slow-down" easing
      opacity: { duration: 1.2 } // Fade in slightly faster than the movement
    }}
    className="text-5xl font-black text-white tracking-tight"
  >
    CLUSTER <span className="text-blue-500">TOPOLOGY</span>
  </motion.h1>
  
  <motion.p 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.2, duration: 1 }} // Appears after the heading starts moving
    className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto font-medium"
  >
    Hardware Hierarchy & Software Orchestration for the UET Mardan Supercomputing Unit.
  </motion.p>
</div>

      {/* --- VISUAL DIAGRAM SECTION --- */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 mb-20 relative overflow-hidden shadow-2xl"
      >
        {/* ANIMATED DATA PATHS (SVG Background) */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <svg width="100%" height="100%">
            <motion.path
              d="M 50% 150 L 50% 400"
              stroke="#3b82f6"
              strokeWidth="2"
              fill="none"
              strokeDasharray="10 10"
              animate={{ strokeDashoffset: [-100, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>

        {/* 1. HEAD NODE (Master Controller) */}
        <motion.div 
          variants={nodeVariants}
          className="relative z-10 w-full max-w-sm mx-auto p-8 bg-linear-to-b from-slate-800 to-slate-900 text-white rounded-3xl shadow-2xl border border-blue-500/50 text-center mb-16"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 rounded-full text-[10px] font-bold tracking-widest uppercase">
            Master Node
          </div>
          <div className="bg-blue-600/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
            <Server className="text-blue-400 w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-2">HPC-MASTER</h3>
          <p className="text-blue-300 text-xs font-mono tracking-widest uppercase opacity-70">Slurm Scheduler & Management</p>
          
          <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-[10px] font-mono text-gray-400">
            <div className="bg-black/30 p-2 rounded-lg">EXT: 192.168.1.10</div>
            <div className="bg-black/30 p-2 rounded-lg">INT: 10.0.0.1</div>
          </div>
        </motion.div>

        {/* 2. NETWORK FABRIC (The Switch) */}
        <div className="relative z-10 w-full max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center mb-2 gap-2 text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em]">
             <Share2 size={12}/> GigE Backbone Switch
          </div>
          <div className="h-10 bg-black/60 rounded-xl flex justify-around px-8 items-center border border-white/10 shadow-[0_0_30px_rgba(52,211,153,0.1)]">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <div className="w-1 h-3 bg-white/5 mx-auto rounded-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. COMPUTE NODES CLUSTER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full relative z-10">
          {[1, 2, 3, 4].map((i) => (
            <motion.div 
              key={i} 
              variants={nodeVariants}
              whileHover={{ y: -10, borderColor: 'rgba(59, 130, 246, 0.5)' }}
              className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center transition-all group"
            >
              <div className="bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600/20 transition-colors">
                <Cpu className="text-gray-400 w-6 h-6 group-hover:text-blue-400" />
              </div>
              <h4 className="font-bold text-white">Compute-0{i}</h4>
              <p className="text-[10px] font-mono text-blue-400 mt-1 opacity-60">10.0.0.{10+i}</p>
              
              <div className="mt-4 flex flex-col gap-1">
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: ["20%", "80%", "40%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="h-full bg-blue-500"
                  />
                </div>
                <span className="text-[8px] text-gray-500 uppercase tracking-tighter">Load Activity</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* --- SOFTWARE STACK LAYER --- */}
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: <Shield className="text-blue-400"/>, title: "SLURM Workload", desc: "Enterprise-grade job scheduling and resource management." },
          { icon: <Database className="text-emerald-400"/>, title: "Warewulf v4", desc: "Stateless provisioning for high-speed node deployment." },
          { icon: <Activity className="text-rose-400"/>, title: "Prometheus", desc: "Real-time telemetry and cluster health monitoring." }
        ].map((item, idx) => (
          <motion.div 
            key={idx} 
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all"
          >
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">
              {item.icon}
            </div>
            <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}