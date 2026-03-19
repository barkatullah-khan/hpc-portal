import { Terminal, Cpu, Layout, Activity, ShieldCheck, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    {
      title: "Web-based Job Submission",
      desc: "Users can upload scripts and binaries directly through the browser without needing SSH or Command Line knowledge.",
      icon: <Terminal className="w-6 h-6 text-blue-600" />,
      color: "bg-blue-50"
    },
    {
      title: "SLURM Integration",
      desc: "Full compatibility with the SLURM workload manager for efficient task distribution across compute nodes.",
      icon: <Cpu className="w-6 h-6 text-emerald-600" />,
      color: "bg-emerald-50"
    },
    {
      title: "Real-time Monitoring",
      desc: "Visualize CPU, Memory, and Disk usage of every node in the cluster using a simplified dashboard.",
      icon: <Activity className="w-6 h-6 text-rose-600" />,
      color: "bg-rose-50"
    },
    {
      title: "Node Management",
      desc: "Provision and de-provision nodes dynamically using Warewulf directly from the web interface.",
      icon: <ShieldCheck className="w-6 h-6 text-amber-600" />,
      color: "bg-amber-50"
    },
    {
      title: "One-Click Automation",
      desc: "Powered by Ansible playbooks to ensure consistent environment setup across the entire cluster fabric.",
      icon: <Zap className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-50"
    },
    {
      title: "Beginner-Friendly UI",
      desc: "A clean, intuitive interface designed for academic research, removing the steep learning curve of HPC.",
      icon: <Layout className="w-6 h-6 text-sky-600" />,
      color: "bg-sky-50"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900">System Features</h1>
        <p className="text-slate-500 mt-3 text-lg max-w-2xl mx-auto">
          Our platform bridges the gap between high-performance hardware and researchers through these core capabilities.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              {f.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-20 p-8 bg-blue-600 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold">Ready to see it in action?</h2>
          <p className="opacity-80">Explore the simulated cluster management environment.</p>
        </div>
        <a href="/dashboard" className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg">
          Launch Dashboard
        </a>
      </div>
    </div>
  );
}