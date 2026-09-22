import { useState, useEffect } from 'react';
import {
  Sparkles,
  Compass,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Briefcase,
  Code2,
  BarChart3,
  Brain,
  Microscope,
  Layers,
  MonitorSmartphone,
  GitBranch,
  ShieldCheck,
  Cloud,
  Smartphone,
  Palette,
  Target,
  MapPin,
  BookOpen,
  ArrowRight,
  Award,
  Clock,
  Zap,
  Rocket,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  GraduationCap,
  Lightbulb,
  Check,
} from 'lucide-react';
import type { AssessmentData, CareerAnalysis, CareerPath } from '@/types';
import { analyzeCareer } from '@/lib/analysis';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import type { Page } from '@/App';

interface ResultsPageProps {
  assessmentData: AssessmentData;
  onNavigate: (page: Page) => void;
  onRetake: () => void;
}

const iconMap: Record<string, typeof Code2> = {
  Code2,
  BarChart3,
  Brain,
  Microscope,
  Layers,
  MonitorSmartphone,
  GitBranch,
  ShieldCheck,
  Cloud,
  Smartphone,
  Palette,
  Target,
  TrendingUp,
};

export function ResultsPage({ assessmentData, onNavigate, onRetake }: ResultsPageProps) {
  const [analysis, setAnalysis] = useState<CareerAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedCareer, setExpandedCareer] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'careers' | 'skills' | 'roadmap' | 'resources'>('careers');

  useEffect(() => {
    const timer = setTimeout(() => {
      const result = analyzeCareer(assessmentData);
      setAnalysis(result);
      setLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, [assessmentData]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!analysis) return null;

  const topMatch = analysis.careerPaths[0];

  return (
    <div className="min-h-screen bg-ink-900 pt-16">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-4">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300 font-medium">Your Career Analysis</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Your <span className="gradient-text">Career Compass</span> Results
          </h1>
          <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed">
            {analysis.overallSummary}
          </p>
        </div>

        {/* Top match highlight */}
        <div className="mb-8 animate-fade-in-up delay-200">
          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border-blue-500/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0">
                {(() => {
                  const Icon = iconMap[topMatch.path.icon] || Compass;
                  return <Icon className="w-10 h-10 text-white" />;
                })()}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wide">Best Match</span>
                  <Badge variant="green">{topMatch.alignment}</Badge>
                </div>
                <h2 className="text-2xl font-display font-bold text-white mb-1">{topMatch.path.title}</h2>
                <p className="text-slate-400 text-sm">{topMatch.path.description}</p>
              </div>
              <div className="text-center sm:text-right">
                <div className="text-4xl font-display font-bold gradient-text">{topMatch.matchScore}%</div>
                <div className="text-xs text-slate-400 mt-1">Match Score</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 animate-fade-in-up delay-300">
          {[
            { id: 'careers' as const, label: 'Career Paths', icon: Briefcase },
            { id: 'skills' as const, label: 'Skills & Gaps', icon: Code2 },
            { id: 'roadmap' as const, label: 'Roadmap', icon: MapPin },
            { id: 'resources' as const, label: 'Resources', icon: BookOpen },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-500/20 border border-blue-500/50 text-white'
                  : 'glass-light text-slate-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="animate-fade-in" key={activeTab}>
          {activeTab === 'careers' && (
            <CareerPathsSection
              analysis={analysis}
              expandedCareer={expandedCareer}
              setExpandedCareer={setExpandedCareer}
            />
          )}
          {activeTab === 'skills' && <SkillsSection analysis={analysis} />}
          {activeTab === 'roadmap' && <RoadmapSection analysis={analysis} />}
          {activeTab === 'resources' && <ResourcesSection analysis={analysis} />}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button variant="outline" onClick={onRetake}>
            <RotateCcw className="w-4 h-4" />
            Retake Assessment
          </Button>
          <Button onClick={() => onNavigate('explore')}>
            Explore More Careers
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ===== Loading Screen ===== */
function LoadingScreen() {
  const messages = [
    'Analyzing your education background...',
    'Matching your skills to career paths...',
    'Identifying skill gaps...',
    'Building your personalized roadmap...',
    'Finding learning resources...',
  ];
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((i) => Math.min(i + 1, messages.length - 1));
    }, 550);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-ink-900 pt-16 flex items-center justify-center">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px]" />

      <div className="relative text-center">
        {/* Animated compass */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/20" />
          <div className="absolute inset-2 rounded-full border-2 border-cyan-500/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-2xl shadow-blue-500/50 animate-pulse-glow">
              <Compass className="w-10 h-10 text-white animate-spin-slow" />
            </div>
          </div>
          {/* Orbiting dots */}
          {[0, 120, 240].map((angle, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-cyan-400"
              style={{
                animation: `spin-slow ${2 + i * 0.5}s linear infinite`,
                transformOrigin: '0 0',
                transform: `rotate(${angle}deg) translateX(64px)`,
              }}
            />
          ))}
        </div>

        <h2 className="font-display text-2xl font-bold text-white mb-2">
          Analyzing Your Profile
        </h2>
        <div className="h-6 mb-6">
          <p className="text-slate-400 text-sm animate-fade-in" key={msgIdx}>
            {messages[msgIdx]}
          </p>
        </div>

        {/* Typing dots */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-cyan-400 typing-dot"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===== Career Paths Section ===== */
function CareerPathsSection({
  analysis,
  expandedCareer,
  setExpandedCareer,
}: {
  analysis: CareerAnalysis;
  expandedCareer: string | null;
  setExpandedCareer: (id: string | null) => void;
}) {
  return (
    <div className="space-y-4">
      {analysis.careerPaths.map((match, idx) => {
        const Icon = iconMap[match.path.icon] || Compass;
        const isExpanded = expandedCareer === match.path.id;
        const alignmentColor =
          match.alignment === 'Excellent' ? 'green' :
          match.alignment === 'Strong' ? 'blue' :
          match.alignment === 'Good' ? 'cyan' : 'amber';

        return (
          <Card key={match.path.id} className="animate-fade-in-up" hover>
            <div
              className="cursor-pointer"
              onClick={() => setExpandedCareer(isExpanded ? null : match.path.id)}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/15 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-7 h-7 text-cyan-300" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-display font-bold text-white text-lg">{match.path.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={alignmentColor as 'green' | 'blue' | 'cyan' | 'amber'}>{match.alignment}</Badge>
                        <span className="text-xs text-slate-500">{match.path.category}</span>
                        <span className="text-xs text-green-400">{match.path.demand} demand</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-display font-bold text-white">{match.matchScore}%</div>
                      <div className="text-xs text-slate-500">match</div>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm mb-3 line-clamp-2">{match.path.description}</p>

                  <div className="mb-3">
                    <ProgressBar value={match.matchScore} size="sm" color={alignmentColor as 'blue' | 'green' | 'cyan' | 'amber'} showValue={false} />
                  </div>

                  {/* Match reasons */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {match.reasons.slice(0, 2).map((reason, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-xs text-slate-400">
                        <CheckCircle2 className="w-3 h-3 text-green-400" />
                        {reason}
                      </span>
                    ))}
                  </div>

                  {/* Skill match chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {match.matchedSkills.slice(0, 5).map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-green-500/15 text-green-300 text-xs font-medium border border-green-500/20">
                        {s}
                      </span>
                    ))}
                    {match.missingSkills.slice(0, 3).map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-red-500/10 text-red-300/70 text-xs font-medium border border-red-500/15">
                        {s}
                      </span>
                    ))}
                    {match.missingSkills.length > 3 && (
                      <span className="px-2 py-0.5 text-slate-500 text-xs">+{match.missingSkills.length - 3} more</span>
                    )}
                  </div>
                </div>

                <div className="flex-shrink-0 pt-1">
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                </div>
              </div>
            </div>

            {/* Expanded content */}
            {isExpanded && (
              <div className="mt-6 pt-6 border-t border-slate-700/50 animate-fade-in">
                {/* Career details */}
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div className="glass-light rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs text-slate-400">Growth Rate</span>
                    </div>
                    <p className="text-white font-semibold text-sm">{match.path.growthRate}</p>
                  </div>
                  <div className="glass-light rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span className="text-xs text-slate-400">Avg. Salary</span>
                    </div>
                    <p className="text-white font-semibold text-sm">{match.path.avgSalary}</p>
                  </div>
                  <div className="glass-light rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-slate-400">Demand</span>
                    </div>
                    <p className="text-white font-semibold text-sm">{match.path.demand}</p>
                  </div>
                </div>

                {/* Core skills */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-blue-400" />
                    Core Skills Required
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {match.path.coreSkills.map((s) => (
                      <span
                        key={s}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                          match.matchedSkills.includes(s)
                            ? 'bg-green-500/15 text-green-300 border-green-500/30'
                            : 'bg-red-500/10 text-red-300/80 border-red-500/20'
                        }`}
                      >
                        {s}
                        {match.matchedSkills.includes(s) && <Check className="w-3 h-3 inline ml-1" />}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommended tech */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    Recommended Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {match.path.recommendedTech.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-300 text-xs font-medium border border-cyan-500/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-amber-400" />
                    Recommended Projects
                  </h4>
                  <div className="space-y-3">
                    {match.path.projects.map((proj) => (
                      <div key={proj.title} className="glass-light rounded-xl p-4">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h5 className="text-white font-medium text-sm">{proj.title}</h5>
                          <Badge variant={
                            proj.difficulty === 'Beginner' ? 'green' :
                            proj.difficulty === 'Intermediate' ? 'blue' : 'red'
                          }>
                            {proj.difficulty}
                          </Badge>
                        </div>
                        <p className="text-slate-400 text-xs mb-3">{proj.description}</p>
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="flex flex-wrap gap-1.5">
                            {proj.skillsGained.map((s) => (
                              <span key={s} className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-300 text-xs">
                                {s}
                              </span>
                            ))}
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs text-slate-500 ml-auto">
                            <Clock className="w-3 h-3" />
                            {proj.estimatedTime}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning resources */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-green-400" />
                    Learning Resources
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {match.path.resources.map((res) => (
                      <a
                        key={res.title}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-light rounded-xl p-4 card-hover group"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h5 className="text-white font-medium text-sm group-hover:text-cyan-300 transition-colors">{res.title}</h5>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span>{res.provider}</span>
                          <span>•</span>
                          <span>{res.type}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}

/* ===== Skills Section ===== */
function SkillsSection({ analysis }: { analysis: CareerAnalysis }) {
  return (
    <div className="space-y-6">
      {/* Existing skills */}
      <Card className="animate-fade-in-up">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-green-500/15 border border-green-500/30 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-lg">Your Existing Skills</h3>
            <p className="text-slate-400 text-sm">Skills you already have that are relevant to your career paths</p>
          </div>
        </div>

        {analysis.existingSkills.length > 0 ? (
          <div className="space-y-2">
            {analysis.existingSkills.map((item) => (
              <div key={item.skill} className="flex items-center justify-between p-3 rounded-xl glass-light">
                <span className="text-white font-medium text-sm">{item.skill}</span>
                <div className="flex flex-wrap gap-1 justify-end">
                  {item.relevantTo.slice(0, 3).map((c) => (
                    <span key={c} className="px-2 py-0.5 rounded-md bg-green-500/10 text-green-300 text-xs">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm">No skills selected yet. Start building your skill set!</p>
        )}
      </Card>

      {/* Skill gaps */}
      <Card className="animate-fade-in-up delay-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-lg">Skill Gaps to Address</h3>
            <p className="text-slate-400 text-sm">Skills you need to develop for your target careers</p>
          </div>
        </div>

        {analysis.skillGaps.length > 0 ? (
          <div className="space-y-2">
            {analysis.skillGaps.map((gap) => {
              const importanceColor =
                gap.importance === 'Critical' ? 'red' :
                gap.importance === 'Important' ? 'amber' : 'blue';
              return (
                <div key={gap.skill} className="flex items-center justify-between p-3 rounded-xl glass-light">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-medium text-sm">{gap.skill}</span>
                    <Badge variant={importanceColor as 'red' | 'amber' | 'blue'}>{gap.importance}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {gap.careers.slice(0, 3).map((c) => (
                      <span key={c} className="px-2 py-0.5 rounded-md bg-slate-600/30 text-slate-400 text-xs">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-slate-500 text-sm">No skill gaps detected — you have all the core skills!</p>
        )}
      </Card>

      {/* Recommended tech */}
      <Card className="animate-fade-in-up delay-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-lg">Recommended Technologies</h3>
            <p className="text-slate-400 text-sm">Tools and frameworks to learn next</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {analysis.recommendedTech.map((tech) => (
            <span key={tech} className="px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-300 text-sm font-medium border border-cyan-500/20 card-hover">
              {tech}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ===== Roadmap Section ===== */
function RoadmapSection({ analysis }: { analysis: CareerAnalysis }) {
  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-3">
          <MapPin className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-slate-300 font-medium">Personalized Learning Roadmap</span>
        </div>
        <h3 className="font-display text-2xl font-bold text-white mb-2">
          Your Step-by-Step <span className="gradient-text">Career Roadmap</span>
        </h3>
        <p className="text-slate-400 text-sm">Follow this roadmap to reach your career goals</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-cyan-500/40 to-transparent" />

        <div className="space-y-6">
          {analysis.roadmap.map((phase, idx) => (
            <div key={phase.phase} className="relative pl-16 animate-fade-in-up" style={{ animationDelay: `${idx * 0.15}s` }}>
              {/* Phase node */}
              <div className="absolute left-0 top-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-display font-bold text-lg">{phase.phase}</span>
              </div>

              <Card hover>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h4 className="font-display font-bold text-white text-lg">{phase.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-xs text-slate-400">{phase.duration}</span>
                    </div>
                  </div>
                  <Badge variant="blue">Phase {phase.phase}</Badge>
                </div>

                <p className="text-slate-300 text-sm mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  {phase.goal}
                </p>

                {/* Steps */}
                <div className="space-y-2 mb-4">
                  {phase.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-300 text-xs font-bold">{i + 1}</span>
                      </div>
                      <span className="text-slate-300 text-sm">{step}</span>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {phase.skills.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 text-xs font-medium border border-blue-500/20">
                      {s}
                    </span>
                  ))}
                </div>

                {/* Milestone */}
                <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-cyan-500/5 border border-green-500/20">
                  <Award className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-sm text-slate-300">
                    <span className="text-green-300 font-medium">Milestone:</span> {phase.milestone}
                  </span>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===== Resources Section ===== */
function ResourcesSection({ analysis }: { analysis: CareerAnalysis }) {
  const allResources = analysis.careerPaths
    .flatMap((m) => m.path.resources.map((r) => ({ ...r, career: m.path.title })))
    .filter((r, idx, arr) => arr.findIndex((x) => x.title === r.title) === idx);

  const typeIcons: Record<string, typeof BookOpen> = {
    Course: GraduationCap,
    Documentation: BookOpen,
    Tutorial: Lightbulb,
    Book: BookOpen,
    Video: Zap,
    Practice: Code2,
  };

  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-3">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-slate-300 font-medium">Learning Resources</span>
        </div>
        <h3 className="font-display text-2xl font-bold text-white mb-2">
          Curated <span className="gradient-text">Learning Resources</span>
        </h3>
        <p className="text-slate-400 text-sm">Hand-picked resources to help you build the skills you need</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {allResources.map((res, idx) => {
          const Icon = typeIcons[res.type] || BookOpen;
          return (
            <a
              key={res.title}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-2xl p-5 card-hover group animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-blue-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-white font-semibold text-sm group-hover:text-cyan-300 transition-colors">{res.title}</h4>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                    <span>{res.provider}</span>
                    <span>•</span>
                    <span>{res.type}</span>
                    <span>•</span>
                    <span>{res.level}</span>
                  </div>
                  <div className="mt-2">
                    <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 text-xs">{res.skill}</span>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
