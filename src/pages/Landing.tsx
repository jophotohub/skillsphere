import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Logo } from '../components/Logo';
import { 
  Compass, 
  Target, 
  GitFork, 
  BookOpen, 
  Eye, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  BarChart2,
  ChevronRight
} from 'lucide-react';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Top Ticker Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-4 mb-10 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <Logo variant="full" size="sm" showTagline={true} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Quantitative Student Career & Skill Mapping Engine</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-slate-900">
              Data-Driven Career Discovery <br />
              <span className="text-blue-600">
                & Skill Gap Analytics
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              SkillSphere evaluates student academic streams, core subjects, and personal skill vectors to match degree routes, career goals, and personalized learning roadmaps.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Link
                to="/register"
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-xs text-center min-h-[44px] flex items-center justify-center gap-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-xs transition-colors text-center flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Compass className="w-4 h-4 text-slate-600" />
                <span>Explore Career Directory</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">Progressive Web Application</span>
                <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">Mobile Ready</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">Install On Any Mobile Device</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Add SkillSphere to your Android or iOS home screen for instant access, offline skill tracking, and personalized career alerts.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-slate-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Free for School & University Students
              </div>
            </div>
          </div>

        </div>

        {/* Quick Metrics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-200">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <span className="text-2xl font-extrabold text-slate-900 block mb-0.5">30+</span>
            <span className="text-[10px] uppercase font-semibold text-slate-500">Curated Career Paths</span>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <span className="text-2xl font-extrabold text-blue-600 block mb-0.5">Weighted Vector</span>
            <span className="text-[10px] uppercase font-semibold text-slate-500">Matching Engine</span>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <span className="text-2xl font-extrabold text-slate-900 block mb-0.5">0–100%</span>
            <span className="text-[10px] uppercase font-semibold text-slate-500">Skill Gap Precision</span>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <span className="text-2xl font-extrabold text-slate-900 block mb-0.5">Structured XP</span>
            <span className="text-[10px] uppercase font-semibold text-slate-500">Milestone System</span>
          </div>
        </div>

      </section>

      {/* Feature Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">Career Intelligence Suite</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Comprehensive Analytical Tools
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-slate-400">01</span>
                <BarChart2 className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Personal Career DNA</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Quantitative profile measuring analytical, creative, technical, and communication competencies using standardized radar analysis.
              </p>
            </div>
            <Link to="/register" className="text-xs font-semibold text-blue-600 pt-3 border-t border-slate-100 flex items-center justify-between hover:underline">
              <span>View Assessment</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-slate-400">02</span>
                <Compass className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Interactive Career Galaxy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Explore interlinked career domains, salary ranges, required degree specializations, and growth trajectories.
              </p>
            </div>
            <Link to="/register" className="text-xs font-semibold text-blue-600 pt-3 border-t border-slate-100 flex items-center justify-between hover:underline">
              <span>Explore Directory</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-slate-400">03</span>
                <Target className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Skill Gap Matrix</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Side-by-side gap analysis comparing current student proficiencies against target role requirements.
              </p>
            </div>
            <Link to="/register" className="text-xs font-semibold text-blue-600 pt-3 border-t border-slate-100 flex items-center justify-between hover:underline">
              <span>Analyze Requirements</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-slate-400">04</span>
                <GitFork className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Prerequisite Learning Graph</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Algorithmic sequence recommendation mapping core prerequisites before tackling advanced domain subjects.
              </p>
            </div>
            <Link to="/register" className="text-xs font-semibold text-blue-600 pt-3 border-t border-slate-100 flex items-center justify-between hover:underline">
              <span>View Sequence</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-slate-400">05</span>
                <BookOpen className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Academic Side Courses</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Targeted modules covering technical skills (Power BI, Python, Data Analytics) to strengthen university applications.
              </p>
            </div>
            <Link to="/register" className="text-xs font-semibold text-blue-600 pt-3 border-t border-slate-100 flex items-center justify-between hover:underline">
              <span>Browse Catalog</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-slate-400">06</span>
                <Eye className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Emerging Interdisciplinary Roles</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Uncover modern hybrid careers such as Computational Biology, FinTech Quantitative Analysis, and Health Informatics.
              </p>
            </div>
            <Link to="/register" className="text-xs font-semibold text-blue-600 pt-3 border-t border-slate-100 flex items-center justify-between hover:underline">
              <span>Discover Specializations</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Structured Milestones Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="p-8 rounded-xl bg-slate-900 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Milestone Progress Tracking</span>
            <h2 className="text-2xl font-bold">Structured Academic Career Preparation</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Complete verifiable milestone tasks, track skill development progress, and earn achievement certificates as you build your career portfolio.
            </p>
          </div>
          <Link
            to="/register"
            className="w-full lg:w-auto px-7 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors text-center min-h-[44px] flex items-center justify-center gap-2"
          >
            Create Student Account
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};
