export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 items-center text-center md:text-left">
        <div>
          <h3 className="font-bold text-slate-900">UET Mardan</h3>
          <p className="text-sm text-slate-500">Department of Computer Software Engineering</p>
        </div>
        
        <div className="text-center">
          <p className="text-sm font-bold text-slate-800 tracking-widest uppercase">FYP 2026</p>
          <div className="flex justify-center gap-4 mt-2 text-xs text-slate-400">
             <span>Barkat Ullah Khan</span>
             <span>•</span>
             <span>Muhammad Adnan</span>
          </div>
        </div>

        <div className="md:text-right">
          <p className="text-xs text-slate-400 italic">Project Supervisor</p>
          <p className="text-sm font-bold text-slate-700">Prof. Dr. Ibrar Ali Shah</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-slate-100 text-center">
        <p className="text-[10px] text-slate-400 uppercase tracking-widest">
          © {new Date().getFullYear()} High Performance Computing Management Portal
        </p>
      </div>
    </footer>
  );
}