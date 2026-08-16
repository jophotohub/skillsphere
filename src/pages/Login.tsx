import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/Logo';
import { Eye, EyeOff, LogIn, Shield, Users, ArrowRight } from 'lucide-react';

export const Login: React.FC = () => {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'student' | 'mentor'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email || (activeTab === 'student' ? 'student@skillsphere.ai' : 'admin@skillsphere.ai'), password || (activeTab === 'student' ? 'password123' : 'admin123'));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoStudentLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await login('student@skillsphere.ai', 'password123');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAdminLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await login('admin@skillsphere.ai', 'admin123');
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Admin login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignInMock = async () => {
    setLoading(true);
    try {
      await googleLogin('google.student@skillsphere.ai', 'Alex Rivera', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb');
      navigate('/dashboard');
    } catch (err: any) {
      setError('Google Sign-In failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      
      {/* Main Responsive Card Container */}
      <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-xl p-6 sm:p-10 shadow-sm z-10 my-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Header & Brand Section */}
          <div className="lg:col-span-5 space-y-4 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0 lg:pr-8">
            
            {/* Logo */}
            <div className="inline-flex items-center">
              <Logo variant="full" size="lg" showTagline={true} />
            </div>

            {/* Platform Description */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2 text-left">
              <span className="text-xs font-bold text-blue-600 block uppercase tracking-wider">
                Career Intelligence Engine
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Access data-backed career vector maps, skill gap diagnostics, and professional degree pathways.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1 text-[10px] font-semibold text-slate-600">
                <span className="px-2 py-0.5 rounded bg-white border border-slate-200">Engineering</span>
                <span className="px-2 py-0.5 rounded bg-white border border-slate-200">Analytics</span>
                <span className="px-2 py-0.5 rounded bg-white border border-slate-200">Healthcare</span>
              </div>
            </div>

          </div>

          {/* Form Controls Section */}
          <div className="lg:col-span-7 space-y-5">
            
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Sign In to Account</h1>
              <p className="text-xs text-slate-500 mt-1">Select your account type to proceed.</p>
            </div>

            {/* Role Tabs */}
            <div className="flex p-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('student')}
                className={`flex-1 py-2 rounded-md transition-colors min-h-[40px] flex items-center justify-center gap-2 ${
                  activeTab === 'student'
                    ? 'bg-slate-900 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('mentor')}
                className={`flex-1 py-2 rounded-md transition-colors min-h-[40px] flex items-center justify-center gap-2 ${
                  activeTab === 'mentor'
                    ? 'bg-slate-900 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Mentor / Admin</span>
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Email & Password Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder={activeTab === 'student' ? "student@skillsphere.ai" : "admin@skillsphere.ai"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-medium"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Password reset instructions sent.')}
                    className="text-xs text-blue-600 hover:underline font-semibold"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-xs focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-medium pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 min-h-[42px] shadow-xs"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            {/* Demo Buttons */}
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold pt-1">
              <button
                type="button"
                onClick={handleDemoStudentLogin}
                className="py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors border border-slate-200"
              >
                Demo Student Account
              </button>
              <button
                type="button"
                onClick={handleDemoAdminLogin}
                className="py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors border border-slate-200"
              >
                Demo Admin Account
              </button>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-semibold uppercase tracking-wider">OR</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Google Sign-In */}
            <button
              type="button"
              onClick={handleGoogleSignInMock}
              className="w-full py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 transition-colors flex items-center justify-center gap-2 min-h-[42px]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <p className="text-center text-xs text-slate-500 pt-2">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline font-semibold">
                Register Student Account
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};
