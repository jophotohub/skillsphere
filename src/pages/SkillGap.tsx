import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { careerService, recommendationService } from '../services/api';
import { Career, SkillGapItem } from '../types';
import { Target, BarChart3, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const SkillGap: React.FC = () => {
  const { user } = useAuth();
  const [careers, setCareers] = useState<Career[]>([]);
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [gaps, setGaps] = useState<SkillGapItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const list = await careerService.getCareers();
        setCareers(list);
        if (list.length > 0) {
          const defaultTarget = list.find(c => c.name === user?.careerGoal) || list[0];
          setSelectedCareer(defaultTarget);
          const res = await recommendationService.analyzeSkillGap(defaultTarget.id);
          setGaps(res.gaps);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [user]);

  const handleCareerChange = async (careerId: string) => {
    const career = careers.find(c => c.id === careerId);
    if (career) {
      setSelectedCareer(career);
      setLoading(true);
      try {
        const res = await recommendationService.analyzeSkillGap(career.id);
        setGaps(res.gaps);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const chartData = {
    labels: gaps.map(g => g.skill),
    datasets: [
      {
        label: 'Current Level',
        data: gaps.map(g => g.current),
        backgroundColor: '#0f172a',
        borderRadius: 4
      },
      {
        label: 'Required Target Level',
        data: gaps.map(g => g.required),
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
      x: {
        grid: { color: '#f1f5f9' },
        ticks: { color: '#334155', font: { size: 10, family: 'Inter', weight: 'bold' as const } }
      },
      y: {
        grid: { color: '#f1f5f9' },
        ticks: { color: '#64748b', font: { size: 10, family: 'Inter' } },
        suggestedMin: 0,
        suggestedMax: 100
      }
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans text-slate-900">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-xl bg-slate-900 text-white shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs font-semibold mb-2 border border-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Gap Evaluation Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Skill Gap Analyzer
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
            Evaluate exact differentials between current student skill levels and target role expectations.
          </p>
        </div>

        {/* Target Role Selector Dropdown */}
        <div className="w-full sm:w-auto shrink-0">
          <label className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-1">
            Target Role Selected
          </label>
          <select
            value={selectedCareer?.id || ''}
            onChange={(e) => handleCareerChange(e.target.value)}
            className="w-full sm:w-64 p-2.5 rounded-lg bg-slate-800 text-white border border-slate-700 text-xs font-semibold focus:outline-none min-h-[40px]"
          >
            {careers.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Chart View */}
      <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 space-y-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            Skill Level Comparison ({selectedCareer?.name})
          </h2>
          <span className="text-[10px] bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded border border-slate-200 font-semibold">
            ANALYTICAL
          </span>
        </div>

        <div className="h-64 sm:h-72 w-full">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Missing Skills List */}
      <div className="space-y-4">
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 border-b border-slate-200 pb-2">
          <AlertTriangle className="w-4 h-4 text-blue-600" />
          Key Skill Gap Breakdown
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {gaps.map((item) => (
            <div
              key={item.skill}
              className="p-5 rounded-xl bg-white border border-slate-200 space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-slate-900">{item.skill}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                  item.importance === 'Critical' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-slate-100 text-slate-700 border border-slate-200'
                }`}>
                  {item.importance}
                </span>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Current Level</span>
                  <span className="font-semibold text-slate-900">{item.current}%</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Target Required</span>
                  <span className="font-semibold text-blue-600">{item.required}%</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 font-bold text-xs text-slate-900">
                  <span>Deficit Gap</span>
                  <span className="text-blue-600">+{item.gap}%</span>
                </div>
              </div>

              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-900 h-full rounded-full" style={{ width: `${item.current}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
