import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/api';
import { useSearchParams } from 'react-router-dom';
import { ThemeSettings } from '../components/ThemeSettings';
import { 
  CheckCircle2, 
  Save, 
  ShieldCheck, 
  User, 
  Palette, 
  Sparkles,
  GraduationCap
} from 'lucide-react';

interface ProfileSettingsProps {
  defaultTab?: 'profile' | 'theme';
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ defaultTab = 'profile' }) => {
  const { user, updateUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialTab = (searchParams.get('tab') as 'profile' | 'theme') || defaultTab;
  const [activeTab, setActiveTab] = useState<'profile' | 'theme'>(initialTab);

  const [name, setName] = useState(user?.name || '');
  const [educationLevel, setEducationLevel] = useState(user?.educationLevel || 'High School (Class 11-12)');
  const [classYear, setClassYear] = useState(user?.classYear || '12th');
  const [stream, setStream] = useState(user?.stream || 'Computer Science');
  const [careerGoal, setCareerGoal] = useState(user?.careerGoal || 'Software Developer');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'theme' || tabParam === 'profile') {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (tab: 'profile' | 'theme') => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      const updated = await userService.updateProfile({
        name,
        educationLevel,
        classYear,
        stream,
        careerGoal
      });
      updateUser(updated);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch {
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-16 font-sans text-slate-900 dark:text-white max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div 
        className="p-6 sm:p-8 rounded-xl bg-slate-900 dark:bg-slate-950 text-white shadow-xs space-y-2 border border-slate-800"
        style={{ borderRadius: 'var(--card-radius)' }}
      >
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-slate-800 text-slate-200 text-xs font-semibold mb-1 border border-slate-700">
          <ShieldCheck className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
          <span>SkillSphere Account Management</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Settings & Customization
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
          Manage your academic parameters, career ambitions, and personalize your global website theme experience.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => handleTabChange('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'profile'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          style={{ borderRadius: 'var(--btn-radius)' }}
        >
          <User className="w-4 h-4" />
          <span>Student Profile & Goals</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange('theme')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'theme'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          style={{ borderRadius: 'var(--btn-radius)' }}
        >
          <Palette className="w-4 h-4" style={{ color: 'var(--primary)' }} />
          <span>Theme & Appearance</span>
          <span 
            className="text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase"
            style={{ 
              backgroundColor: 'var(--primary-light)', 
              color: 'var(--primary)',
              borderRadius: 'var(--badge-radius)'
            }}
          >
            New
          </span>
        </button>
      </div>

      {/* Profile Details Tab Content */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          {success && (
            <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Profile updated successfully. Matching algorithms recalculated.</span>
            </div>
          )}

          <form 
            onSubmit={handleSave} 
            className="p-6 sm:p-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 text-xs shadow-xs"
            style={{ borderRadius: 'var(--card-radius)' }}
          >
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <GraduationCap className="w-4 h-4" style={{ color: 'var(--primary)' }} />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Academic & Career Baseline
              </h2>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-xs min-h-[42px] focus-theme-ring"
                style={{ borderRadius: 'var(--btn-radius)' }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1">Education Level</label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium min-h-[42px] focus-theme-ring"
                  style={{ borderRadius: 'var(--btn-radius)' }}
                >
                  <option value="School (Class 9-10)">School (Class 9-10)</option>
                  <option value="High School (Class 11-12)">High School (Class 11-12)</option>
                  <option value="Undergraduate (College)">Undergraduate (College)</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1">Class / Year</label>
                <select
                  value={classYear}
                  onChange={(e) => setClassYear(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium min-h-[42px] focus-theme-ring"
                  style={{ borderRadius: 'var(--btn-radius)' }}
                >
                  <option value="10th">10th Class</option>
                  <option value="11th">11th Class</option>
                  <option value="12th">12th Class</option>
                  <option value="1st Year">1st Year College</option>
                  <option value="2nd Year">2nd Year College</option>
                  <option value="3rd Year">3rd Year College</option>
                  <option value="4th Year">4th Year College</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1">Academic Stream</label>
                <select
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium min-h-[42px] focus-theme-ring"
                  style={{ borderRadius: 'var(--btn-radius)' }}
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Science (PCM)">Science (PCM)</option>
                  <option value="Biology (PCB)">Biology (PCB)</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts/Humanities">Arts / Humanities</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold text-xs mb-1">Target Career Goal</label>
              <input
                type="text"
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                placeholder="e.g. Software Developer, AI Research Scientist, Product Designer"
                className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-xs min-h-[42px] focus-theme-ring"
                style={{ borderRadius: 'var(--btn-radius)' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs min-h-[42px] hover:opacity-95"
              style={{ backgroundColor: 'var(--primary)', borderRadius: 'var(--btn-radius)' }}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4 text-white" />
                  <span>Save & Update Career Profile</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* Theme & Appearance Tab Content */}
      {activeTab === 'theme' && (
        <ThemeSettings />
      )}

    </div>
  );
};
