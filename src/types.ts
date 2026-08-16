export type Role = 'student' | 'mentor' | 'admin';

export interface SkillRating {
  skillName: string;
  level: number; // 0 to 100
}

export interface CareerDnaMetrics {
  logicalThinking: number;
  problemSolving: number;
  creativity: number;
  communication: number;
  technicalInterest: number;
  mathematicalInterest: number;
  researchInterest: number;
  leadership: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  profileImage?: string;
  educationLevel: string; // e.g., 'School (Class 9-10)', 'High School (Class 11-12)', 'Undergraduate (College)', 'Postgraduate'
  classYear: string; // e.g., '10th', '12th', '2nd Year'
  stream: string; // e.g., 'Computer Science', 'Science (PCM)', 'Biology (PCB)', 'Commerce', 'Arts/Humanities'
  subjects: string[];
  interests: string[];
  skills: SkillRating[];
  strengths: string[];
  weaknesses: string[];
  careerGoal?: string;
  careerDnaMetrics: CareerDnaMetrics;
  xp: number;
  level: number;
  badges: string[];
  completedMissions: string[];
  createdAt: string;
}

export interface CareerSkillRequirement {
  skillName: string;
  requiredLevel: number; // 0 to 100
  importance: 'Critical' | 'High' | 'Medium' | 'Optional';
}

export interface RoadmapStage {
  stage: string; // e.g., 'Class 10', 'Class 11-12', 'College Year 1-2', 'College Year 3-4', 'Career Entry'
  title: string;
  description: string;
  skillsToLearn: string[];
  milestones: string[];
}

export interface Career {
  id: string;
  name: string;
  description: string;
  category: string; // e.g., 'Engineering & Tech', 'Data & AI', 'Design & Creative', 'Business & Finance', 'Healthcare & Bio', 'Robotics & Core'
  requiredSubjects: string[];
  requiredSkills: CareerSkillRequirement[];
  recommendedSkills: string[];
  interests: string[];
  educationPaths: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  careerDomains: string[];
  alternativeCareers: string[];
  roadmap: RoadmapStage[];
  salaryRange?: string;
  demandRating?: number; // 1 to 5 stars
  programmingReq?: number; // 0 to 100
  mathReq?: number; // 0 to 100
  creativityReq?: number; // 0 to 100
  isPopular?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites: string[]; // skill names that should be learned before
  careerRelevance: string[];
}

export interface Course {
  id: string;
  name: string;
  description: string;
  skill: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  careerRelevance: string;
  provider?: string;
  isSideCourse?: boolean;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  skill: string;
  xp: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  completed?: boolean;
}

export interface CareerMatchResult {
  career: Career;
  matchScore: number; // 0 to 100
  subjectMatch: number;
  interestMatch: number;
  skillMatch: number;
  strengthMatch: number;
  reason: string;
}

export interface SkillGapItem {
  skill: string;
  current: number;
  required: number;
  gap: number;
  importance: string;
}

export interface NextBestSkillRecommendation {
  skillName: string;
  category: string;
  reason: string;
  prerequisiteFor: string[];
  targetCareer: string;
}

export interface SideCourseRecommendation {
  course: Course;
  why: string;
  benefitToMajor: string;
}

export interface HiddenCareerRecommendation {
  career: Career;
  reason: string;
  matchPercentage: number;
}

export interface RecommendationResponse {
  topCareers: CareerMatchResult[];
  nextBestSkill: NextBestSkillRecommendation | null;
  skillGaps: SkillGapItem[];
  sideCourses: SideCourseRecommendation[];
  hiddenCareers: HiddenCareerRecommendation[];
}

export type ThemeMode = 'light' | 'dark' | 'system';
export type AccentColor = 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'cyan' | 'indigo' | 'red';
export type BackgroundStyle = 'default' | 'solid' | 'gradient' | 'mesh' | 'glass';
export type UIStyle = 'minimal' | 'rounded' | 'glass' | 'elevated';
export type BorderRadius = 'sharp' | 'medium' | 'rounded';
export type TypographyStyle = 'default' | 'modern' | 'professional';

export interface ThemeConfig {
  mode: ThemeMode;
  accent: AccentColor;
  background: BackgroundStyle;
  uiStyle: UIStyle;
  radius: BorderRadius;
  typography: TypographyStyle;
}
