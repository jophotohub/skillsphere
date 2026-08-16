import React, { useState } from 'react';
import { Users, Star, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';

export const MentorConnect: React.FC = () => {
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const mentors = [
    {
      id: 'm1',
      name: 'Dr. Aris Thorne',
      role: 'Principal AI Scientist @ DeepMind Alumni',
      domain: 'Data & AI',
      rating: 4.9,
      reviews: 48,
      experience: '12+ Years',
      bio: 'Helps students navigate machine learning research, graduate applications, and industry AI engineering.'
    },
    {
      id: 'm2',
      name: 'Elena Rostova',
      role: 'Lead UX Architect @ Stripe',
      domain: 'Design & Creative',
      rating: 4.8,
      reviews: 32,
      experience: '8+ Years',
      bio: 'Specializes in portfolio reviews, design systems architecture, and product design career transitions.'
    },
    {
      id: 'm3',
      name: 'Karan Sharma',
      role: 'Senior Software Engineer @ Google',
      domain: 'Engineering & Tech',
      rating: 5.0,
      reviews: 65,
      experience: '10+ Years',
      bio: 'Guides high school and university students on algorithms, system architecture, and tech interview preparation.'
    }
  ];

  const handleBookSession = (mentorName: string) => {
    setBookingSuccess(`Mentorship session request generated for ${mentorName}. Email confirmation pending.`);
    setTimeout(() => setBookingSuccess(null), 5000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans text-slate-900">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-xl bg-slate-900 text-white shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs font-semibold mb-2 border border-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Verified Advisory Network</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Industry Advisory Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
            Schedule strategic guidance consultations with verified industry specialists and alumni mentors.
          </p>
        </div>
      </div>

      {bookingSuccess && (
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          {bookingSuccess}
        </div>
      )}

      {/* Mentors Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mentors.map((m) => (
          <div key={m.id} className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold">
                  {m.domain}
                </span>
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-blue-600 text-blue-600" /> {m.rating} ({m.reviews})
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base">{m.name}</h3>
                <span className="text-xs text-blue-600 font-semibold block mt-0.5">{m.role}</span>
                <span className="text-[10px] text-slate-500 block mt-0.5 font-medium">Experience: {m.experience}</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{m.bio}</p>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => handleBookSession(m.name)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 min-h-[40px]"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Consultation</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
