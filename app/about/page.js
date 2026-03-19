export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">Project Overview</h1>
      <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-blue-700 mb-4">The Motivation</h2>
          <p>
            High-Performance Computing (HPC) is the backbone of modern research. However, the steep learning curve of the Linux command line often discourages students. Our project, developed at <strong>UET Mardan</strong>, simplifies this by providing a web-managed interface.
          </p>
        </section>

        <section className="bg-blue-600 p-8 rounded-3xl text-white shadow-xl shadow-blue-100">
          <h2 className="text-xl font-bold mb-4 text-blue-50">Key Advantage</h2>
          <p className="opacity-90 leading-relaxed">
            Unlike cloud-based solutions like AWS or Azure, our system is designed for <strong>On-Premise University Infrastructure</strong>. It operates without monthly cloud fees and keeps research data within the university network.
          </p>
        </section>
      </div>
    </div>
  );
}