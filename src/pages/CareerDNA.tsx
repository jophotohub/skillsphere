import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Brain, CheckCircle2, Award, ShieldCheck } from 'lucide-react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export const CareerDNA: React.FC = () => {
  const { user } = useAuth();

  const metrics = user?.careerDnaMetrics || {
    logicalThinking: 88,
    problemSolving: 84,
    creativity: 72,
    communication: 65,
    technicalInterest: 91,
    mathematicalInterest: 78,
    researchInterest: 80,
    leadership: 60
  };

  const radarData = {
    labels: [
      'Logical',
      'Problem Solving',
      'Creativity',
      'Communication',
      'Technical',
      'Math Aptitude',
      'Research',
      'Leadership'
    ],
    datasets: [
      {
        label: `${user?.name || 'Student'}'s Skill Matrix`,
        data: [
          metrics.logicalThinking,
          metrics.problemSolving,
          metrics.creativity,
          metrics.communication,
          metrics.technicalInterest,
          metrics.mathematicalInterest,
          metrics.researchInterest,
          metrics.leadership
        ],
        backgroundColor: 'rgba(37, 99, 235, 0.15)',
        borderColor: '#2563eb',
        borderWidth: 2,
        pointBackgroundColor: '#1e293b',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#2563eb',
        pointHoverBorderColor: '#ffffff'
      }
    ]
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: { color: 'rgba(226, 232, 240, 0.8)' },
        grid: { color: 'rgba(226, 232, 240, 0.8)' },
        pointLabels: {
          color: '#334155',
          font: { size: 10, family: 'Inter', weight: 'bold' as const }
        },
        ticks: {
          color: '#64748b',
          backdropColor: 'transparent',
          suggestedMin: 0,
          suggestedMax: 100
        }
      }
    },
    plugins: {
      legend: {
        labels: { color: '#0f172a', font: { size: 11, family: 'Inter', weight: 'bold' as const } }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans text-slate-900">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-xl bg-slate-900 text-white shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs font-semibold mb-2 border border-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Quantitative Competency Evaluation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Personal Career DNA Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
            Multi-axis assessment evaluating logical reasoning, subject affinity, research aptitude, and technical orientation.
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg text-xs shrink-0">
          <span className="text-[10px] uppercase font-semibold text-slate-400 block">Stream Designation</span>
          <span className="text-sm font-bold text-white block mt-0.5">{user?.stream || 'Computer Science'}</span>
        </div>
      </div>

      {/* Main Content: Radar Chart & Metrics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Radar Chart */}
        <div className="lg:col-span-7 p-6 rounded-xl bg-white border border-slate-200 flex flex-col justify-between min-h-[380px] sm:min-h-[440px] shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-600" />
              Multi-Vector Competency Plot
            </h2>
            <span className="text-[10px] bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded border border-slate-200 font-semibold">STANDARDIZED</span>
          </div>
          <div className="relative h-64 sm:h-72 w-full flex items-center justify-center">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </div>

        {/* Individual Metric Cards */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2">
            Metric Score Breakdown
          </h2>

          <div className="grid grid-cols-2 gap-3 text-xs">
            
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-semibold uppercase text-slate-500 block mb-1">Logical Reasoning</span>
              <span className="text-2xl font-bold text-slate-900">{metrics.logicalThinking}%</span>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${metrics.logicalThinking}%` }} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-semibold uppercase text-slate-500 block mb-1">Problem Solving</span>
              <span className="text-2xl font-bold text-slate-900">{metrics.problemSolving}%</span>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${metrics.problemSolving}%` }} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-semibold uppercase text-slate-500 block mb-1">Technical Aptitude</span>
              <span className="text-2xl font-bold text-slate-900">{metrics.technicalInterest}%</span>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${metrics.technicalInterest}%` }} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-semibold uppercase text-slate-500 block mb-1">Math Aptitude</span>
              <span className="text-2xl font-bold text-slate-900">{metrics.mathematicalInterest}%</span>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${metrics.mathematicalInterest}%` }} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-semibold uppercase text-slate-500 block mb-1">Research Capacity</span>
              <span className="text-2xl font-bold text-slate-900">{metrics.researchInterest}%</span>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${metrics.researchInterest}%` }} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] font-semibold uppercase text-slate-500 block mb-1">Creative Orientation</span>
              <span className="text-2xl font-bold text-slate-900">{metrics.creativity}%</span>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${metrics.creativity}%` }} />
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Strengths & Tailored Advice */}
      <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Key Identified Strengths
          </h3>
          <div className="space-y-2 text-xs">
            {user?.strengths?.map((st) => (
              <div key={st} className="p-3 rounded-lg bg-slate-50 border border-slate-200 font-semibold text-slate-800">
                • {st}
              </div>
            )) || (
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 font-semibold">Logical Analytical Reasoning & Technical Competency</div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Award className="w-4 h-4 text-blue-600" /> Career Match Insights
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200">
            High evaluations in <span className="font-bold text-slate-900">Logical Reasoning ({metrics.logicalThinking}%)</span> and <span className="font-bold text-slate-900">Technical Aptitude ({metrics.technicalInterest}%)</span> indicate a strong affinity for software development, data science, quantitative analytics, and computer engineering tracks.
          </p>
        </div>
      </div>

    </div>
  );
};
