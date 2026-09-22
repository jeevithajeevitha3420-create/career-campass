export type EducationLevel =
  | 'High School'
  | 'Diploma'
  | "Associate's"
  | "Bachelor's"
  | "Master's"
  | 'PhD'
  | 'Self-Taught';

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type WorkType =
  | 'Building software'
  | 'Working with data'
  | 'Research and innovation'
  | 'Designing experiences'
  | 'Leading teams'
  | 'Solving problems'
  | 'Creating content'
  | 'Helping people';

export type CareerGoal =
  | 'Software Engineer'
  | 'Data Scientist'
  | 'Machine Learning Engineer'
  | 'AI Researcher'
  | 'Full-Stack Developer'
  | 'Frontend Developer'
  | 'Backend Developer'
  | 'Mobile App Developer'
  | 'DevOps Engineer'
  | 'Cloud Architect'
  | 'Cybersecurity Analyst'
  | 'Data Analyst'
  | 'Product Manager'
  | 'UI/UX Designer'
  | 'Not sure yet';

export interface AssessmentData {
  education: {
    level: EducationLevel | '';
    degree: string;
    branch: string;
    graduationYear: string;
  };
  skills: string[];
  interests: string[];
  experience: ExperienceLevel | '';
  preferences: {
    workType: WorkType | '';
    careerGoal: CareerGoal | '';
  };
}

export interface CareerPath {
  id: string;
  title: string;
  icon: string;
  category: string;
  description: string;
  coreSkills: string[];
  recommendedTech: string[];
  projects: ProjectRecommendation[];
  resources: LearningResource[];
  avgSalary: string;
  demand: 'High' | 'Very High' | 'Growing' | 'Moderate';
  growthRate: string;
  matchKeywords: string[];
  workTypes: WorkType[];
}

export interface ProjectRecommendation {
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  skillsGained: string[];
  estimatedTime: string;
}

export interface LearningResource {
  title: string;
  type: 'Course' | 'Documentation' | 'Tutorial' | 'Book' | 'Video' | 'Practice';
  provider: string;
  url: string;
  skill: string;
  level: ExperienceLevel;
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  duration: string;
  goal: string;
  steps: string[];
  skills: string[];
  milestone: string;
}

export interface CareerAnalysis {
  careerPaths: {
    path: CareerPath;
    matchScore: number;
    matchedSkills: string[];
    missingSkills: string[];
    alignment: 'Excellent' | 'Strong' | 'Good' | 'Fair';
  reasons: string[];
  }[];
  existingSkills: {
    skill: string;
    relevantTo: string[];
  }[];
  skillGaps: {
    skill: string;
    importance: 'Critical' | 'Important' | 'Recommended';
    careers: string[];
  }[];
  recommendedTech: string[];
  roadmap: RoadmapPhase[];
  overallSummary: string;
}

export const SKILL_OPTIONS = [
  'Python', 'Java', 'C', 'C++', 'SQL', 'HTML', 'CSS', 'JavaScript',
  'TypeScript', 'React', 'Angular', 'Vue', 'Node.js', 'Express',
  'Django', 'Flask', 'FastAPI', 'Spring Boot',
  'Machine Learning', 'Deep Learning', 'Data Science', 'AI',
  'NLP', 'Computer Vision', 'TensorFlow', 'PyTorch', 'Keras',
  'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib',
  'Cloud Computing', 'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
  'Cybersecurity', 'Networking', 'Linux', 'Git',
  'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL',
  'Swift', 'Kotlin', 'Flutter', 'React Native',
  'Tableau', 'Power BI', 'Excel', 'R', 'MATLAB',
  'UI/UX Design', 'Figma', 'Photoshop',
  'Cryptography', 'Penetration Testing', 'Ethical Hacking',
  'DevOps', 'CI/CD', 'Jenkins', 'Terraform',
  'Blockchain', 'IoT', 'Robotics', 'Embedded Systems',
  'Algorithms', 'Data Structures', 'Operating Systems',
  'Statistics', 'Probability', 'Linear Algebra', 'Calculus',
];

export const INTEREST_OPTIONS = [
  'Artificial Intelligence',
  'Machine Learning',
  'Data Science',
  'Web Development',
  'App Development',
  'Cybersecurity',
  'Cloud Computing',
  'Robotics',
  'Research',
  'Business',
  'Design',
  'Mathematics',
  'Programming',
];

export const EDUCATION_LEVELS: EducationLevel[] = [
  'High School', 'Diploma', "Associate's", "Bachelor's", "Master's", 'PhD', 'Self-Taught',
];

export const EXPERIENCE_LEVELS: ExperienceLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

export const WORK_TYPES: WorkType[] = [
  'Building software',
  'Working with data',
  'Research and innovation',
  'Designing experiences',
  'Leading teams',
  'Solving problems',
  'Creating content',
  'Helping people',
];

export const CAREER_GOALS: CareerGoal[] = [
  'Software Engineer',
  'Data Scientist',
  'Machine Learning Engineer',
  'AI Researcher',
  'Full-Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Mobile App Developer',
  'DevOps Engineer',
  'Cloud Architect',
  'Cybersecurity Analyst',
  'Data Analyst',
  'Product Manager',
  'UI/UX Designer',
  'Not sure yet',
];

export const BRANCHES = [
  'Computer Science', 'Information Technology', 'Electronics & Communication',
  'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering',
  'Chemical Engineering', 'Aerospace Engineering', 'Biotechnology',
  'Mathematics', 'Physics', 'Statistics', 'Data Science', 'Business Administration',
  'Commerce', 'Arts & Humanities', 'Other',
];
