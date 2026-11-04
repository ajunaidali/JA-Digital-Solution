import { FormEvent, useState } from 'react';
import { Check, LoaderCircle, Mail, MessageSquareText, PhoneCall, Send } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { contactDeliveryConfig } from '../config/contact';

type FormState = {
  fullName: string;
  email: string;
  companyName: string;
  service: string;
  budget: string;
  projectDescription: string;
};

const initialState: FormState = {
  fullName: '',
  email: '',
  companyName: '',
  service: 'Web Development',
  budget: '',
  projectDescription: '',
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!form.fullName.trim() || !form.email.trim() || !form.projectDescription.trim() || !form.service.trim()) {
      setStatus('error');
      setMessage('Please complete the required fields before submitting.');
      return;
    }

    setIsLoading(true);
    setStatus('idle');
    setMessage('');

    window.setTimeout(() => {
      setIsLoading(false);
      setStatus('success');
      setMessage('Your project inquiry is ready for live delivery setup. Add the required credentials in the environment variables to activate the form.');
      setForm(initialState);
    }, 900);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Contact"
        title="Tell us about your next digital project."
        description="Share a few details and we will review your goals, scope and the best next steps for your project."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-white">Project Intake</h3>
          <div className="mt-8 space-y-5 text-sm text-slate-300">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1127] p-3">
              <Mail className="text-cyan-300" size={18} />
              <span>Business email: add in local environment variables before connecting live delivery.</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1127] p-3">
              <PhoneCall className="text-cyan-300" size={18} />
              <span>WhatsApp: add your business number after configuring the live automation flow.</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1127] p-3">
              <MessageSquareText className="text-cyan-300" size={18} />
              <span>Instagram and LinkedIn links can be added in the same delivery setup file.</span>
            </div>
          </div>

          <div className="mt-8 rounded-[1.4rem] border border-cyan-400/25 bg-cyan-400/6 p-4 text-sm leading-7 text-cyan-100">
            <p className="font-medium">Delivery setup</p>
            <p className="mt-2">{contactDeliveryConfig.guidance}</p>
            <div className="mt-4 space-y-1">
              {Object.entries(contactDeliveryConfig.envKeys).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-slate-950/30 px-3 py-2">
                  <span className="text-xs uppercase tracking-[0.18em] text-slate-300">{key}</span>
                  <span className="text-xs text-cyan-200">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-200">
              <span>Full name *</span>
              <input value={form.fullName} onChange={(e) => handleChange('fullName', e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0b1127] px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-400" placeholder="Your name" />
            </label>

            <label className="space-y-2 text-sm text-slate-200">
              <span>Email *</span>
              <input value={form.email} onChange={(e) => handleChange('email', e.target.value)} type="email" className="w-full rounded-xl border border-white/10 bg-[#0b1127] px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-400" placeholder="you@example.com" />
            </label>

            <label className="space-y-2 text-sm text-slate-200">
              <span>Company name</span>
              <input value={form.companyName} onChange={(e) => handleChange('companyName', e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0b1127] px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-400" placeholder="Business name" />
            </label>

            <label className="space-y-2 text-sm text-slate-200">
              <span>Service *</span>
              <select value={form.service} onChange={(e) => handleChange('service', e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0b1127] px-4 py-3 text-white outline-none focus:border-cyan-400">
                <option>Web Development</option>
                <option>App Development</option>
                <option>Graphic Design & Branding</option>
                <option>Video Editing & Content Creation</option>
                <option>Digital Marketing</option>
              </select>
            </label>

            <label className="space-y-2 text-sm text-slate-200 md:col-span-2">
              <span>Project budget</span>
              <input value={form.budget} onChange={(e) => handleChange('budget', e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0b1127] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400" placeholder="Optional budget range" />
            </label>

            <label className="space-y-2 text-sm text-slate-200 md:col-span-2">
              <span>Project description *</span>
              <textarea value={form.projectDescription} onChange={(e) => handleChange('projectDescription', e.target.value)} className="min-h-[150px] w-full rounded-xl border border-white/10 bg-[#0b1127] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400" placeholder="Tell us about your goals, timeline and what you need from the project." />
            </label>
          </div>

          {message && (
            <div className={`mt-5 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${status === 'success' ? 'border-emerald-400/35 bg-emerald-400/10 text-emerald-200' : 'border-rose-400/35 bg-rose-400/10 text-rose-200'}`}>
              {status === 'success' ? <Check size={16} /> : <span className="text-base">!</span>}
              <span>{message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-medium text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? <><LoaderCircle className="animate-spin" size={18} /> Sending</> : <><Send size={18} /> Submit</>}
          </button>
        </form>
      </div>
    </div>
  );
}
