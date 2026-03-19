import { Mail, Github, MapPin, ExternalLink } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <div className="bg-white border border-slate-200 rounded-[2.5rem] p-12 shadow-2xl shadow-blue-100/50">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Get In Touch</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><Mail className="w-6 h-6"/></div>
              <div>
                <h4 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Email</h4>
                <p className="text-slate-600">fyp-hpc@uetmardan.edu.pk</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-slate-100 p-3 rounded-xl text-slate-600"><Github className="w-6 h-6"/></div>
              <div>
                <h4 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Repository</h4>
                <p className="text-slate-600 flex items-center gap-1 cursor-pointer hover:text-blue-600">
                   github.com/barkat-adnan/hpc-web <ExternalLink className="w-3 h-3"/>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-rose-100 p-3 rounded-xl text-rose-600"><MapPin className="w-6 h-6"/></div>
              <div>
                <h4 className="font-bold text-slate-800 uppercase text-xs tracking-widest">Location</h4>
                <p className="text-slate-600 leading-relaxed">
                  Department of Software Engineering,<br/>
                  UET Mardan, Khyber Pakhtunkhwa.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-4">Project Inquiry</h4>
            <p className="text-sm text-slate-500 mb-6">
              If you are a student or researcher wanting to use the cluster, please contact our supervisor Prof. Dr. Ibrar Ali Shah.
            </p>
            <div className="text-xs font-bold text-blue-700 bg-blue-50 p-4 rounded-xl border border-blue-100">
              UET Mardan internal network access required for cluster management portal.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}