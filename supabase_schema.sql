-- SkillSphere Supabase PostgreSQL Schema Setup
-- Run this SQL code inside your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Users Table
CREATE TABLE IF NOT EXISTS public.users (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) DEFAULT 'student',
  profile_image TEXT,
  education_level VARCHAR(100) DEFAULT 'High School (Class 11-12)',
  class_year VARCHAR(50) DEFAULT '12th',
  stream VARCHAR(100) DEFAULT 'Computer Science',
  subjects JSONB DEFAULT '[]'::jsonb,
  interests JSONB DEFAULT '[]'::jsonb,
  skills JSONB DEFAULT '[]'::jsonb,
  strengths JSONB DEFAULT '[]'::jsonb,
  weaknesses JSONB DEFAULT '[]'::jsonb,
  career_goal VARCHAR(255),
  career_dna_metrics JSONB DEFAULT '{}'::jsonb,
  xp INTEGER DEFAULT 100,
  level INTEGER DEFAULT 1,
  badges JSONB DEFAULT '[]'::jsonb,
  completed_missions JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Careers Table
CREATE TABLE IF NOT EXISTS public.careers (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  salary_range VARCHAR(100),
  difficulty VARCHAR(50),
  stream_affinity JSONB DEFAULT '[]'::jsonb,
  required_skills JSONB DEFAULT '[]'::jsonb,
  education_paths JSONB DEFAULT '[]'::jsonb,
  demand_rating NUMERIC DEFAULT 4.5,
  programming_req INTEGER DEFAULT 70,
  math_req INTEGER DEFAULT 60,
  creativity_req INTEGER DEFAULT 60,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  difficulty_level VARCHAR(50),
  prerequisite_for JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  duration VARCHAR(50),
  skill VARCHAR(100),
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Create Missions Table
CREATE TABLE IF NOT EXISTS public.missions (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  xp INTEGER DEFAULT 100,
  category VARCHAR(100),
  skill VARCHAR(100),
  duration VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.missions ENABLE ROW LEVEL SECURITY;

-- 8. Create Permissive Policies for API Key Access
CREATE POLICY "Allow public read on careers" ON public.careers FOR SELECT USING (true);
CREATE POLICY "Allow public read on skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Allow public read on courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Allow public read on missions" ON public.missions FOR SELECT USING (true);

CREATE POLICY "Allow full access to users table" ON public.users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow full access to careers table" ON public.careers FOR ALL USING (true) WITH CHECK (true);
