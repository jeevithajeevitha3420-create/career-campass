import type { AssessmentData, CareerAnalysis, CareerPath, RoadmapPhase } from '@/types';
import { CAREER_PATHS } from '@/data/careers';

function getAlignment(score: number): 'Excellent' | 'Strong' | 'Good' | 'Fair' {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Strong';
  if (score >= 40) return 'Good';
  return 'Fair';
}

function buildReasons(
  path: CareerPath,
  matchedSkills: string[],
  matchedInterests: string[],
  matchedWorkType: boolean,
  matchedGoal: boolean,
  experience: string,
): string[] {
  const reasons: string[] = [];
  if (matchedSkills.length > 0) {
    reasons.push(`You already have ${matchedSkills.length} key skill${matchedSkills.length > 1 ? 's' : ''} for this role`);
  }
  if (matchedInterests.length > 0) {
    reasons.push(`Your interest in ${matchedInterests.join(', ')} aligns with this path`);
  }
  if (matchedWorkType) {
    reasons.push(`Your preferred work type matches this career`);
  }
  if (matchedGoal) {
    reasons.push(`This aligns with your stated career goal`);
  }
  if (experience === 'Advanced') {
    reasons.push(`Your advanced experience level is well-suited for this role`);
  } else if (experience === 'Intermediate') {
    reasons.push(`This role is achievable with your intermediate experience`);
  } else {
    reasons.push(`Great entry point for someone starting their career`);
  }
  return reasons.length > 0 ? reasons : ['This career path is worth exploring based on your profile'];
}

export function analyzeCareer(data: AssessmentData): CareerAnalysis {
  const userSkillsLower = data.skills.map((s) => s.toLowerCase());
  const userInterestsLower = data.interests.map((i) => i.toLowerCase());
  const workType = data.preferences.workType;
  const careerGoal = data.preferences.careerGoal;

  const careerMatches = CAREER_PATHS.map((path) => {
    const pathSkillsLower = path.coreSkills.map((s) => s.toLowerCase());
    const matchedSkills = path.coreSkills.filter((s) =>
      userSkillsLower.includes(s.toLowerCase()),
    );
    const missingSkills = path.coreSkills.filter(
      (s) => !userSkillsLower.includes(s.toLowerCase()),
    );

    const matchedInterests = data.interests.filter((i) =>
      path.matchKeywords.some(
        (k) => k.toLowerCase() === i.toLowerCase(),
      ),
    );

    const matchedWorkType = workType ? path.workTypes.includes(workType) : false;
    const matchedGoal = careerGoal && careerGoal !== 'Not sure yet'
      ? path.title === careerGoal || path.id === careerGoal.toLowerCase().replace(/[^a-z]+/g, '-')
      : false;

    const skillScore = path.coreSkills.length > 0
      ? (matchedSkills.length / path.coreSkills.length) * 50
      : 25;
    const interestScore = matchedInterests.length > 0
      ? Math.min(matchedInterests.length * 10, 25)
      : 0;
    const workTypeScore = matchedWorkType ? 15 : 0;
    const goalScore = matchedGoal ? 10 : 0;

    const baseScore = skillScore + interestScore + workTypeScore + goalScore;

    const experienceBoost = data.experience === 'Advanced' ? 5 : data.experience === 'Intermediate' ? 3 : 0;
    const matchScore = Math.min(Math.round(baseScore + experienceBoost), 99);

    return {
      path,
      matchScore,
      matchedSkills,
      missingSkills,
      alignment: getAlignment(matchScore),
      reasons: buildReasons(path, matchedSkills, matchedInterests, matchedWorkType, matchedGoal, data.experience),
    };
  })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6);

  const topPaths = careerMatches.slice(0, 4);

  const existingSkills = data.skills.map((skill) => {
    const relevantTo = CAREER_PATHS.filter((p) =>
      p.coreSkills.some((s) => s.toLowerCase() === skill.toLowerCase()),
    ).map((p) => p.title);
    return { skill, relevantTo: relevantTo.length > 0 ? relevantTo : ['General'] };
  });

  const skillGapMap = new Map<string, { importance: 'Critical' | 'Important' | 'Recommended'; careers: Set<string> }>();
  topPaths.forEach((match, idx) => {
    const importance = idx < 2 ? 'Critical' : idx < 4 ? 'Important' : 'Recommended';
    match.missingSkills.forEach((skill) => {
      if (!skillGapMap.has(skill)) {
        skillGapMap.set(skill, { importance, careers: new Set() });
      }
      const entry = skillGapMap.get(skill)!;
      if (importance === 'Critical') entry.importance = 'Critical';
      else if (importance === 'Important' && entry.importance !== 'Critical') entry.importance = 'Important';
      entry.careers.add(match.path.title);
    });
  });

  const skillGaps = Array.from(skillGapMap.entries())
    .map(([skill, info]) => ({
      skill,
      importance: info.importance,
      careers: Array.from(info.careers),
    }))
    .sort((a, b) => {
      const order = { Critical: 0, Important: 1, Recommended: 2 };
      return order[a.importance] - order[b.importance];
    });

  const recommendedTechSet = new Set<string>();
  topPaths.forEach((m) => m.path.recommendedTech.forEach((t) => recommendedTechSet.add(t)));
  const recommendedTech = Array.from(recommendedTechSet);

  const roadmap = buildRoadmap(data, topPaths, skillGaps);

  const overallSummary = buildSummary(data, careerMatches);

  return {
    careerPaths: careerMatches,
    existingSkills,
    skillGaps,
    recommendedTech,
    roadmap,
    overallSummary,
  };
}

function buildRoadmap(
  data: AssessmentData,
  topPaths: { path: CareerPath; matchScore: number; missingSkills: string[] }[],
  skillGaps: { skill: string; importance: string }[],
): RoadmapPhase[] {
  const isBeginner = data.experience === 'Beginner' || data.experience === '';
  const criticalSkills = skillGaps.filter((s) => s.importance === 'Critical').map((s) => s.skill);
  const importantSkills = skillGaps.filter((s) => s.importance === 'Important').map((s) => s.skill);
  const recommendedSkills = skillGaps.filter((s) => s.importance === 'Recommended').map((s) => s.skill);

  const phases: RoadmapPhase[] = [];

  if (isBeginner) {
    phases.push({
      phase: 1,
      title: 'Foundation Building',
      duration: '2-3 months',
      goal: 'Master the fundamentals of programming and core concepts',
      steps: [
        'Learn a programming language (Python or JavaScript recommended)',
        'Understand basic data structures: arrays, lists, dictionaries',
        'Practice algorithmic thinking with simple problems',
        'Set up your development environment and learn Git basics',
      ],
      skills: criticalSkills.slice(0, 3).length > 0 ? criticalSkills.slice(0, 3) : ['Python', 'Git', 'Algorithms'],
      milestone: 'Build your first working program and push it to GitHub',
    });
  }

  const coreSkills = criticalSkills.length > 0 ? criticalSkills : importantSkills;
  phases.push({
    phase: isBeginner ? 2 : 1,
    title: 'Core Skill Development',
    duration: '3-4 months',
    goal: 'Develop the essential skills for your target career path',
    steps: [
      `Focus on learning: ${coreSkills.slice(0, 4).join(', ')}`,
      'Follow structured online courses and tutorials',
      'Build small projects to apply each skill practically',
      'Join communities and participate in discussions',
    ],
    skills: coreSkills.slice(0, 5),
    milestone: 'Complete 2-3 small projects demonstrating core skills',
  });

  phases.push({
    phase: isBeginner ? 3 : 2,
    title: 'Advanced Topics & Frameworks',
    duration: '3-4 months',
    goal: 'Learn industry-standard tools and frameworks',
    steps: [
      `Learn recommended technologies: ${importantSkills.slice(0, 3).join(', ') || 'frameworks in your field'}`,
      'Study best practices and design patterns',
      'Contribute to open-source or community projects',
      'Start building a portfolio of meaningful projects',
    ],
    skills: importantSkills.slice(0, 5),
    milestone: 'Have a portfolio with 3-4 polished projects',
  });

  phases.push({
    phase: isBeginner ? 4 : 3,
    title: 'Specialization & Real-World Experience',
    duration: '2-3 months',
    goal: 'Specialize in your chosen path and gain practical experience',
    steps: [
      `Deep dive into: ${recommendedSkills.slice(0, 3).join(', ') || 'advanced topics in your field'}`,
      'Build a capstone project that showcases your full skill set',
      'Apply for internships or freelance opportunities',
      'Prepare for technical interviews with mock sessions',
    ],
    skills: recommendedSkills.slice(0, 4),
    milestone: 'Complete a capstone project and start applying for roles',
  });

  phases.push({
    phase: isBeginner ? 5 : 4,
    title: 'Career Launch',
    duration: '1-2 months',
    goal: 'Prepare for and enter the job market confidently',
    steps: [
      'Polish your resume and LinkedIn profile',
      'Create a personal website showcasing your projects',
      'Practice coding interviews and behavioral questions',
      'Apply to relevant positions and attend networking events',
    ],
    skills: ['Resume Writing', 'Interview Prep', 'Networking'],
    milestone: 'Land your first role in your chosen career path',
  });

  return phases;
}

function buildSummary(
  data: AssessmentData,
  careerMatches: { path: CareerPath; matchScore: number; alignment: string }[],
): string {
  const topMatch = careerMatches[0];
  const strongMatches = careerMatches.filter((m) => m.matchScore >= 60).length;

  const skillText = data.skills.length > 0
    ? `with ${data.skills.length} technical skill${data.skills.length > 1 ? 's' : ''}`
    : 'and are building your skill set';

  const interestText = data.interests.length > 0
    ? `interested in ${data.interests.slice(0, 3).join(', ')}`
    : 'exploring different areas';

  let summary = `Based on your ${data.education.level || 'education'} background${skillText}, you're ${interestText}. `;
  summary += `Your strongest career match is ${topMatch.path.title} with a ${topMatch.matchScore}% alignment. `;
  if (strongMatches > 1) {
    summary += `You have ${strongMatches} strong career path${strongMatches > 1 ? 's' : ''} to explore. `;
  }
  summary += `Focus on building your missing skills and following the personalized roadmap to reach your career goals.`;

  return summary;
}
