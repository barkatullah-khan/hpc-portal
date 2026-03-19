import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
      <h1 className="text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
        Web Managed <span className="text-blue-600">HPC Cluster</span>
      </h1>
      <p className="max-w-2xl text-lg text-slate-600 mb-10">
        A simplified high-performance computing management interface designed for 
        UET Mardan researchers and students.
      </p>
      <div className="flex gap-4">
        <Link href="/dashboard" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-blue-700 transition-all">
          Launch Dashboard
        </Link>
        <Link href="/about" className="bg-white border border-slate-200 text-slate-700 px-8 py-3 rounded-lg font-bold hover:bg-slate-50 transition-all">
          Learn More
        </Link>
      </div>
    </div>
  );
}