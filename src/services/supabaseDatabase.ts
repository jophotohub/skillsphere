import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';
import { User, Career, Course, Mission, Skill } from '../types';

export const supabaseDatabase = {
  // Check if Supabase is connected and ready
  isReady(): boolean {
    return isSupabaseConfigured();
  },

  // User Operations
  async getUserByEmail(email: string): Promise<User | null> {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email.toLowerCase())
        .maybeSingle();

      if (error) {
        console.warn('[Supabase] getUserByEmail warning:', error.message);
        return null;
      }
      return data ? formatSupabaseUser(data) : null;
    } catch (err) {
      console.error('[Supabase] getUserByEmail failed:', err);
      return null;
    }
  },

  async getUserById(id: string): Promise<User | null> {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.warn('[Supabase] getUserById warning:', error.message);
        return null;
      }
      return data ? formatSupabaseUser(data) : null;
    } catch (err) {
      console.error('[Supabase] getUserById failed:', err);
      return null;
    }
  },

  async upsertUser(user: User): Promise<User | null> {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    try {
      const dbPayload = {
        id: user.id,
        name: user.name,
        email: user.email.toLowerCase(),
        role: user.role,
        profile_image: user.profileImage || null,
        education_level: user.educationLevel,
        class_year: user.classYear,
        stream: user.stream,
        subjects: user.subjects,
        interests: user.interests,
        skills: user.skills,
        strengths: user.strengths,
        weaknesses: user.weaknesses,
        career_goal: user.careerGoal || null,
        career_dna_metrics: user.careerDnaMetrics,
        xp: user.xp,
        level: user.level,
        badges: user.badges,
        completed_missions: user.completedMissions,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('users')
        .upsert(dbPayload, { onConflict: 'id' })
        .select()
        .single();

      if (error) {
        console.error('[Supabase] upsertUser error:', error.message);
        return null;
      }
      return data ? formatSupabaseUser(data) : null;
    } catch (err) {
      console.error('[Supabase] upsertUser failed:', err);
      return null;
    }
  },

  // Careers Operations
  async getCareers(): Promise<Career[] | null> {
    const supabase = getSupabaseClient();
    if (!supabase) return null;

    try {
      const { data, error } = await supabase.from('careers').select('*');
      if (error || !data || data.length === 0) {
        return null;
      }
      return data.map(formatSupabaseCareer);
    } catch {
      return null;
    }
  },

  async seedInitialCareers(careers: Career[]): Promise<boolean> {
    const supabase = getSupabaseClient();
    if (!supabase) return false;

    try {
      const payload = careers.map(c => ({
        id: c.id,
        name: c.name,
        category: c.category,
        description: c.description,
        salary_range: c.salaryRange,
        difficulty: c.difficulty,
        required_subjects: c.requiredSubjects,
        required_skills: c.requiredSkills,
        education_paths: c.educationPaths,
        demand_rating: c.demandRating,
        programming_req: c.programmingReq,
        math_req: c.mathReq,
        creativity_req: c.creativityReq
      }));

      const { error } = await supabase.from('careers').upsert(payload, { onConflict: 'id' });
      if (error) console.warn('[Supabase] seedInitialCareers warning:', error.message);
      return !error;
    } catch {
      return false;
    }
  }
};

// Helper transformers between Supabase snake_case and TypeScript camelCase
function formatSupabaseUser(raw: any): User {
  return {
    id: raw.id,
    name: raw.name,
    email: raw.email,
    role: raw.role || 'student',
    profileImage: raw.profile_image || undefined,
    educationLevel: raw.education_level || 'High School (Class 11-12)',
    classYear: raw.class_year || '12th',
    stream: raw.stream || 'Computer Science',
    subjects: Array.isArray(raw.subjects) ? raw.subjects : [],
    interests: Array.isArray(raw.interests) ? raw.interests : [],
    skills: Array.isArray(raw.skills) ? raw.skills : [],
    strengths: Array.isArray(raw.strengths) ? raw.strengths : [],
    weaknesses: Array.isArray(raw.weaknesses) ? raw.weaknesses : [],
    careerGoal: raw.career_goal || undefined,
    careerDnaMetrics: raw.career_dna_metrics || {
      logicalThinking: 70,
      problemSolving: 70,
      creativity: 60,
      communication: 60,
      technicalInterest: 70,
      mathematicalInterest: 65,
      researchInterest: 60,
      leadership: 55
    },
    xp: raw.xp || 0,
    level: raw.level || 1,
    badges: Array.isArray(raw.badges) ? raw.badges : [],
    completedMissions: Array.isArray(raw.completed_missions) ? raw.completed_missions : [],
    createdAt: raw.created_at || new Date().toISOString()
  };
}

function formatSupabaseCareer(raw: any): Career {
  return {
    id: raw.id,
    name: raw.name,
    category: raw.category,
    description: raw.description,
    salaryRange: raw.salary_range,
    difficulty: raw.difficulty || 'Intermediate',
    requiredSubjects: raw.required_subjects || [],
    requiredSkills: raw.required_skills || [],
    recommendedSkills: raw.recommended_skills || [],
    interests: raw.interests || [],
    educationPaths: raw.education_paths || [],
    careerDomains: raw.career_domains || [],
    alternativeCareers: raw.alternative_careers || [],
    roadmap: raw.roadmap || [],
    demandRating: raw.demand_rating || 4,
    programmingReq: raw.programming_req || 70,
    mathReq: raw.math_req || 60,
    creativityReq: raw.creativity_req || 60,
    isPopular: raw.is_popular
  };
}
