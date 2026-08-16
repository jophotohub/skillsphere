import React, { useState, useEffect } from 'react';
import { careerService } from '../services/api';
import { Career } from '../types';
import { BarChart3, ShieldCheck } from 'lucide-react';
import { Bar } from 'react-chartjs-2';

export const CareerCompare: React.FC = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [careerA, setCareerA] = useState<Career | null>(null);
  const [careerB, setCareerB] = useState<Career | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const list = await careerService.getCareers();
        setCareers(list);
        if (list.length >= 2) {
          setCareerA(list[0]);
          setCareerB(list[2]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  if (loading || !careerA || !careerB) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-slate-800 font-sans">
        <div className="w-10 h-10 border-3 border-slate-900 border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Loading Comparison Engine...</span>
      </div>
    );
  }

  const comparisonChartData = {
    labels: ['Programming Req', 'Math Req', 'Creativity Req', 'Demand Level (x20)'],
    datasets: [
      {
        label: careerA.name,
        data: [
          careerA.programmingReq || 80,
          careerA.mathReq || 70,
          careerA.creativityReq || 70,
          (careerA.demandRating || 5) * 20
        ],
        backgroundColor: '#0f172a',
        borderRadius: 4
      },
      {
        label: careerB.name,
        data: [
          careerB.programmingReq || 80,
          careerB.mathReq || 85,
          careerB.creativityReq || 65,
          (careerB.demandRating || 5) * 20
        ],
        backgroundColor: '#2563eb',
        borderRadius: 4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#0f172a', font: { size: 11, family: 'Inter', weight: 'bold' as const } }
      }
    },
    scales: {
      x: { grid: { color: '#f1f5f9' }, ticks: { color: '#334155', font: { size: 10, family: 'Inter', weight: 'bold' as const } } },
      y: { suggestedMin: 0, suggestedMax: 100, grid: { color: '#f1f5f9' }, ticks: { color: '#64748b', font: { size: 10, family: 'Inter' } } }
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans text-slate-900">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-xl bg-slate-900 text-white shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs font-semibold mb-2 border border-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Comparative Vector Evaluation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Career Comparison Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
            Side-by-side quantitative evaluation of prerequisites, difficulty levels, salary ranges, and technical demands.
          </p>
        </div>

        {/* Career Selectors */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto text-xs shrink-0">
          <select
            value={careerA.id}
            onChange={(e) => setCareerA(careers.find(c => c.id === e.target.value) || careerA)}
            className="p-2.5 rounded-lg bg-slate-800 text-white border border-slate-700 font-semibold focus:outline-none min-h-[40px]"
          >
            {careers.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <span className="text-xs font-bold text-blue-400 self-center">VS</span>

          <select
            value={careerB.id}
            onChange={(e) => setCareerB(careers.find(c => c.id === e.target.value) || careerB)}
            className="p-2.5 rounded-lg bg-slate-800 text-white border border-slate-700 font-semibold focus:outline-none min-h-[40px]"
          >
            {careers.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Cards Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Career A Card */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold">
              {careerA.category}
            </span>
            <span className="text-xs font-bold text-blue-600">{careerA.difficulty}</span>
          </div>

          <h2 className="text-xl font-bold text-slate-900">{careerA.name}</h2>
          <p className="text-xs text-slate-600 leading-relaxed">{careerA.description}</p>

          <div className="space-y-1.5 text-xs pt-2 border-t border-slate-100">
            <div className="flex justify-between"><span className="text-slate-500 font-medium">Salary Index:</span><span className="font-bold text-slate-900">{careerA.salaryRange}</span></div>
            <div className="flex justify-between"><span className="text-slate-500 font-medium">Programming Req:</span><span className="font-semibold text-slate-900">{careerA.programmingReq}%</span></div>
            <div className="flex justify-between"><span className="text-slate-500 font-medium">Math Req:</span><span className="font-semibold text-slate-900">{careerA.mathReq}%</span></div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-1.5">Prerequisite Skills:</span>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {careerA.requiredSkills.map((req) => (
                <span key={req.skillName} className="px-2.5 py-1 rounded bg-slate-50 text-slate-800 border border-slate-200 font-semibold">
                  {req.skillName}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Career B Card */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold">
              {careerB.category}
            </span>
            <span className="text-xs font-bold text-blue-600">{careerB.difficulty}</span>
          </div>

          <h2 className="text-xl font-bold text-slate-900">{careerB.name}</h2>
          <p className="text-xs text-slate-600 leading-relaxed">{careerB.description}</p>

          <div className="space-y-1.5 text-xs pt-2 border-t border-slate-100">
            <div className="flex justify-between"><span className="text-slate-500 font-medium">Salary Index:</span><span className="font-bold text-slate-900">{careerB.salaryRange}</span></div>
            <div className="flex justify-between"><span className="text-slate-500 font-medium">Programming Req:</span><span className="font-semibold text-slate-900">{careerB.programmingReq}%</span></div>
            <div className="flex justify-between"><span className="text-slate-500 font-medium">Math Req:</span><span className="font-semibold text-slate-900">{careerB.mathReq}%</span></div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-1.5">Prerequisite Skills:</span>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {careerB.requiredSkills.map((req) => (
                <span key={req.skillName} className="px-2.5 py-1 rounded bg-slate-50 text-slate-800 border border-slate-200 font-semibold">
                  {req.skillName}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Comparison Chart */}
      <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <BarChart3 className="w-4 h-4 text-blue-600" />
          Quantitative Demands Comparison Chart
        </h3>
        <div className="h-64 w-full">
          <Bar data={comparisonChartData} options={chartOptions} />
        </div>
      </div>

    </div>
  );
};
