export default function Team() {
  const members = [
    {
      name: "Barkat Ullah Khan",
      reg: "22MDSWE241",
      role: "Frontend Developer & System UI Designer",
      focus: "Next.js, Tailwind CSS, Dashboard Integration"
    },
    {
      name: "Muhammad Adnan",
      reg: "22MDSWE220",
      role: "HPC Infrastructure & Backend Engineer",
      focus: "SLURM Configuration, Node Management, Ansible"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-16 px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Project Team</h1>
        <p className="text-blue-600 font-semibold mt-2 uppercase tracking-widest text-sm">
          Department of Computer Software Engineering
        </p>
        <p className="text-slate-500">University of Engineering & Technology (UET) Mardan</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {members.map((m) => (
          <div key={m.reg} className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
              {m.name.charAt(0)}
            </div>
            <h3 className="text-xl font-bold text-slate-900">{m.name}</h3>
            <p className="text-blue-600 text-sm font-mono mb-4">{m.reg}</p>
            <div className="space-y-2">
              <p className="text-sm font-bold text-slate-700">{m.role}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{m.focus}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 text-white p-10 rounded-3xl text-center relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">Project Supervisor</p>
          <h2 className="text-3xl font-bold">Prof. Dr. Ibrar Ali Shah</h2>
          <p className="mt-2 text-slate-400">Chairman / Professor at UET Mardan</p>
        </div>
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
      </div>
    </div>
  );
}