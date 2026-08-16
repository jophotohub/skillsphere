import { User, Career, CareerMatchResult, SkillGapItem, NextBestSkillRecommendation, SideCourseRecommendation, HiddenCareerRecommendation, RecommendationResponse, Course } from '../types';
import { INITIAL_CAREERS, INITIAL_SKILLS, INITIAL_COURSES } from '../data/seedData';

// Normalized cosine / Jaccard similarity & weighted matrix calculator
export function calculateCareerMatch(user: Partial<User>, career: Career): CareerMatchResult {
  const userSubjects = user.subjects || [];
  const userInterests = user.interests || [];
  const userSkillsMap = new Map((user.skills || []).map(s => [s.skillName.toLowerCase(), s.level]));
  const userStrengths = user.strengths || [];
  const userStream = user.stream || '';
  const userGoal = user.careerGoal || '';

  // 1. Subject Match (0.25)
  const reqSubjects = career.requiredSubjects || [];
  let subjectMatchCount = 0;
  reqSubjects.forEach(subj => {
    if (userSubjects.some(s => s.toLowerCase().includes(subj.toLowerCase()) || subj.toLowerCase().includes(s.toLowerCase()))) {
      subjectMatchCount++;
    }
  });
  const subjectScore = reqSubjects.length > 0 ? (subjectMatchCount / reqSubjects.length) * 100 : 70;

  // 2. Interest Match (0.20)
  const reqInterests = career.interests || [];
  let interestMatchCount = 0;
  reqInterests.forEach(intr => {
    if (userInterests.some(i => i.toLowerCase().includes(intr.toLowerCase()) || intr.toLowerCase().includes(i.toLowerCase()))) {
      interestMatchCount++;
    }
  });
  const interestScore = reqInterests.length > 0 ? (interestMatchCount / reqInterests.length) * 100 : 60;

  // 3. Skill Match (0.20)
  const reqSkills = career.requiredSkills || [];
  let skillTotalScore = 0;
  reqSkills.forEach(req => {
    const userLevel = userSkillsMap.get(req.skillName.toLowerCase()) || 0;
    const ratio = Math.min(1, userLevel / req.requiredLevel);
    skillTotalScore += ratio;
  });
  const skillScore = reqSkills.length > 0 ? (skillTotalScore / reqSkills.length) * 100 : 50;

  // 4. Strength Match (0.15)
  let strengthScore = 60;
  if (userStrengths.some(st => st.toLowerCase().includes('logical') || st.toLowerCase().includes('problem'))) {
    if (career.category === 'Engineering & Tech' || career.category === 'Data & AI') strengthScore += 25;
  }
  if (userStrengths.some(st => st.toLowerCase().includes('creativ') || st.toLowerCase().includes('design'))) {
    if (career.category === 'Design & Creative' || career.creativityReq && career.creativityReq > 70) strengthScore += 25;
  }
  if (userStrengths.some(st => st.toLowerCase().includes('research') || st.toLowerCase().includes('analytical'))) {
    if (career.category === 'Healthcare & Bio' || career.category === 'Data & AI') strengthScore += 25;
  }
  strengthScore = Math.min(100, strengthScore);

  // 5. Career Preference / Goal Match (0.10)
  let preferenceScore = 50;
  if (userGoal && career.name.toLowerCase().includes(userGoal.toLowerCase())) {
    preferenceScore = 100;
  } else if (userGoal && career.category.toLowerCase().includes(userGoal.toLowerCase())) {
    preferenceScore = 80;
  }

  // 6. Education Compatibility (0.10)
  let eduScore = 70;
  if (userStream) {
    if (userStream.includes('Computer Science') && (career.category === 'Engineering & Tech' || career.category === 'Data & AI')) eduScore = 95;
    if (userStream.includes('Biology') && (career.category === 'Healthcare & Bio' || career.name.includes('Bio') || career.name.includes('Health'))) eduScore = 95;
    if (userStream.includes('Commerce') && (career.category === 'Business & Finance' || career.name.includes('Financial') || career.name.includes('Account'))) eduScore = 95;
    if (userStream.includes('Design') && career.category === 'Design & Creative') eduScore = 95;
  }

  // Final Weighted Formula:
  // Career Score = Subject Match × 0.25 + Interest Match × 0.20 + Skill Match × 0.20 + Strength Match × 0.15 + Preference × 0.10 + Education × 0.10
  const totalWeighted = (subjectScore * 0.25) + (interestScore * 0.20) + (skillScore * 0.20) + (strengthScore * 0.15) + (preferenceScore * 0.10) + (eduScore * 0.10);

  // Normalize between 55% and 98% for realistic career affinity
  const finalMatchScore = Math.min(98, Math.max(55, Math.round(totalWeighted)));

  // Generate personalized explanation string
  let reason = `Strong alignment with your interest in ${userInterests.slice(0, 2).join(' & ') || 'technology'} and background in ${userStream || 'your subjects'}.`;
  if (finalMatchScore > 85) {
    reason = `Outstanding fit! Your subjects, problem-solving interests, and skills directly match the requirements for ${career.name}.`;
  } else if (finalMatchScore > 75) {
    reason = `Great career opportunity! Building a few missing core skills will make you a prime candidate for ${career.name}.`;
  }

  return {
    career,
    matchScore: finalMatchScore,
    subjectMatch: Math.round(subjectScore),
    interestMatch: Math.round(interestScore),
    skillMatch: Math.round(skillScore),
    strengthMatch: Math.round(strengthScore),
    reason
  };
}

export function analyzeSkillGaps(user: Partial<User>, targetCareer: Career): SkillGapItem[] {
  const userSkillsMap = new Map((user.skills || []).map(s => [s.skillName.toLowerCase(), s.level]));
  const gaps: SkillGapItem[] = [];

  targetCareer.requiredSkills.forEach(req => {
    const current = userSkillsMap.get(req.skillName.toLowerCase()) || 0;
    const gap = Math.max(0, req.requiredLevel - current);
    gaps.push({
      skill: req.skillName,
      current,
      required: req.requiredLevel,
      gap,
      importance: req.importance
    });
  });

  return gaps.sort((a, b) => b.gap - a.gap);
}

export function determineNextBestSkill(user: Partial<User>, targetCareer: Career): NextBestSkillRecommendation | null {
  const gaps = analyzeSkillGaps(user, targetCareer);
  if (gaps.length === 0 || gaps.every(g => g.gap <= 0)) {
    return {
      skillName: 'System Design',
      category: 'Advanced Architecture',
      reason: 'You have satisfied all core requirements! The next step is mastering real-world scalable system architectures.',
      prerequisiteFor: ['Senior Engineering'],
      targetCareer: targetCareer.name
    };
  }

  // Find prerequisites in database
  const userSkillsMap = new Map((user.skills || []).map(s => [s.skillName.toLowerCase(), s.level]));
  
  // Pick a skill with highest gap that has its prerequisites satisfied
  for (const gapItem of gaps) {
    const skillObj = INITIAL_SKILLS.find(s => s.name.toLowerCase() === gapItem.skill.toLowerCase());
    if (skillObj) {
      const unmetPrereqs = skillObj.prerequisites.filter(p => (userSkillsMap.get(p.toLowerCase()) || 0) < 40);
      if (unmetPrereqs.length > 0) {
        // Return the prerequisite first!
        const prereqName = unmetPrereqs[0];
        return {
          skillName: prereqName,
          category: 'Core Prerequisite',
          reason: `${prereqName} is a fundamental prerequisite required before effectively learning ${gapItem.skill} for ${targetCareer.name}.`,
          prerequisiteFor: [gapItem.skill],
          targetCareer: targetCareer.name
        };
      } else {
        return {
          skillName: gapItem.skill,
          category: skillObj.category,
          reason: `Mastering ${gapItem.skill} bridges a key ${gapItem.gap}% gap in your preparation for ${targetCareer.name}.`,
          prerequisiteFor: targetCareer.requiredSkills.filter(r => r.skillName !== gapItem.skill).map(r => r.skillName).slice(0, 2),
          targetCareer: targetCareer.name
        };
      }
    }
  }

  const topGap = gaps[0];
  return {
    skillName: topGap.skill,
    category: 'Skill Gap',
    reason: `${topGap.skill} is critical for ${targetCareer.name}. You currently have a ${topGap.gap}% gap to close.`,
    prerequisiteFor: [targetCareer.name],
    targetCareer: targetCareer.name
  };
}

export function recommendSideCourses(user: Partial<User>): SideCourseRecommendation[] {
  const userStream = (user.stream || '').toLowerCase();
  const sideCourses = INITIAL_COURSES.filter(c => c.isSideCourse || c.category === 'Cross-Disciplinary' || c.category === 'Business & Analytics' || c.category === 'Productivity');

  return sideCourses.slice(0, 3).map(course => {
    let why = `Adding ${course.skill} broadens your career flexibility and sets you apart in job applications.`;
    let benefitToMajor = 'Enhances cross-functional problem solving and competitive advantage.';

    if (userStream.includes('commerce') || userStream.includes('arts')) {
      if (course.skill === 'Excel' || course.skill === 'Power BI') {
        why = `Combining your ${user.stream || 'business'} background with Data Visualization & Analytics unlocks lucrative roles in Financial & Business Intelligence.`;
        benefitToMajor = 'Transforms manual reporting into automated, high-impact data dashboards.';
      } else if (course.skill === 'Python') {
        why = `Learning beginner Python automation allows you to process large financial and commercial datasets effortlessly.`;
        benefitToMajor = 'Bridges business knowledge with modern tech automation.';
      }
    } else if (userStream.includes('biology') || userStream.includes('science')) {
      if (course.skill === 'Python' || course.skill === 'Artificial Intelligence') {
        why = `Biological sciences are rapidly converging with AI & Bioinformatics. ${course.name} gives you the modern data edge.`;
        benefitToMajor = 'Positions you for computational research and medical tech innovation.';
      }
    } else {
      if (course.skill === 'Communication' || course.skill === 'Artificial Intelligence') {
        why = `Technical expertise paired with strong presentation skills accelerates promotion to lead and managerial roles.`;
        benefitToMajor = 'Dramatically improves interview performance and project leadership.';
      }
    }

    return {
      course,
      why,
      benefitToMajor
    };
  });
}

export function discoverHiddenCareers(user: Partial<User>, allCareers: Career[] = INITIAL_CAREERS): HiddenCareerRecommendation[] {
  const matches = allCareers.map(c => calculateCareerMatch(user, c));
  
  // Find careers that are NOT standard top picks for user's stream, but have high match score due to cross-disciplinary interests
  const hiddenList = matches.filter(m => {
    const isInterdisciplinary = m.career.category === 'Healthcare & Bio' || m.career.name.includes('Computational') || m.career.name.includes('UI/UX') || m.career.name.includes('Robotics') || m.career.name.includes('Bioinformatics');
    return isInterdisciplinary;
  });

  return hiddenList.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3).map(m => ({
    career: m.career,
    matchPercentage: m.matchScore,
    reason: `Discovered by combining your subjects (${user.subjects?.join(', ') || 'Sciences'}) with your underlying interest in ${user.interests?.slice(0, 2).join(' & ') || 'innovation'}.`
  }));
}

export function generateFullRecommendations(user: Partial<User>, allCareers: Career[] = INITIAL_CAREERS): RecommendationResponse {
  const matches = allCareers.map(c => calculateCareerMatch(user, c)).sort((a, b) => b.matchScore - a.matchScore);
  const topCareers = matches.slice(0, 5);
  const targetCareer = topCareers[0]?.career || allCareers[0];

  const skillGaps = analyzeSkillGaps(user, targetCareer);
  const nextBestSkill = determineNextBestSkill(user, targetCareer);
  const sideCourses = recommendSideCourses(user);
  const hiddenCareers = discoverHiddenCareers(user, allCareers);

  return {
    topCareers,
    nextBestSkill,
    skillGaps,
    sideCourses,
    hiddenCareers
  };
}
