import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { recommendationService } from '../services/api';
import { RecommendationResponse } from '../types';
import { Compass, ArrowRight, ShieldCheck } from 'lucide-react';

export const CareerMatch: React.FC = () => {
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const data = await recommendationService.getRecommendations();
        setRecommendations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-slate-800 font-sans">
        <div className="w-10 h-10 border-3 border-slate-900 border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Computing Weighted Career Vectors...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans text-slate-900">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-xl bg-slate-900 text-white shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs font-semibold mb-2 border border-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Quantitative Recommendation Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Top Career Match Evaluations
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
            Calculated via matrix weighting: Subjects (25%), Academic Interests (20%), Technical Skills (20%), and Core Strengths (15%).
          </p>
        </div>
      </div>

      {/* Top Careers List */}
      <div className="space-y-4">
        {recommendations?.topCareers.map((match, idx) => (
          <div
            key={match.career.id}
            className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 space-y-5 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 uppercase">
                  RANK #{idx + 1} • {match.career.category}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-2">
                  {match.career.name}
                </h2>
                <p className="text-xs text-slate-600 max-w-2xl">{match.career.description}</p>
              </div>

              <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between sm:justify-start">
                <div className="text-left sm:text-right">
                  <span className="text-2xl font-bold text-blue-600 block">{match.matchScore}%</span>
                  <span className="text-[10px] text-slate-500 font-semibold uppercase block">Affinity Score</span>
                </div>
                <Link
                  to={`/careers/${match.career.id}`}
                  className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs flex items-center gap-2 min-h-[40px]"
                >
                  <span>Inspect Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Score Component Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-semibold block text-[10px] uppercase">Subject Affinity</span>
                <span className="text-sm font-bold text-slate-900 block mt-0.5">{match.subjectMatch}%</span>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${match.subjectMatch}%` }} />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-semibold block text-[10px] uppercase">Interest Alignment</span>
                <span className="text-sm font-bold text-slate-900 block mt-0.5">{match.interestMatch}%</span>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${match.interestMatch}%` }} />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-semibold block text-[10px] uppercase">Skill Readiness</span>
                <span className="text-sm font-bold text-slate-900 block mt-0.5">{match.skillMatch}%</span>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${match.skillMatch}%` }} />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-semibold block text-[10px] uppercase">Strength Index</span>
                <span className="text-sm font-bold text-slate-900 block mt-0.5">{match.strengthMatch}%</span>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${match.strengthMatch}%` }} />
                </div>
              </div>

            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <span className="font-bold text-slate-900 block mb-0.5 uppercase text-[10px]">Algorithm Rationale:</span>
              <p className="text-xs text-slate-600 leading-relaxed">{match.reason}</p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
