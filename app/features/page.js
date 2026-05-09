'use client';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Layout, Activity, ShieldCheck, Zap, ArrowRight, Share2 } from 'lucide-react';
import Link from 'next/link';
import { diagonalTilt } from '@/utils/animations';
export default function Features() {
  const features = [
    {
      title: "Web-based Job Submission",
      desc: "Users can upload scripts and binaries directly through the browser without needing SSH or Command Line knowledge.",
      icon: <Terminal className="w-6 h-6 text-blue-400" />,
      glow: "group-hover:shadow-[0_0_40px_-5px_rgba(59,130,246,0.3)]",
      iconBg: "bg-blue-500/10"
    },
    {
      title: "SLURM Integration",
      desc: "Full compatibility with the SLURM workload manager for efficient task distribution across compute nodes.",
      icon: <Cpu className="w-6 h-6 text-emerald-400" />,
      glow: "group-hover:shadow-[0_0_40px_-5px_rgba(16,185,129,0.3)]",
      iconBg: "bg-emerald-500/10"
    },
    {
      title: "Real-time Monitoring",
      desc: "Visualize CPU, Memory, and Disk usage of every node in the cluster using a simplified dashboard.",
      icon: <Activity className="w-6 h-6 text-rose-400" />,
      glow: "group-hover:shadow-[0_0_40px_-5px_rgba(244,63,94,0.3)]",
      iconBg: "bg-rose-500/10"
    },
    {
      title: "Node Management",
      desc: "Provision and de-provision nodes dynamically using Warewulf directly from the web interface.",
      icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
      glow: "group-hover:shadow-[0_0_40px_-5px_rgba(245,158,11,0.3)]",
      iconBg: "bg-amber-500/10"
    },
    {
      title: "One-Click Automation",
      desc: "Powered by Ansible playbooks to ensure consistent environment setup across the entire cluster fabric.",
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      glow: "group-hover:shadow-[0_0_40px_-5px_rgba(168,85,247,0.3)]",
      iconBg: "bg-purple-500/10"
    },
    {
      title: "Beginner-Friendly UI",
      desc: "A clean, intuitive interface designed for academic research, removing the steep learning curve of HPC.",
      icon: <Layout className="w-6 h-6 text-sky-400" />,
      glow: "group-hover:shadow-[0_0_40px_-5px_rgba(14,165,233,0.3)]",
      iconBg: "bg-sky-500/10"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-6 relative">
      
      {/* --- DIAGONAL ENTRANCE HEADING --- */}
      <div className="text-center mb-14 relative">
        <motion.div
          initial={{ x: -100, y: -50, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-green-500 font-mono text-xs tracking-[0.4em] uppercase mb-3 block">
            System Capabilities
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            SYSTEM <span className="text-transparent bg-clip-text bg-linear-to-br from-green-400 to-blue-600">FEATURES</span>
          </h1>
        </motion.div>
        
        {/* Subtle Architecture Link Icon */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 flex justify-center text-gray-600"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-px bg-linear-to-b from-green-500/50 to-transparent" />
            <Share2 size={20} className="animate-pulse" />
          </div>
        </motion.div>
      </div>

      {/* --- LINKED FEATURES GRID --- */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative"
      >
        {/* Background Visual "Link" Line (Only on Large Screens) */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -z-10 hidden lg:block" />

        {features.map((f, i) => (
          <motion.div 
            key={i} 
            variants={itemVariants}
            whileHover={{ y: -12 }}
            className={`group bg-white/5 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 transition-all duration-500 ${f.glow}`}
          >
            {/* Feature Connection "Port" */}
            <div className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-px bg-linear-to-r from-transparent via-green-500/50 to-transparent" />

            <div className={`w-14 h-14 ${f.iconBg} rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:rotate-360 transition-transform duration-700`}>
              {f.icon}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">
              {f.title}
            </h3>
            
            <p className="text-gray-500 text-sm leading-relaxed">
              {f.desc}
            </p>

            {/* Bottom "Link" indicator */}
            <div className="mt-8 flex items-center gap-2">
               <div className="h-1 w-8 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "0%" }}
                    transition={{ delay: 0.5 + (i * 0.1), duration: 0.8 }}
                    className="h-full bg-green-500/40"
                  />
               </div>
               <span className="text-[10px] font-mono text-gray-700 uppercase tracking-widest group-hover:text-green-500/50 transition-colors">Linked</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* --- CONNECTED CTA --- */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-24 p-10 md:p-16 rounded-[3rem] bg-white/2 border border-white/5 text-center relative overflow-hidden"
      >
      <motion.h2 
  className="text-3xl md:text-5xl font-bold text-white mb-6 italic cursor-pointer select-none"
  initial="initial"
  whileHover="hover"
  variants={{
    initial: { 
      rotate: 0, 
      x: 0, 
      y: 0,
      filter: "drop-shadow(0px 0px 0px rgba(74, 222, 128, 0))" 
    },
    hover: { 
      rotate: 3,       // Tilts the start UP and the end DOWN
      x: 0,             // Slight horizontal shift
      y: 0,            // Slight vertical shift
       // Changes to system green
      filter: "drop-shadow(0px 10px 20px rgba(74, 222, 128, 0.2))",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 15 
      }
    }
  }}
>
  Ready to Initialize?
</motion.h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-10 text-lg">
          The cluster is configured and ready for your workloads. Launch the session to start processing.
        </p>
        
       <Link 
  href="/dashboard/user" 
  className="inline-flex items-center gap-4 bg-green-600 text-white px-12 py-5 rounded-2xl font-black text-xl transition-all duration-300 hover:-translate-y-1 hover:bg-green-500 hover:shadow-[0_10px_25px_-5px_rgba(34,197,94,0.4)] group active:scale-[0.98]"
>
  Launch System Dashboard
  <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
</Link>
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-white/10 rounded-tl-[3rem]" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-white/10 rounded-br-[3rem]" />
      </motion.div>
    </div>
  );
}