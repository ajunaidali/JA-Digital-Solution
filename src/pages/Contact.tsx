import { useState } from 'react';
import type { FormEvent } from 'react';
import { Check, LoaderCircle, Mail, MessageSquareText, Send } from 'lucide-react';
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.fullName.trim() || !form.email.trim() || !form.projectDescription.trim() || !form.service.trim()) {
      setStatus('error');
      setMessage('Please complete the required fields before submitting.');
      return;
    }

    setStatus('idle');
    setMessage('');

    if (contactDeliveryConfig.endpoint) {
      setIsLoading(true);
      try {
        const response = await fetch(contactDeliveryConfig.endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!response.ok) throw new Error(`Contact endpoint returned ${response.status}.`);
        setStatus('success');
        setMessage('Thanks for reaching out. Your project inquiry has been sent.');
        setForm(initialState);
      } catch (error) {
        console.error('Unable to deliver the project inquiry.', error);
        setStatus('error');
        setMessage(`We could not send your inquiry. Please try again${contactDeliveryConfig.email ? ' or email us directly.' : '.'}`);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (contactDeliveryConfig.email) {
      const subject = encodeURIComponent(`Project inquiry: ${form.service}`);
      const body = encodeURIComponent([
        `Name: ${form.fullName}`,
        `Email: ${form.email}`,
        `Company: ${form.companyName || 'Not provided'}`,
        `Service: ${form.service}`,
        `Budget: ${form.budget || 'Not provided'}`,
        '',
        form.projectDescription,
      ].join('\n'));
      window.location.assign(`mailto:${contactDeliveryConfig.email}?subject=${subject}&body=${body}`);
      setStatus('success');
      setMessage('Your email draft is ready. Review it in your mail app and send it to deliver your inquiry.');
      return;
    }

    setStatus('error');
    setMessage('Form delivery is not configured yet. Please ask the site owner to set VITE_FORMSPREE_ENDPOINT or VITE_CONTACT_EMAIL.');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8">
      <SectionTitle
        headingLevel={1}
        eyebrow="Contact"
        title="Tell us about your next digital project."
        description="Share a few details and we will review your goals, scope and the best next steps for your project."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h3 className="text-2xl font-semibold text-white">Start a conversation</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">Tell us what you are building, what you need, and how to reach you.</p>
          <div className="mt-8 space-y-5 text-sm text-slate-300">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1127] p-3">
              <Mail className="text-cyan-300" size={18} />
              {contactDeliveryConfig.email
                ? <a href={`mailto:${contactDeliveryConfig.email}`} className="break-all hover:text-cyan-200">{contactDeliveryConfig.email}</a>
                : <span>Direct email is not configured. You can enable it with VITE_CONTACT_EMAIL.</span>}
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1127] p-3">
              <MessageSquareText className="text-cyan-300" size={18} />
              <span>{contactDeliveryConfig.endpoint ? 'Online form delivery is connected.' : contactDeliveryConfig.email ? 'Email draft delivery is available.' : 'Online form delivery is not connected yet.'}</span>
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
              <input required autoComplete="name" value={form.fullName} onChange={(e) => handleChange('fullName', e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0b1127] px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-400" placeholder="Your name" />
            </label>

            <label className="space-y-2 text-sm text-slate-200">
              <span>Email *</span>
              <input required autoComplete="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} type="email" className="w-full rounded-xl border border-white/10 bg-[#0b1127] px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-400" placeholder="you@example.com" />
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
              <textarea required value={form.projectDescription} onChange={(e) => handleChange('projectDescription', e.target.value)} className="min-h-[150px] w-full rounded-xl border border-white/10 bg-[#0b1127] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400" placeholder="Tell us about your goals, timeline and what you need from the project." />
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
            {isLoading ? <><LoaderCircle className="animate-spin" size={18} /> Sending</> : <><Send size={18} /> Send inquiry</>}
          </button>
        </form>
      </div>
    </div>
  );
}
