import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [educationLevel, setEducationLevel] = useState('High School (Class 11-12)');
  const [classYear, setClassYear] = useState('12th');
  const [stream, setStream] = useState('Computer Science');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await register({
        name: fullName,
        email,
        password,
        educationLevel,
        classYear,
        stream
      });
      navigate('/onboarding');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-xl p-6 sm:p-10 shadow-sm space-y-6">
          
          {/* Header */}
          <div className="border-b border-slate-200 pb-4 space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> SkillSphere Enrollment
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Create Student Account</h1>
            <p className="text-xs text-slate-500">
              Initialize your profile to calculate Career DNA & skill gap analytics.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Alex Johnson"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Student Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="student@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Education Level
                </label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white font-medium"
                >
                  <option value="School (Class 9-10)">Class 9-10</option>
                  <option value="High School (Class 11-12)">Class 11-12</option>
                  <option value="Undergraduate (College)">Undergraduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Class / Year
                </label>
                <select
                  value={classYear}
                  onChange={(e) => setClassYear(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white font-medium"
                >
                  <option value="10th">10th Class</option>
                  <option value="11th">11th Class</option>
                  <option value="12th">12th Class</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Academic Stream
                </label>
                <select
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white font-medium"
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Science (PCM)">Science (PCM)</option>
                  <option value="Biology (PCB)">Biology (PCB)</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts/Humanities">Arts/Humanities</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 mt-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 min-h-[42px] shadow-xs"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Continue To Career Profile Setup</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="pt-4 border-t border-slate-200 text-center text-xs text-slate-500">
            Already registered?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-semibold">
              Sign In Here
            </Link>
          </p>

        </div>
      </div>

      <Footer />
    </div>
  );
};
