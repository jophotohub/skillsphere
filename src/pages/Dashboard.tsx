import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { recommendationService, questService } from '../services/api';
import { RecommendationResponse, Mission } from '../types';
import { 
  Compass, 
  Orbit, 
  Trophy, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  GitFork,
  Zap,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Dashboard: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recs = await recommendationService.getRecommendations();
        setRecommendations(recs);
        const mList = await questService.getMissions();
        setMissions(mList);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCompleteMission = async (missionId: string) => {
    try {
      const res = await questService.completeMission(missionId);
      updateUser(res.user);
      setMissions(missions.map(m => m.id === missionId ? { ...m, completed: true } : m));
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      alert('Failed to complete mission');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-slate-800 font-sans">
        <div className="w-10 h-10 border-3 border-slate-900 border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Calculating Career Intelligence Metrics...</span>
      </div>
    );
  }

  const topCareerMatch = recommendations?.topCareers[0];
  const nextSkill = recommendations?.nextBestSkill;

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans text-slate-900">
      
      {/* Welcome Header */}
      <div className="p-6 sm:p-8 rounded-xl bg-slate-900 text-white shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs font-semibold mb-2 border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Career DNA Active • Stream: {user?.stream || 'Computer Science'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome back, {user?.name || 'Student'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
              Academic profile configured for <span className="text-white font-bold">{user?.stream}</span>. Your career recommendations and skill roadmaps are fully computed.
            </p>
          </div>

          <button
            onClick={() => navigate('/onboarding')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 min-h-[40px] shrink-0"
          >
            <span>Recalibrate Career Profile</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 block mb-1">Top Match Role</span>
            <span className="text-sm font-bold text-slate-900 block truncate max-w-[140px]">
              {topCareerMatch?.career.name || 'Software Engineer'}
            </span>
          </div>
          <div className="text-2xl font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
            {topCareerMatch?.matchScore || 92}%
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 block mb-1">Skill Readiness</span>
            <span className="text-sm font-bold text-slate-900 block">Competency</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
            {user?.skills ? Math.round(user.skills.reduce((acc, s) => acc + s.level, 0) / user.skills.length) : 67}%
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 block mb-1">Current Level</span>
            <span className="text-sm font-bold text-slate-900 block">{user?.badges[0] || 'AI Explorer'}</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
            Level {user?.level || 1}
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 block mb-1">XP Points</span>
            <span className="text-sm font-bold text-slate-900 block">{user?.completedMissions.length || 0} Tasks Done</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
            {user?.xp || 0}
          </div>
        </div>

      </div>

      {/* Main Content Grid: Recommended Careers & Next Skill */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* Top Careers Column */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600" />
              Recommended Career Paths
            </h2>
            <Link to="/career-match" className="text-xs font-semibold text-blue-600 hover:underline">
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {recommendations?.topCareers.slice(0, 3).map((match, idx) => (
              <div
                key={match.career.id}
                className="p-5 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs hover:border-slate-300 transition-all"
              >
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-[10px] font-semibold">
                      #{idx + 1} Recommendation
                    </span>
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">
                      {match.matchScore}% Fit Match
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{match.career.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{match.reason}</p>
                </div>

                <div className="w-full sm:w-auto shrink-0">
                  <Link
                    to={`/careers/${match.career.id}`}
                    className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 min-h-[38px]"
                  >
                    <span>View Roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Galaxy Banner */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 shrink-0">
                <Orbit className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Career Domain Constellation</h4>
                <p className="text-xs text-slate-600">Explore interconnected degree and industry specializations.</p>
              </div>
            </div>
            <Link
              to="/career-galaxy"
              className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-lg transition-colors border border-slate-200 flex items-center justify-center min-h-[38px]"
            >
              Open Galaxy Directory
            </Link>
          </div>
        </div>

        {/* Right Sidebar: Next Best Skill & Side Courses */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Priority Skill Box */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600">
              <GitFork className="w-4 h-4 text-blue-600" />
              <span>Priority Skill Objective</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">{nextSkill?.skillName || 'Statistics'}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {nextSkill?.reason || 'Essential prerequisite required before effectively mastering core analytical tools.'}
            </p>
            <div className="pt-1">
              <Link
                to="/learn-next"
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors min-h-[38px]"
              >
                <span>View Prerequisites</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Side Courses */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                Recommended Side Courses
              </h3>
              <Link to="/side-courses" className="text-xs font-semibold text-blue-600 hover:underline">All &rarr;</Link>
            </div>

            <div className="space-y-2">
              {recommendations?.sideCourses.slice(0, 2).map((item) => (
                <div key={item.course.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{item.course.name}</span>
                    <span className="text-[10px] text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">{item.course.duration}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-snug">{item.why}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Structured Quests Section */}
      <div className="p-6 sm:p-8 rounded-xl bg-white border border-slate-200 space-y-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-blue-600" />
              Academic Tasks & Milestones
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Complete verifiable tasks to advance your career readiness score.</p>
          </div>
          <Link to="/career-quest" className="text-xs font-semibold text-blue-600 hover:underline">
            View All Objectives &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {missions.slice(0, 3).map((m) => (
            <div
              key={m.id}
              className={`p-5 rounded-xl border text-xs space-y-3 transition-colors ${
                m.completed
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 text-[10px] font-semibold">
                  {m.category}
                </span>
                <span className="text-slate-900 font-bold">+{m.xp} XP</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{m.title}</h4>
              <p className="text-slate-600 text-xs leading-relaxed">{m.description}</p>

              {m.completed ? (
                <div className="flex items-center gap-1.5 font-semibold text-xs text-emerald-700 pt-1">
                  <CheckCircle2 className="w-4 h-4" /> Milestone Completed (+{m.xp} XP)
                </div>
              ) : (
                <button
                  onClick={() => handleCompleteMission(m.id)}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs min-h-[38px]"
                >
                  Mark Complete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
