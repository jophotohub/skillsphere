import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { CareerDNA } from './pages/CareerDNA';
import { CareerGalaxy } from './pages/CareerGalaxy';
import { CareerMatch } from './pages/CareerMatch';
import { SkillGap } from './pages/SkillGap';
import { LearnNext } from './pages/LearnNext';
import { SideCourses } from './pages/SideCourses';
import { HiddenCareers } from './pages/HiddenCareers';
import { WhatIfExplorer } from './pages/WhatIfExplorer';
import { CareerCompare } from './pages/CareerCompare';
import { CareerQuest } from './pages/CareerQuest';
import { RoadmapDetail } from './pages/RoadmapDetail';
import { MentorConnect } from './pages/MentorConnect';
import { AdminAnalytics } from './pages/AdminAnalytics';
import { ProfileSettings } from './pages/ProfileSettings';

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Onboarding */}
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute showLayout={false}>
                  <Onboarding />
                </ProtectedRoute>
              }
            />

            {/* Protected Application Routes with Sidebar/Navbar Layout */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/career-dna"
              element={
                <ProtectedRoute>
                  <CareerDNA />
                </ProtectedRoute>
              }
            />

            <Route
              path="/career-galaxy"
              element={
                <ProtectedRoute>
                  <CareerGalaxy />
                </ProtectedRoute>
              }
            />

            <Route
              path="/career-match"
              element={
                <ProtectedRoute>
                  <CareerMatch />
                </ProtectedRoute>
              }
            />

            <Route
              path="/skill-gap"
              element={
                <ProtectedRoute>
                  <SkillGap />
                </ProtectedRoute>
              }
            />

            <Route
              path="/learn-next"
              element={
                <ProtectedRoute>
                  <LearnNext />
                </ProtectedRoute>
              }
            />

            <Route
              path="/side-courses"
              element={
                <ProtectedRoute>
                  <SideCourses />
                </ProtectedRoute>
              }
            />

            <Route
              path="/hidden-careers"
              element={
                <ProtectedRoute>
                  <HiddenCareers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/what-if"
              element={
                <ProtectedRoute>
                  <WhatIfExplorer />
                </ProtectedRoute>
              }
            />

            <Route
              path="/career-compare"
              element={
                <ProtectedRoute>
                  <CareerCompare />
                </ProtectedRoute>
              }
            />

            <Route
              path="/career-quest"
              element={
                <ProtectedRoute>
                  <CareerQuest />
                </ProtectedRoute>
              }
            />

            <Route
              path="/careers/:id"
              element={
                <ProtectedRoute>
                  <RoadmapDetail />
                </ProtectedRoute>
              }
            />

            <Route
              path="/mentors"
              element={
                <ProtectedRoute>
                  <MentorConnect />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminAnalytics />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileSettings />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <ProfileSettings defaultTab="theme" />
                </ProtectedRoute>
              }
            />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}


export default App;
