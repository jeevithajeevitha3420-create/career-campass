import { useState, useRef, useEffect } from 'react';
import {
  GraduationCap,
  Code2,
  Heart,
  Gauge,
  Target,
  ArrowRight,
  ArrowLeft,
  Check,
  Plus,
  X,
  Sparkles,
  Compass,
} from 'lucide-react';
import type {
  AssessmentData,
  EducationLevel,
  ExperienceLevel,
  WorkType,
  CareerGoal,
} from '@/types';
import {
  EDUCATION_LEVELS,
  BRANCHES,
  SKILL_OPTIONS,
  INTEREST_OPTIONS,
  EXPERIENCE_LEVELS,
  WORK_TYPES,
  CAREER_GOALS,
} from '@/types';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import type { Page } from '@/App';

interface AssessmentPageProps {
  onComplete: (data: AssessmentData) => void;
  onNavigate: (page: Page) => void;
}

const STEPS = [
  { id: 1, title: 'Education', icon: GraduationCap, desc: 'Tell us about your academic background' },
  { id: 2, title: 'Technical Skills', icon: Code2, desc: 'Select your current skill set' },
  { id: 3, title: 'Interests', icon: Heart, desc: 'What excites you the most?' },
  { id: 4, title: 'Experience', icon: Gauge, desc: 'How would you rate your experience?' },
  { id: 5, title: 'Career Goals', icon: Target, desc: 'What kind of work do you want to do?' },
];

const initialData: AssessmentData = {
  education: { level: '', degree: '', branch: '', graduationYear: '' },
  skills: [],
  interests: [],
  experience: '',
  preferences: { workType: '', careerGoal: '' },
};

export function AssessmentPage({ onComplete, onNavigate }: AssessmentPageProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<AssessmentData>(initialData);
  const [customSkill, setCustomSkill] = useState('');
  const [skillSearch, setSkillSearch] = useState('');
  const [direction, setDirection] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const progress = (step / STEPS.length) * 100;

  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        return data.education.level !== '' && data.education.branch !== '';
      case 2:
        return data.skills.length > 0;
      case 3:
        return data.interests.length > 0;
      case 4:
        return data.experience !== '';
      case 5:
        return data.preferences.workType !== '' && data.preferences.careerGoal !== '';
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < STEPS.length) {
      setDirection(1);
      setStep(step + 1);
    } else {
      onComplete(data);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const toggleSkill = (skill: string) => {
    setData((d) => ({
      ...d,
      skills: d.skills.includes(skill)
        ? d.skills.filter((s) => s !== skill)
        : [...d.skills, skill],
    }));
  };

  const toggleInterest = (interest: string) => {
    setData((d) => ({
      ...d,
      interests: d.interests.includes(interest)
        ? d.interests.filter((i) => i !== interest)
        : [...d.interests, interest],
    }));
  };

  const addCustomSkill = () => {
    const trimmed = customSkill.trim();
    if (trimmed && !data.skills.includes(trimmed)) {
      setData((d) => ({ ...d, skills: [...d.skills, trimmed] }));
      setCustomSkill('');
    }
  };

  const filteredSkills = SKILL_OPTIONS.filter((s) =>
    s.toLowerCase().includes(skillSearch.toLowerCase()),
  );

  const animClass = direction === 1 ? 'animate-slide-in-right' : 'animate-fade-in-up';

  return (
    <div className="min-h-screen bg-ink-900 pt-16">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-4">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300 font-medium">Career Assessment</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
            Build Your <span className="gradient-text">Career Profile</span>
          </h1>
          <p className="text-slate-400">
            Step {step} of {STEPS.length}: {STEPS[step - 1].desc}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <ProgressBar value={progress} size="lg" color="blue" showValue={false} />
          <div className="flex justify-between mt-3">
            {STEPS.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    step > s.id
                      ? 'bg-green-500/20 border border-green-500/40'
                      : step === s.id
                        ? 'bg-blue-500/20 border border-blue-500/50 animate-pulse-glow'
                        : 'bg-slate-700/30 border border-slate-600/30'
                  }`}
                >
                  {step > s.id ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <s.icon className={`w-5 h-5 ${step === s.id ? 'text-blue-300' : 'text-slate-500'}`} />
                  )}
                </div>
                <span className={`text-[10px] hidden sm:block font-medium ${step >= s.id ? 'text-slate-300' : 'text-slate-600'}`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div ref={scrollRef} className="glass rounded-2xl p-6 sm:p-8 min-h-[400px]">
          <div key={step} className={animClass}>
            {step === 1 && <StepEducation data={data} setData={setData} />}
            {step === 2 && (
              <StepSkills
                data={data}
                toggleSkill={toggleSkill}
                filteredSkills={filteredSkills}
                skillSearch={skillSearch}
                setSkillSearch={setSkillSearch}
                customSkill={customSkill}
                setCustomSkill={setCustomSkill}
                addCustomSkill={addCustomSkill}
                removeSkill={(s: string) => toggleSkill(s)}
              />
            )}
            {step === 3 && <StepInterests data={data} toggleInterest={toggleInterest} />}
            {step === 4 && <StepExperience data={data} setData={setData} />}
            {step === 5 && <StepPreferences data={data} setData={setData} />}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="ghost"
            onClick={step === 1 ? () => onNavigate('home') : handleBack}
          >
            <ArrowLeft className="w-4 h-4" />
            {step === 1 ? 'Back to Home' : 'Previous'}
          </Button>

          <div className="flex items-center gap-3">
            {!canProceed() && (
              <span className="text-sm text-slate-500 hidden sm:block">
                {step === 1 && 'Select education level and branch to continue'}
                {step === 2 && 'Select at least one skill to continue'}
                {step === 3 && 'Select at least one interest to continue'}
                {step === 4 && 'Select your experience level to continue'}
                {step === 5 && 'Select work type and career goal to continue'}
              </span>
            )}
            <Button onClick={handleNext} disabled={!canProceed()}>
              {step === STEPS.length ? (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analyze My Career
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Step 1: Education ===== */
function StepEducation({
  data,
  setData,
}: {
  data: AssessmentData;
  setData: React.Dispatch<React.SetStateAction<AssessmentData>>;
}) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => String(currentYear + i - 2));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-white mb-1">Education Background</h2>
        <p className="text-slate-400 text-sm">Tell us about your academic journey so far.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Education Level <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {EDUCATION_LEVELS.map((level) => (
            <button
              key={level}
              onClick={() => setData((d) => ({ ...d, education: { ...d.education, level: level as EducationLevel } }))}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                data.education.level === level
                  ? 'bg-blue-500/20 border border-blue-500/50 text-white'
                  : 'glass-light text-slate-400 hover:text-white hover:border-blue-500/30'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Degree / Program</label>
          <input
            type="text"
            value={data.education.degree}
            onChange={(e) => setData((d) => ({ ...d, education: { ...d.education, degree: e.target.value } }))}
            placeholder="e.g. B.Tech, B.Sc Computer Science"
            className="w-full px-4 py-3 rounded-xl glass-light text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Branch / Department <span className="text-red-400">*</span>
          </label>
          <select
            value={data.education.branch}
            onChange={(e) => setData((d) => ({ ...d, education: { ...d.education, branch: e.target.value } }))}
            className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-600/50 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors cursor-pointer"
          >
            <option value="" className="bg-slate-800 text-slate-400">Select branch</option>
            {BRANCHES.map((b) => (
              <option key={b} value={b} className="bg-slate-800 text-white">{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Graduation Year</label>
        <select
          value={data.education.graduationYear}
          onChange={(e) => setData((d) => ({ ...d, education: { ...d.education, graduationYear: e.target.value } }))}
          className="w-full sm:w-48 px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-600/50 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors cursor-pointer"
        >
          <option value="" className="bg-slate-800 text-slate-400">Select year</option>
          {years.map((y) => (
            <option key={y} value={y} className="bg-slate-800 text-white">{y}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

/* ===== Step 2: Skills ===== */
function StepSkills({
  data,
  toggleSkill,
  filteredSkills,
  skillSearch,
  setSkillSearch,
  customSkill,
  setCustomSkill,
  addCustomSkill,
  removeSkill,
}: {
  data: AssessmentData;
  toggleSkill: (s: string) => void;
  filteredSkills: string[];
  skillSearch: string;
  setSkillSearch: (s: string) => void;
  customSkill: string;
  setCustomSkill: (s: string) => void;
  addCustomSkill: () => void;
  removeSkill: (s: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-white mb-1">Technical Skills</h2>
        <p className="text-slate-400 text-sm">
          Select all the skills you currently have. You can also add custom skills.
        </p>
      </div>

      {/* Selected skills */}
      {data.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
          {data.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-200 text-sm font-medium border border-blue-500/30"
            >
              {skill}
              <button onClick={() => removeSkill(skill)} className="hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={skillSearch}
          onChange={(e) => setSkillSearch(e.target.value)}
          placeholder="Search skills..."
          className="w-full px-4 py-3 rounded-xl glass-light text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
        />
      </div>

      {/* Skill grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 max-h-64 overflow-y-auto pr-2">
        {filteredSkills.map((skill) => {
          const selected = data.skills.includes(skill);
          return (
            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-between ${
                selected
                  ? 'bg-blue-500/20 border border-blue-500/50 text-blue-200'
                  : 'glass-light text-slate-400 hover:text-white hover:border-blue-500/30'
              }`}
            >
              <span className="truncate">{skill}</span>
              {selected && <Check className="w-4 h-4 text-blue-400 flex-shrink-0 ml-2" />}
            </button>
          );
        })}
      </div>

      {/* Custom skill */}
      <div className="flex gap-2">
        <input
          type="text"
          value={customSkill}
          onChange={(e) => setCustomSkill(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSkill())}
          placeholder="Add a custom skill..."
          className="flex-1 px-4 py-3 rounded-xl glass-light text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
        />
        <Button variant="secondary" onClick={addCustomSkill} disabled={!customSkill.trim()}>
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>
    </div>
  );
}

/* ===== Step 3: Interests ===== */
function StepInterests({
  data,
  toggleInterest,
}: {
  data: AssessmentData;
  toggleInterest: (i: string) => void;
}) {
  const interestIcons: Record<string, string> = {
    'Artificial Intelligence': '🤖',
    'Machine Learning': '🧠',
    'Data Science': '📊',
    'Web Development': '🌐',
    'App Development': '📱',
    'Cybersecurity': '🛡️',
    'Cloud Computing': '☁️',
    'Robotics': '🤖',
    'Research': '🔬',
    'Business': '💼',
    'Design': '🎨',
    'Mathematics': '📐',
    'Programming': '💻',
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-white mb-1">Your Interests</h2>
        <p className="text-slate-400 text-sm">
          What areas of technology excite you? Select all that apply.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {INTEREST_OPTIONS.map((interest) => {
          const selected = data.interests.includes(interest);
          return (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`relative px-4 py-5 rounded-xl text-left transition-all group ${
                selected
                  ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/15 border border-blue-500/50'
                  : 'glass-light hover:border-blue-500/30'
              }`}
            >
              <div className="text-2xl mb-2">{interestIcons[interest]}</div>
              <div className={`font-medium text-sm ${selected ? 'text-white' : 'text-slate-300'}`}>
                {interest}
              </div>
              {selected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ===== Step 4: Experience ===== */
function StepExperience({
  data,
  setData,
}: {
  data: AssessmentData;
  setData: React.Dispatch<React.SetStateAction<AssessmentData>>;
}) {
  const levels: { value: ExperienceLevel; icon: typeof Gauge; desc: string; color: string }[] = [
    { value: 'Beginner', icon: Gauge, desc: 'New to the field, learning the basics', color: 'green' },
    { value: 'Intermediate', icon: Gauge, desc: 'Some experience, comfortable with fundamentals', color: 'blue' },
    { value: 'Advanced', icon: Gauge, desc: 'Experienced, ready for complex challenges', color: 'cyan' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-white mb-1">Experience Level</h2>
        <p className="text-slate-400 text-sm">
          How would you rate your current experience in your areas of interest?
        </p>
      </div>

      <div className="space-y-3">
        {levels.map((level) => {
          const selected = data.experience === level.value;
          return (
            <button
              key={level.value}
              onClick={() => setData((d) => ({ ...d, experience: level.value }))}
              className={`w-full p-5 rounded-xl text-left transition-all flex items-center gap-4 ${
                selected
                  ? 'bg-gradient-to-r from-blue-500/15 to-cyan-500/10 border border-blue-500/50'
                  : 'glass-light hover:border-blue-500/30'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                  selected
                    ? `bg-${level.color}-500/20 border border-${level.color}-500/40`
                    : 'bg-slate-700/30 border border-slate-600/30'
                }`}
              >
                <level.icon className={`w-7 h-7 ${selected ? `text-${level.color}-400` : 'text-slate-500'}`} />
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold text-lg ${selected ? 'text-white' : 'text-slate-300'}`}>
                  {level.value}
                </h3>
                <p className="text-sm text-slate-400">{level.desc}</p>
              </div>
              {selected && (
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ===== Step 5: Preferences ===== */
function StepPreferences({
  data,
  setData,
}: {
  data: AssessmentData;
  setData: React.Dispatch<React.SetStateAction<AssessmentData>>;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-white mb-1">Career Preferences</h2>
        <p className="text-slate-400 text-sm">
          Tell us what kind of work you enjoy and what you aspire to become.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          What type of work interests you? <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {WORK_TYPES.map((wt: WorkType) => {
            const selected = data.preferences.workType === wt;
            return (
              <button
                key={wt}
                onClick={() => setData((d) => ({ ...d, preferences: { ...d.preferences, workType: wt } }))}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all text-left flex items-center gap-2 ${
                  selected
                    ? 'bg-blue-500/20 border border-blue-500/50 text-white'
                    : 'glass-light text-slate-400 hover:text-white hover:border-blue-500/30'
                }`}
              >
                {selected && <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />}
                {wt}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-3">
          What is your career goal? <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {CAREER_GOALS.map((goal: CareerGoal) => {
            const selected = data.preferences.careerGoal === goal;
            return (
              <button
                key={goal}
                onClick={() => setData((d) => ({ ...d, preferences: { ...d.preferences, careerGoal: goal } }))}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all text-left flex items-center gap-2 ${
                  selected
                    ? 'bg-cyan-500/20 border border-cyan-500/50 text-white'
                    : 'glass-light text-slate-400 hover:text-white hover:border-cyan-500/30'
                }`}
              >
                {selected && <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />}
                {goal}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
        <Compass className="w-5 h-5 text-cyan-400 flex-shrink-0" />
        <p className="text-sm text-slate-400">
          That's everything! Click <span className="text-white font-medium">Analyze My Career</span> to get your personalized results.
        </p>
      </div>
    </div>
  );
}
