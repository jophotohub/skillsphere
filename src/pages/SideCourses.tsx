import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { recommendationService } from '../services/api';
import { SideCourseRecommendation } from '../types';
import { BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';

export const SideCourses: React.FC = () => {
  const { user } = useAuth();
  const [sideCourses, setSideCourses] = useState<SideCourseRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await recommendationService.getRecommendations();
        setSideCourses(data.sideCourses);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-slate-800 font-sans">
        <div className="w-10 h-10 border-3 border-slate-900 border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Evaluating Complementary Skills...</span>
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
            <span>Cross-Disciplinary Competencies</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Recommended Complementary Courses
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
            Secondary skills outside your primary academic stream designed to provide unique technical leverage.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-xs self-stretch md:self-auto shrink-0">
          <span className="text-slate-400 font-semibold block text-[10px] uppercase">Academic Stream</span>
          <span className="font-bold text-white text-sm block mt-0.5">{user?.stream || 'Computer Science'}</span>
        </div>
      </div>

      {/* Side Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sideCourses.map((item) => (
          <div
            key={item.course.id}
            className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold">
                  {item.course.category}
                </span>
                <span className="text-xs text-slate-500 font-medium">{item.course.duration}</span>
              </div>

              <h2 className="text-base font-bold text-slate-900">{item.course.name}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{item.course.description}</p>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1 text-xs">
                <span className="font-bold text-slate-900 block text-[10px] uppercase">Recommendation Rationale:</span>
                <p className="text-xs text-slate-600 leading-relaxed">{item.why}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => alert(`Enrolling in ${item.course.name}. Added to your course schedule!`)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs flex items-center justify-center gap-2 min-h-[40px]"
              >
                <span>Enroll ({item.course.skill})</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
