import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { careerService } from '../services/api';
import { Career } from '../types';
import { GraduationCap, ArrowLeft, ShieldCheck } from 'lucide-react';

export const RoadmapDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [career, setCareer] = useState<Career | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareer = async () => {
      if (!id) return;
      try {
        const data = await careerService.getCareerById(id);
        setCareer(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCareer();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-slate-800 font-sans">
        <div className="w-10 h-10 border-3 border-slate-900 border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Compiling Progression Roadmap...</span>
      </div>
    );
  }

  if (!career) {
    return (
      <div className="p-8 text-center text-slate-600 text-xs rounded-xl border border-slate-200 bg-white shadow-xs">
        Career path node not found.{' '}
        <Link to="/career-galaxy" className="text-blue-600 font-semibold underline">
          Return to Career Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 font-sans text-slate-900 max-w-5xl mx-auto">
      
      {/* Back Button */}
      <Link to="/career-galaxy" className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline min-h-[38px]">
        <ArrowLeft className="w-4 h-4" /> Back to Career Directory
      </Link>

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-xl bg-slate-900 text-white shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold">
            {career.category}
          </span>
          <span className="text-xs font-semibold text-slate-300">
            Estimated Salary: {career.salaryRange || '$80k - $140k/yr'}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">{career.name} Roadmap</h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">{career.description}</p>

        {/* Required Skills Badges */}
        <div className="pt-2 border-t border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1.5">Prerequisite Competencies</span>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {career.requiredSkills.map((req) => (
              <span key={req.skillName} className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 font-semibold border border-slate-700">
                {req.skillName} ({req.requiredLevel}%)
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 4 STAGES ROADMAP TIMELINE */}
      <div className="space-y-6">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          Academic & Technical Roadmap
        </h2>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 space-y-6">
          
          {/* STAGE 1: Grades 9-10 */}
          <div className="relative group">
            <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              01
            </div>
            <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-1.5 shadow-xs">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Stage 01 • Grades 9 - 10</span>
              <h3 className="text-base font-bold text-slate-900">Foundational Preparation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Focus on core Mathematics, fundamental Computer Science principles, and Logical Reasoning. Build foundational problem-solving skills.
              </p>
            </div>
          </div>

          {/* STAGE 2: Grades 11-12 */}
          <div className="relative group">
            <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              02
            </div>
            <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-1.5 shadow-xs">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Stage 02 • Grades 11 - 12</span>
              <h3 className="text-base font-bold text-slate-900">Stream Alignment & Entrance Exam Readiness</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Select <strong className="text-slate-900">Computer Science / Science Stream</strong>. Master Calculus, Linear Algebra, and structured programming fundamentals.
              </p>
            </div>
          </div>

          {/* STAGE 3: Undergraduate */}
          <div className="relative group">
            <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              03
            </div>
            <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-1.5 shadow-xs">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Stage 03 • Undergraduate Degree</span>
              <h3 className="text-base font-bold text-slate-900">Degree Pathways & Specialized Certifications</h3>
              <ul className="space-y-1 text-xs text-slate-600 list-disc pl-4 font-medium">
                {career.educationPaths.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* STAGE 4: Early Career */}
          <div className="relative group">
            <div className="absolute -left-[31px] sm:-left-[39px] top-0 w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              04
            </div>
            <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-1.5 shadow-xs">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">Stage 04 • Industry Entry</span>
              <h3 className="text-base font-bold text-slate-900">Practical Application & Professional Placement</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Build end-to-end open-source technical projects on GitHub. Apply for structured summer engineering internships and industry hackathons.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
