import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { questService } from '../services/api';
import { Mission } from '../types';
import { Trophy, Award, CheckCircle2, Zap, Target, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CareerQuest: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const list = await questService.getMissions();
        setMissions(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMissions();
  }, []);

  const handleCompleteMission = async (missionId: string) => {
    try {
      const res = await questService.completeMission(missionId);
      updateUser(res.user);
      setMissions(missions.map(m => m.id === missionId ? { ...m, completed: true } : m));
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      alert('Failed to complete quest');
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans text-slate-900">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-xl bg-slate-900 text-white shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs font-semibold mb-2 border border-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Verifiable Academic Milestones</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Academic Objectives & Accomplishments
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
            Execute key skill challenges, project completions, and career milestones to earn verified credits.
          </p>
        </div>

        {/* Level & XP Box */}
        <div className="flex items-center gap-6 bg-slate-800 p-4 rounded-lg border border-slate-700 self-stretch sm:self-auto justify-around shrink-0">
          <div className="text-center">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Level</span>
            <span className="text-lg font-bold text-white">Level {user?.level || 3}</span>
          </div>
          <div className="w-px h-8 bg-slate-700" />
          <div className="text-center">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Accumulated XP</span>
            <span className="text-lg font-bold text-blue-400">{user?.xp || 750} XP</span>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 space-y-4 shadow-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Award className="w-4 h-4 text-blue-600" /> Earned Certifications & Badges
        </h2>
        <div className="flex flex-wrap gap-2">
          {user?.badges?.map((badge) => (
            <div key={badge} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5 text-blue-600" />
              <span>{badge}</span>
            </div>
          )) || (
            <span className="text-xs text-slate-500 font-medium">Complete academic objectives to unlock your first verified badge.</span>
          )}
        </div>
      </div>

      {/* Missions List */}
      <div className="space-y-4">
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 border-b border-slate-200 pb-2">
          <Target className="w-4 h-4 text-blue-600" /> Active Academic Objectives
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {missions.map((m) => (
            <div
              key={m.id}
              className={`p-5 rounded-xl border text-xs space-y-4 transition-colors shadow-xs flex flex-col justify-between ${
                m.completed
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-white border border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 font-semibold text-[10px] uppercase">
                    {m.category}
                  </span>
                  <span className="font-bold text-slate-900 text-xs">+{m.xp} XP</span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{m.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed mt-1">{m.description}</p>
                </div>
              </div>

              {m.completed ? (
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-xs pt-3 border-t border-slate-100 min-h-[40px]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Milestone Verified (+{m.xp} XP)
                </div>
              ) : (
                <button
                  onClick={() => handleCompleteMission(m.id)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 min-h-[40px]"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Verify Completion</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
