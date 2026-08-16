import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/api';
import { ArrowRight, CheckCircle2, ChevronLeft, ShieldCheck } from 'lucide-react';

export const Onboarding: React.FC = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [educationLevel, setEducationLevel] = useState(user?.educationLevel || 'High School (Class 11-12)');
  const [classYear, setClassYear] = useState(user?.classYear || '12th');
  const [stream, setStream] = useState(user?.stream || 'Computer Science');

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    user?.subjects?.length ? user.subjects : ['Computer Science', 'Mathematics', 'Physics']
  );

  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    user?.interests?.length ? user.interests : ['Programming', 'Technology', 'Artificial Intelligence']
  );

  const [skills, setSkills] = useState<{ skillName: string; level: number }[]>(
    user?.skills?.length
      ? user.skills
      : [
          { skillName: 'Python', level: 50 },
          { skillName: 'Mathematics', level: 65 },
          { skillName: 'HTML', level: 60 }
        ]
  );

  const [selectedStrengths, setSelectedStrengths] = useState<string[]>(
    user?.strengths?.length ? user.strengths : ['Logical Thinking', 'Problem Solving', 'Technical Interest']
  );

  const [careerGoal, setCareerGoal] = useState(user?.careerGoal || 'Software Developer');

  const subjectOptions = [
    'Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 
    'Accountancy', 'Economics', 'Business Studies', 'Fine Arts / Design', 'English', 'Statistics'
  ];

  const interestOptions = [
    'Programming', 'Technology', 'Artificial Intelligence', 'Web Design', 'Data Science', 
    'Cyber Security', 'Genetics & Biology', 'Healthcare & Medicine', 'Stocks & Finance', 
    'Graphic Design', 'Game Dev', 'Robotics & Hardware', 'Research & Analysis'
  ];

  const strengthOptions = [
    'Logical Thinking', 'Problem Solving', 'Creativity & Design', 'Communication', 
    'Research & Investigation', 'Mathematical Aptitude', 'Leadership'
  ];

  const toggleSubject = (subj: string) => {
    if (selectedSubjects.includes(subj)) {
      setSelectedSubjects(selectedSubjects.filter(s => s !== subj));
    } else {
      setSelectedSubjects([...selectedSubjects, subj]);
    }
  };

  const toggleInterest = (intr: string) => {
    if (selectedInterests.includes(intr)) {
      setSelectedInterests(selectedInterests.filter(i => i !== intr));
    } else {
      setSelectedInterests([...selectedInterests, intr]);
    }
  };

  const toggleStrength = (st: string) => {
    if (selectedStrengths.includes(st)) {
      setSelectedStrengths(selectedStrengths.filter(s => s !== st));
    } else {
      setSelectedStrengths([...selectedStrengths, st]);
    }
  };

  const updateSkillLevel = (skillName: string, level: number) => {
    setSkills(skills.map(s => s.skillName === skillName ? { ...s, level } : s));
  };

  const addCustomSkill = (skillName: string) => {
    if (!skills.some(s => s.skillName.toLowerCase() === skillName.toLowerCase())) {
      setSkills([...skills, { skillName, level: 40 }]);
    }
  };

  const handleFinishOnboarding = async () => {
    setLoading(true);
    try {
      const updatedUser = await userService.completeOnboarding({
        educationLevel,
        classYear,
        stream,
        subjects: selectedSubjects,
        interests: selectedInterests,
        skills,
        strengths: selectedStrengths,
        careerGoal
      });
      updateUser(updatedUser);
      navigate('/dashboard');
    } catch {
      alert('Failed to complete onboarding. Proceeding to dashboard.');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-xl p-6 sm:p-8 my-6 space-y-6 shadow-xs">
        
        {/* Step Progress Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              0{step}
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900">Student Profile Calibration</h1>
              <p className="text-xs text-slate-500">Step {step} of 6 • Academic Data Input</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === step
                    ? 'bg-blue-600'
                    : i < step
                    ? 'bg-slate-900'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* STEP 1: What are you studying? */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-0.5">Step 1: Academic Level & Stream</h2>
              <p className="text-xs text-slate-500">Select your current grade level and academic concentration.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1">Education Level</label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white min-h-[42px]"
                >
                  <option value="School (Class 9-10)">School (Class 9-10)</option>
                  <option value="High School (Class 11-12)">High School (Class 11-12)</option>
                  <option value="Undergraduate (College)">Undergraduate (College)</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Class / Year</label>
                <select
                  value={classYear}
                  onChange={(e) => setClassYear(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white min-h-[42px]"
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
                <label className="block text-slate-700 mb-1">Stream</label>
                <select
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white min-h-[42px]"
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Science (PCM)">Science (PCM)</option>
                  <option value="Biology (PCB)">Biology (PCB)</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts/Humanities">Arts / Humanities</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Favorite Subjects */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-0.5">Step 2: Core Academic Subjects</h2>
              <p className="text-xs text-slate-500">Select subjects you currently study or enjoy.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {subjectOptions.map((subj) => {
                const isSelected = selectedSubjects.includes(subj);
                return (
                  <button
                    key={subj}
                    type="button"
                    onClick={() => toggleSubject(subj)}
                    className={`p-3 rounded-lg border text-xs font-semibold transition-colors text-left flex items-center justify-between min-h-[40px] ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{subj}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Domain Interests */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-0.5">Step 3: Technical & Domain Interests</h2>
              <p className="text-xs text-slate-500">Select technical domains or career topics of interest.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {interestOptions.map((intr) => {
                const isSelected = selectedInterests.includes(intr);
                return (
                  <button
                    key={intr}
                    type="button"
                    onClick={() => toggleInterest(intr)}
                    className={`px-3 py-2 rounded-lg border text-xs font-semibold transition-colors flex items-center gap-1.5 min-h-[38px] ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{intr}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Skill Inventory */}
        {step === 4 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-0.5">Step 4: Skill Self-Assessment</h2>
              <p className="text-xs text-slate-500">Adjust proficiency levels for baseline technical skills.</p>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {skills.map((s) => (
                <div key={s.skillName} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-900">{s.skillName}</span>
                    <span className="text-blue-600 font-bold">{s.level}% Level</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={s.level}
                    onChange={(e) => updateSkillLevel(s.skillName, parseInt(e.target.value))}
                    className="w-full accent-slate-900 cursor-pointer min-h-[36px]"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              {['Python', 'JavaScript', 'HTML/CSS', 'SQL', 'Git', 'Data Structures', 'Excel', 'Power BI'].map((sk) => (
                <button
                  key={sk}
                  type="button"
                  onClick={() => addCustomSkill(sk)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-medium"
                >
                  + {sk}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: Cognitive Strengths */}
        {step === 5 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-0.5">Step 5: Cognitive Aptitude Strengths</h2>
              <p className="text-xs text-slate-500">Select core cognitive modalities.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {strengthOptions.map((st) => {
                const isSelected = selectedStrengths.includes(st);
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => toggleStrength(st)}
                    className={`p-3.5 rounded-lg border text-xs font-semibold transition-colors text-left flex items-center justify-between min-h-[40px] ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{st}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 6: Target Goal */}
        {step === 6 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-0.5">Step 6: Target Career Goal</h2>
              <p className="text-xs text-slate-500">Enter your primary career objective.</p>
            </div>

            <input
              type="text"
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
              placeholder="e.g. Software Developer, AI Engineer"
              className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:bg-white focus:border-blue-600 min-h-[42px]"
            />

            <div className="flex flex-wrap gap-2 text-xs">
              {['Software Developer', 'AI Engineer', 'Data Scientist', 'Web Developer', 'Cybersecurity Analyst', 'UI/UX Designer', 'Bioinformatics Analyst', 'Financial Analyst'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCareerGoal(c)}
                  className={`px-3 py-2 rounded-lg font-semibold transition-colors border min-h-[38px] ${
                    careerGoal === c
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>SkillSphere engine will calculate career match percentages, prerequisite roadmaps, and skill gap analysis.</span>
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-100">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-xs hover:bg-slate-200 transition-colors flex items-center gap-1 min-h-[40px]"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          ) : <div />}

          {step < 6 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors flex items-center gap-1 shadow-xs min-h-[40px]"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinishOnboarding}
              disabled={loading}
              className="px-6 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-xs min-h-[40px]"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>Complete Setup & View Dashboard</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
