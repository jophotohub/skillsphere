import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { recommendationService } from '../services/api';
import { NextBestSkillRecommendation } from '../types';
import { GitFork, CheckCircle2, ShieldCheck } from 'lucide-react';

export const LearnNext: React.FC = () => {
  const { user } = useAuth();
  const [nextSkill, setNextSkill] = useState<NextBestSkillRecommendation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNext = async () => {
      try {
        const data = await recommendationService.getRecommendations();
        setNextSkill(data.nextBestSkill);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNext();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-slate-800 font-sans">
        <div className="w-10 h-10 border-3 border-slate-900 border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Computing Skill Prerequisite Dependencies...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans text-slate-900 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-xl bg-slate-900 text-white shadow-xs text-center space-y-1.5">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs font-semibold mb-1 border border-slate-700">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>Prerequisite Dependency Hierarchy</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Recommended Next Skill Objective
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Identifies critical prerequisite topics to master before attempting advanced industry material.
        </p>
      </div>

      {/* Main Feature Highlight Box */}
      {nextSkill ? (
        <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 space-y-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold">
              Target Goal: {nextSkill.targetCareer}
            </span>
            <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
              <GitFork className="w-4 h-4 text-blue-600" /> Priority Skill Node
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
              Recommended Prerequisite
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              {nextSkill.skillName}
            </h2>
            <span className="text-xs font-semibold text-blue-600 block">Category: {nextSkill.category}</span>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1 text-xs">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider">Prerequisite Rationale</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {nextSkill.reason}
            </p>
          </div>

          {/* Prerequisite Tree */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider">Unlocks Core Advanced Concepts:</h4>
            <div className="flex flex-wrap gap-2">
              {nextSkill.prerequisiteFor.map((concept) => (
                <span key={concept} className="px-3 py-1.5 rounded-lg bg-white text-slate-900 font-semibold border border-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {concept}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-semibold">
          Select or update your target career goal in profile settings to calculate skill prerequisites.
        </div>
      )}

    </div>
  );
};
