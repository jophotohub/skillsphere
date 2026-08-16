import React, { useEffect, useState } from 'react';
import { BarChart3, Users, ShieldCheck, Database, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export const AdminAnalytics: React.FC = () => {
  const [supabaseStatus, setSupabaseStatus] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/admin/supabase-status')
      .then(res => res.json())
      .then(data => setSupabaseStatus(data))
      .catch(() => setSupabaseStatus({ configured: false, url: 'Error checking status' }));
  }, []);

  const copySqlInstruction = () => {
    navigator.clipboard.writeText(`-- Run code from /supabase_schema.sql in your Supabase SQL Editor`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const streamData = {
    labels: ['Computer Science', 'Science (PCM)', 'Biology (PCB)', 'Commerce', 'Arts/Humanities'],
    datasets: [
      {
        data: [42, 28, 15, 10, 5],
        backgroundColor: ['#0f172a', '#2563eb', '#64748b', '#94a3b8', '#cbd5e1']
      }
    ]
  };

  const skillGapsData = {
    labels: ['Statistics', 'Machine Learning', 'SQL Databases', 'Git Control', 'Public Speaking'],
    datasets: [
      {
        label: 'Cohort Skill Gap %',
        data: [48, 42, 35, 28, 22],
        backgroundColor: '#2563eb',
        borderRadius: 4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#0f172a', font: { size: 10, family: 'Inter', weight: 'bold' as const } } }
    },
    scales: {
      x: { grid: { color: '#f1f5f9' }, ticks: { color: '#334155', font: { size: 10, family: 'Inter', weight: 'bold' as const } } },
      y: { grid: { color: '#f1f5f9' }, ticks: { color: '#64748b', font: { size: 10, family: 'Inter' } }, suggestedMin: 0, suggestedMax: 60 }
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans text-slate-900">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-xl bg-slate-900 text-white shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs font-semibold mb-2 border border-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Institutional Management Suite</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Institutional Cohort Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
            Real-time analytics on student career trajectories, skill readiness, and academic stream progression.
          </p>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-800 border border-slate-700 text-xs self-stretch md:self-auto shrink-0">
          <span className="text-slate-400 font-semibold block text-[10px] uppercase">Active Enrollment</span>
          <span className="text-base font-bold text-white block mt-0.5">1,248 Students</span>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 font-semibold uppercase block mb-1">Top Career Preference</span>
          <span className="text-sm font-bold text-slate-900">Software Eng (38%)</span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 font-semibold uppercase block mb-1">Average Readiness</span>
          <span className="text-sm font-bold text-blue-600">72.4% Score</span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 font-semibold uppercase block mb-1">Milestones Completed</span>
          <span className="text-sm font-bold text-slate-900">3,890 Tasks</span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-500 font-semibold uppercase block mb-1">Primary Skill Deficit</span>
          <span className="text-sm font-bold text-red-600">Statistics (48%)</span>
        </div>
      </div>

      {/* Supabase Database Integration Card */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                Supabase Database Architecture
                {supabaseStatus?.configured ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Connected
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                    <AlertCircle className="w-3 h-3 text-amber-600" /> Pending Credentials
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                PostgreSQL Database tables, JWT auth sync, and schema migration support.
              </p>
            </div>
          </div>

          <button
            onClick={copySqlInstruction}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy SQL Schema Path'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 font-semibold uppercase block">Supabase Endpoint</span>
            <span className="font-mono font-medium text-slate-800 block mt-1 truncate">
              {supabaseStatus?.url || 'https://your-project.supabase.co'}
            </span>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 font-semibold uppercase block">Database Tables Configured</span>
            <span className="font-semibold text-slate-900 block mt-1">
              users, careers, skills, courses, missions
            </span>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 font-semibold uppercase block">Schema Script</span>
            <span className="font-mono font-semibold text-blue-600 block mt-1">
              /supabase_schema.sql
            </span>
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Stream Distribution */}
        <div className="lg:col-span-5 p-6 rounded-xl bg-white border border-slate-200 space-y-4 shadow-xs">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
            <Users className="w-4 h-4 text-blue-600" /> Academic Stream Distribution
          </h2>
          <div className="h-60 relative flex items-center justify-center">
            <Doughnut data={streamData} />
          </div>
        </div>

        {/* Skill Gap Matrix */}
        <div className="lg:col-span-7 p-6 rounded-xl bg-white border border-slate-200 space-y-4 shadow-xs">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
            <BarChart3 className="w-4 h-4 text-blue-600" /> Cohort Skill Deficit Percentage
          </h2>
          <div className="h-60 w-full">
            <Bar data={skillGapsData} options={chartOptions} />
          </div>
        </div>

      </div>

    </div>
  );
};
