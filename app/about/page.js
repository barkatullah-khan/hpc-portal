'use client';
import { motion } from 'framer-motion';
import { Rocket, ShieldCheck, Cpu, Globe } from 'lucide-react';

export default function About() {
  // Animation variants for the "Staggered" look
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-20 px-6">
      {/* Page Title */}
      <motion.div 
  initial={{ opacity: 0, x: -150 }} // Increased distance for a more dramatic entrance
  animate={{ opacity: 1, x: 0 }}
  transition={{ 
    duration: 1.6,             // Slow-motion effect (1.6 seconds)
    ease: [0.22, 1, 0.36, 1],  // Smooth "Quintic" deceleration
    opacity: { duration: 1.2 }  // Fade in slightly faster than the slide
  }}
  className="mb-12"
>
  <h1 className="text-5xl font-black text-white tracking-tighter cursor-default">
    PROJECT <span className="text-green-500">OVERVIEW</span>
  </h1>
  
  {/* The Green Line also follows the animation naturally as a child */}
  <motion.div 
    initial={{ width: 0 }}
    animate={{ width: 80 }} // Matches your w-20
    transition={{ delay: 0.8, duration: 1.5 }} // Line grows slowly after heading starts
    className="h-1 bg-green-500 mt-2 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]" 
  />
</motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-8"
      >
        {/* Section 1: Motivation */}
        <motion.section 
          variants={itemVariants}
          className="bg-white/5 backdrop-blur-md p-8 rounded-4xl border border-white/10 hover:border-green-500/50 transition-colors group"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-green-500/10 rounded-2xl text-green-500 group-hover:scale-110 transition-transform">
              <Rocket size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white">The Motivation</h2>
          </div>
          <p className="text-gray-400 text-lg leading-relaxed">
            High-Performance Computing (HPC) is the backbone of modern research. However, the steep learning curve of the Linux command line often discourages students. Our project, developed at <strong className="text-white">UET Mardan</strong>, simplifies this by providing a web-managed interface that bridges the gap between complex hardware and user-friendly accessibility.
          </p>
        </motion.section>

        {/* Section 2: Key Advantage (Modified Box) */}
        <motion.section 
          variants={itemVariants}
          className="relative overflow-hidden bg-linear-to-br from-green-600/20 to-blue-600/20 backdrop-blur-md p-8 rounded-4xl border border-white/10 shadow-2xl shadow-black/20"
        >
          {/* Subtle decorative circle */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-500/10 rounded-full blur-3xl" />
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-white/10 rounded-2xl text-white">
              <ShieldCheck size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white">Institutional Advantage</h2>
          </div>
          <p className="text-gray-200 text-lg leading-relaxed relative z-10">
            Unlike cloud-based solutions like AWS or Azure, our system is custom-built for <strong className="text-white underline decoration-green-500 underline-offset-4">On-Premise University Infrastructure</strong>. This ensures zero monthly subscription costs, full data sovereignty, and ultra-low latency within the campus network.
          </p>
        </motion.section>

        {/* Section 3: Extra Info (System Specs/HPC focus) */}
        <motion.div 
          variants={itemVariants}
          className="grid md:grid-cols-2 gap-6"
        >
          <div className="bg-white/5 p-6 rounded-3xl border border-white/5 flex gap-4 items-start">
             <Cpu className="text-green-500 shrink-0" />
             <div>
                <h4 className="text-white font-bold mb-1">Slurm Integration</h4>
                <p className="text-sm text-gray-500">Optimized job scheduling for maximum resource utilization.</p>
             </div>
          </div>
          <div className="bg-white/5 p-6 rounded-3xl border border-white/5 flex gap-4 items-start">
             <Globe className="text-blue-500 shrink-0" />
             <div>
                <h4 className="text-white font-bold mb-1">Web-Base Access</h4>
                <p className="text-sm text-gray-500">Monitor your simulations from anywhere on the UET network.</p>
             </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}