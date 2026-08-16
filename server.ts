import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { INITIAL_CAREERS, INITIAL_SKILLS, INITIAL_COURSES, INITIAL_MISSIONS } from './src/data/seedData';
import { generateFullRecommendations, calculateCareerMatch, analyzeSkillGaps } from './src/lib/recommendationEngine';
import { User, Career, Skill, Course, Mission } from './src/types';
import { isSupabaseConfigured } from './src/lib/supabase';
import { supabaseDatabase } from './src/services/supabaseDatabase';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Database Store with MongoDB Atlas connection readiness
let usersStore: User[] = [
  {
    id: 'u_demo',
    name: 'Alex Johnson',
    email: 'student@skillsphere.ai',
    role: 'student',
    educationLevel: 'High School (Class 11-12)',
    classYear: '12th',
    stream: 'Computer Science',
    subjects: ['Computer Science', 'Mathematics', 'Physics', 'Chemistry'],
    interests: ['Programming', 'Technology', 'Artificial Intelligence', 'Web Design'],
    skills: [
      { skillName: 'Python', level: 65 },
      { skillName: 'Mathematics', level: 70 },
      { skillName: 'Statistics', level: 35 },
      { skillName: 'Machine Learning', level: 15 },
      { skillName: 'Git', level: 30 },
      { skillName: 'HTML', level: 80 },
      { skillName: 'CSS', level: 75 },
      { skillName: 'JavaScript', level: 60 }
    ],
    strengths: ['Logical Thinking', 'Problem Solving', 'Technical Interest'],
    weaknesses: ['Public Speaking'],
    careerGoal: 'AI Engineer',
    careerDnaMetrics: {
      logicalThinking: 88,
      problemSolving: 84,
      creativity: 72,
      communication: 65,
      technicalInterest: 91,
      mathematicalInterest: 78,
      researchInterest: 80,
      leadership: 60
    },
    xp: 750,
    level: 3,
    badges: ['AI Explorer', 'First Code', 'Skill Pioneer'],
    completedMissions: ['m1', 'm2'],
    createdAt: new Date().toISOString()
  },
  {
    id: 'u_admin',
    name: 'Dr. Sarah Connor',
    email: 'admin@skillsphere.ai',
    role: 'admin',
    educationLevel: 'Postgraduate',
    classYear: 'Mentor',
    stream: 'Computer Science',
    subjects: ['Computer Science', 'Mathematics'],
    interests: ['Mentorship', 'Career Guidance'],
    skills: [{ skillName: 'Python', level: 95 }],
    strengths: ['Leadership'],
    weaknesses: [],
    careerDnaMetrics: {
      logicalThinking: 95,
      problemSolving: 90,
      creativity: 85,
      communication: 95,
      technicalInterest: 95,
      mathematicalInterest: 90,
      researchInterest: 90,
      leadership: 95
    },
    xp: 2500,
    level: 10,
    badges: ['Platform Master', 'Top Mentor'],
    completedMissions: [],
    createdAt: new Date().toISOString()
  }
];

let careersStore: Career[] = [...INITIAL_CAREERS];
let skillsStore: Skill[] = [...INITIAL_SKILLS];
let coursesStore: Course[] = [...INITIAL_COURSES];
let missionsStore: Mission[] = [...INITIAL_MISSIONS];

// Simple JWT token generator for auth
function generateToken(user: User): string {
  const payload = { id: user.id, email: user.email, role: user.role, name: user.name };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

function decodeToken(token: string): any {
  try {
    const jsonStr = Buffer.from(token, 'base64').toString('utf8');
    return JSON.parse(jsonStr);
  } catch {
    return null;
  }
}

// Authentication Middleware
async function authenticateUser(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }
  const token = authHeader.split(' ')[1];
  const decoded = decodeToken(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  let user = usersStore.find(u => u.id === decoded.id || u.email.toLowerCase() === decoded.email?.toLowerCase());

  // Check Supabase if configured and user not in memory
  if (!user && isSupabaseConfigured()) {
    const sbUser = await supabaseDatabase.getUserByEmail(decoded.email);
    if (sbUser) {
      user = sbUser;
      usersStore.push(sbUser);
    }
  }

  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }
  req.user = user;
  next();
}

// ==================== REST API ROUTES ====================

// Health Check
app.get('/api/health', (req, res) => {
  const supabaseConfigured = isSupabaseConfigured();
  res.json({ 
    status: 'ok', 
    app: 'SkillSphere', 
    version: '1.0.0', 
    database: {
      supabaseConfigured,
      supabaseStatus: supabaseConfigured ? 'Active & Ready' : 'Pending Credentials in .env'
    }
  });
});

// Dedicated Supabase status endpoint for admin/debug
app.get('/api/admin/supabase-status', (req, res) => {
  const configured = isSupabaseConfigured();
  res.json({
    configured,
    url: process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'Not Set',
    instructions: configured 
      ? 'Supabase is fully configured and connected!' 
      : 'Set SUPABASE_URL and SUPABASE_ANON_KEY in your .env file or environment variables.',
    schemaFile: '/supabase_schema.sql'
  });
});

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, educationLevel, classYear, stream, role } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  let existing = usersStore.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!existing && isSupabaseConfigured()) {
    existing = await supabaseDatabase.getUserByEmail(email);
  }

  if (existing) {
    return res.status(400).json({ error: 'An account with this email already exists' });
  }

  const newUser: User = {
    id: 'u_' + Date.now(),
    name,
    email,
    role: role || 'student',
    educationLevel: educationLevel || 'High School (Class 11-12)',
    classYear: classYear || '11th',
    stream: stream || 'Computer Science',
    subjects: ['Computer Science', 'Mathematics', 'Physics'],
    interests: ['Programming', 'Technology'],
    skills: [
      { skillName: 'Python', level: 30 },
      { skillName: 'Mathematics', level: 60 },
      { skillName: 'HTML', level: 50 }
    ],
    strengths: ['Logical Thinking', 'Problem Solving'],
    weaknesses: [],
    careerDnaMetrics: {
      logicalThinking: 75,
      problemSolving: 70,
      creativity: 65,
      communication: 60,
      technicalInterest: 80,
      mathematicalInterest: 70,
      researchInterest: 65,
      leadership: 55
    },
    xp: 100,
    level: 1,
    badges: ['Welcome Pioneer'],
    completedMissions: [],
    createdAt: new Date().toISOString()
  };

  usersStore.push(newUser);

  // Sync to Supabase if configured
  if (isSupabaseConfigured()) {
    await supabaseDatabase.upsertUser(newUser);
  }

  const token = generateToken(newUser);
  res.status(201).json({ token, user: newUser });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  let user = usersStore.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user && isSupabaseConfigured()) {
    const sbUser = await supabaseDatabase.getUserByEmail(email);
    if (sbUser) {
      user = sbUser;
      usersStore.push(sbUser);
    }
  }

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = generateToken(user);
  res.json({ token, user });
});

app.post('/api/auth/google', async (req, res) => {
  const { googleToken, email, name, picture } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Google authentication payload missing email' });
  }

  let user = usersStore.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user && isSupabaseConfigured()) {
    user = await supabaseDatabase.getUserByEmail(email) || undefined;
    if (user) usersStore.push(user);
  }

  if (!user) {
    user = {
      id: 'u_g_' + Date.now(),
      name: name || 'Google Student',
      email,
      role: 'student',
      profileImage: picture,
      educationLevel: 'High School (Class 11-12)',
      classYear: '12th',
      stream: 'Computer Science',
      subjects: ['Computer Science', 'Mathematics', 'Physics'],
      interests: ['Technology', 'Programming', 'AI'],
      skills: [
        { skillName: 'Python', level: 50 },
        { skillName: 'Mathematics', level: 65 }
      ],
      strengths: ['Logical Thinking', 'Technical Interest'],
      weaknesses: [],
      careerDnaMetrics: {
        logicalThinking: 80,
        problemSolving: 78,
        creativity: 70,
        communication: 65,
        technicalInterest: 85,
        mathematicalInterest: 75,
        researchInterest: 70,
        leadership: 60
      },
      xp: 200,
      level: 1,
      badges: ['Google Authenticated'],
      completedMissions: [],
      createdAt: new Date().toISOString()
    };
    usersStore.push(user);
  }

  if (isSupabaseConfigured()) {
    await supabaseDatabase.upsertUser(user);
  }

  const token = generateToken(user);
  res.json({ token, user });
});

app.get('/api/auth/me', authenticateUser, (req: any, res) => {
  res.json({ user: req.user });
});

// User Onboarding & Profile Updates
app.put('/api/users/profile', authenticateUser, async (req: any, res) => {
  const user = req.user as User;
  const { educationLevel, classYear, stream, subjects, interests, skills, strengths, weaknesses, careerGoal, careerDnaMetrics } = req.body;

  if (educationLevel) user.educationLevel = educationLevel;
  if (classYear) user.classYear = classYear;
  if (stream) user.stream = stream;
  if (subjects) user.subjects = subjects;
  if (interests) user.interests = interests;
  if (skills) user.skills = skills;
  if (strengths) user.strengths = strengths;
  if (weaknesses) user.weaknesses = weaknesses;
  if (careerGoal !== undefined) user.careerGoal = careerGoal;
  if (careerDnaMetrics) user.careerDnaMetrics = careerDnaMetrics;

  if (isSupabaseConfigured()) {
    await supabaseDatabase.upsertUser(user);
  }

  res.json({ message: 'Profile updated successfully', user });
});

app.post('/api/users/onboarding', authenticateUser, async (req: any, res) => {
  const user = req.user as User;
  const { educationLevel, classYear, stream, subjects, interests, skills, strengths, careerGoal } = req.body;

  user.educationLevel = educationLevel || user.educationLevel;
  user.classYear = classYear || user.classYear;
  user.stream = stream || user.stream;
  user.subjects = subjects || user.subjects;
  user.interests = interests || user.interests;
  user.skills = skills || user.skills;
  user.strengths = strengths || user.strengths;
  user.careerGoal = careerGoal || user.careerGoal;

  // Compute Career DNA metrics mathematically based on selections
  let logical = 70, problem = 70, creativity = 60, comm = 60, tech = 70, math = 65, research = 60, leadership = 55;
  if (subjects?.includes('Mathematics')) { math += 20; logical += 10; }
  if (subjects?.includes('Computer Science')) { tech += 20; problem += 15; }
  if (interests?.includes('Artificial Intelligence') || interests?.includes('Programming')) { tech += 15; problem += 10; }
  if (interests?.includes('Web Design') || interests?.includes('Design')) { creativity += 25; }
  if (strengths?.includes('Research')) { research += 25; }
  if (strengths?.includes('Communication')) { comm += 25; leadership += 20; }

  user.careerDnaMetrics = {
    logicalThinking: Math.min(98, logical),
    problemSolving: Math.min(98, problem),
    creativity: Math.min(98, creativity),
    communication: Math.min(98, comm),
    technicalInterest: Math.min(98, tech),
    mathematicalInterest: Math.min(98, math),
    researchInterest: Math.min(98, research),
    leadership: Math.min(98, leadership)
  };

  user.xp += 200; // Award XP for completing Career DNA onboarding
  if (!user.badges.includes('Career DNA Created')) {
    user.badges.push('Career DNA Created');
  }

  if (isSupabaseConfigured()) {
    await supabaseDatabase.upsertUser(user);
  }

  res.json({ message: 'Career DNA Onboarding Complete!', user });
});

// Careers Endpoints
app.get('/api/careers', (req, res) => {
  res.json(careersStore);
});

app.get('/api/careers/:id', (req, res) => {
  const career = careersStore.find(c => c.id === req.params.id);
  if (!career) {
    return res.status(404).json({ error: 'Career not found' });
  }
  res.json(career);
});

// Recommendations Endpoint
app.get('/api/recommendations/me', authenticateUser, (req: any, res) => {
  const user = req.user as User;
  const recommendations = generateFullRecommendations(user, careersStore);
  res.json(recommendations);
});

app.post('/api/recommendations/generate', authenticateUser, (req: any, res) => {
  const user = req.user as User;
  const recommendations = generateFullRecommendations(user, careersStore);
  res.json(recommendations);
});

// Skill Gap Endpoint
app.post('/api/skill-gap/analyze', authenticateUser, (req: any, res) => {
  const user = req.user as User;
  const { targetCareerId } = req.body;
  const career = careersStore.find(c => c.id === targetCareerId) || careersStore[0];
  const gaps = analyzeSkillGaps(user, career);
  res.json({ career, gaps });
});

// Courses & Skills
app.get('/api/courses', (req, res) => {
  res.json(coursesStore);
});

app.get('/api/skills', (req, res) => {
  res.json(skillsStore);
});

// Quests & Gamification Missions
app.get('/api/missions', authenticateUser, (req: any, res) => {
  const user = req.user as User;
  const formattedMissions = missionsStore.map(m => ({
    ...m,
    completed: user.completedMissions.includes(m.id)
  }));
  res.json(formattedMissions);
});

app.post('/api/missions/:id/complete', authenticateUser, async (req: any, res) => {
  const user = req.user as User;
  const missionId = req.params.id;
  const mission = missionsStore.find(m => m.id === missionId);

  if (!mission) {
    return res.status(404).json({ error: 'Mission not found' });
  }

  if (!user.completedMissions.includes(missionId)) {
    user.completedMissions.push(missionId);
    user.xp += mission.xp;
    user.level = Math.floor(user.xp / 300) + 1; // Level up calculation

    // Update skill level in user profile automatically!
    const existingSkill = user.skills.find(s => s.skillName.toLowerCase() === mission.skill.toLowerCase());
    if (existingSkill) {
      existingSkill.level = Math.min(100, existingSkill.level + 15);
    } else {
      user.skills.push({ skillName: mission.skill, level: 35 });
    }

    if (isSupabaseConfigured()) {
      await supabaseDatabase.upsertUser(user);
    }
  }

  res.json({ message: `Mission completed! +${mission.xp} XP earned!`, user, mission });
});

// Global Search Endpoint
app.get('/api/search', (req, res) => {
  const query = ((req.query.q as string) || '').toLowerCase().trim();
  if (!query) {
    return res.json({ careers: [], skills: [], courses: [] });
  }

  const careers = careersStore.filter(c => c.name.toLowerCase().includes(query) || c.category.toLowerCase().includes(query) || c.description.toLowerCase().includes(query));
  const skills = skillsStore.filter(s => s.name.toLowerCase().includes(query) || s.category.toLowerCase().includes(query));
  const courses = coursesStore.filter(co => co.name.toLowerCase().includes(query) || co.skill.toLowerCase().includes(query));

  res.json({ careers, skills, courses });
});

// Admin Stats & CRUD Endpoint
app.get('/api/admin/stats', authenticateUser, (req: any, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'mentor') {
    return res.status(403).json({ error: 'Access denied: Admin/Mentor role required' });
  }

  res.json({
    totalStudents: usersStore.filter(u => u.role === 'student').length,
    totalCareers: careersStore.length,
    totalSkills: skillsStore.length,
    totalCourses: coursesStore.length,
    popularCareer: 'Software Developer',
    mostRecommendedSkill: 'Python',
    students: usersStore.map(u => ({ id: u.id, name: u.name, email: u.email, stream: u.stream, xp: u.xp, level: u.level }))
  });
});

app.post('/api/admin/careers', authenticateUser, (req: any, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied: Admin role required' });
  }
  const newCareer: Career = {
    ...req.body,
    id: 'c_' + Date.now()
  };
  careersStore.push(newCareer);
  res.status(201).json({ message: 'Career added successfully', career: newCareer });
});

// Setup Vite Development Middleware or Static Production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SkillSphere Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
