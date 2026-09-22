import {
  Compass,
  ArrowRight,
  GraduationCap,
  Brain,
  Briefcase,
  MapPin,
  Sparkles,
  TrendingUp,
  Users,
  Award,
  CheckCircle2,
  Code2,
  BarChart3,
  ShieldCheck,
  Cloud,
  Palette,
} from 'lucide-react';
import type { Page } from '@/App';
import { Button } from '@/components/ui/Button';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const iconMap: Record<string, typeof Code2> = {
  Code2,
  BarChart3,
  Brain,
  ShieldCheck,
  Cloud,
  Palette,
};

const careerPreviews = [
  { icon: 'Code2', title: 'Software Engineer', demand: 'Very High', salary: '$85K-$140K' },
  { icon: 'BarChart3', title: 'Data Scientist', demand: 'Very High', salary: '$95K-$160K' },
  { icon: 'Brain', title: 'ML Engineer', demand: 'Very High', salary: '$110K-$185K' },
  { icon: 'ShieldCheck', title: 'Cybersecurity', demand: 'Very High', salary: '$80K-$140K' },
  { icon: 'Cloud', title: 'Cloud Architect', demand: 'High', salary: '$120K-$200K' },
  { icon: 'Palette', title: 'UI/UX Designer', demand: 'High', salary: '$70K-$120K' },
];

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      {/* ===== Hero ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink-900">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-900/50 to-ink-900" />

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] animate-pulse delay-500" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6 animate-fade-in-up">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-slate-300 font-medium">AI-Powered Career Discovery</span>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 animate-fade-in-up delay-100">
                CareerCompass <span className="gradient-text">AI</span>
              </h1>

              <p className="text-xl sm:text-2xl text-slate-300 font-medium mb-4 animate-fade-in-up delay-200">
                Discover your skills. Explore your career. Build your future.
              </p>

              <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed animate-fade-in-up delay-300">
                An AI-powered career companion that helps you understand your strengths,
                discover career paths, identify skill gaps, and build a personalized roadmap.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-400">
                <Button size="lg" onClick={() => onNavigate('assessment')}>
                  Start Career Assessment
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => onNavigate('explore')}>
                  Explore Careers
                </Button>
              </div>

              <div className="flex items-center gap-6 mt-10 justify-center lg:justify-start animate-fade-in-up delay-500">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm text-slate-400">12+ Career Paths</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-slate-400">Personalized Roadmaps</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-slate-400">AI Analysis</span>
                </div>
              </div>
            </div>

            {/* Right: AI illustration */}
            <div className="relative hidden lg:flex items-center justify-center h-[500px] animate-fade-in delay-300">
              <AIOrbitIllustration />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 bg-slate-500 rounded-full animate-blink" />
          </div>
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section className="relative py-24 bg-ink-900 overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-4">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-slate-300 font-medium">How It Works</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Your Journey in <span className="gradient-text">4 Steps</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From sharing your background to building a personalized career roadmap — it all starts here.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: GraduationCap,
                step: '01',
                title: 'Tell Us About You',
                desc: 'Enter your education, skills, interests and goals through a guided assessment.',
                color: 'blue',
              },
              {
                icon: Brain,
                step: '02',
                title: 'AI Analyzes Your Profile',
                desc: 'CareerCompass analyzes your information using our career intelligence engine.',
                color: 'cyan',
              },
              {
                icon: Briefcase,
                step: '03',
                title: 'Discover Career Paths',
                desc: 'Explore careers related to your profile with match scores and alignment.',
                color: 'green',
              },
              {
                icon: MapPin,
                step: '04',
                title: 'Build Your Roadmap',
                desc: 'Get skills, projects and learning recommendations tailored to you.',
                color: 'amber',
              },
            ].map((item, idx) => (
              <div
                key={item.step}
                className="relative group animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="glass rounded-2xl p-6 card-hover h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${item.color}-500/15 border border-${item.color}-500/30`}>
                      <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                    </div>
                    <span className="text-3xl font-display font-bold text-slate-700 group-hover:text-slate-600 transition-colors">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                    <ArrowRight className="w-5 h-5 text-slate-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Career Preview ===== */}
      <section className="relative py-24 bg-ink-800/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Explore <span className="gradient-text">Career Paths</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Discover in-demand careers with detailed insights, required skills, and learning roadmaps.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerPreviews.map((career, idx) => {
              const Icon = iconMap[career.icon];
              return (
                <div
                  key={career.title}
                  className="glass rounded-2xl p-6 card-hover cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                  onClick={() => onNavigate('explore')}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-300" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{career.title}</h3>
                      <span className="text-xs text-green-400 font-medium">{career.demand} demand</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                    <span className="text-sm text-slate-400">Avg. Salary</span>
                    <span className="text-sm font-semibold text-cyan-300">{career.salary}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={() => onNavigate('explore')}>
              View All Career Paths
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* ===== Features ===== */}
      <section className="relative py-24 bg-ink-900 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              What You'll <span className="gradient-text">Discover</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              A comprehensive career analysis that goes beyond simple matching.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Briefcase, title: 'Possible Career Paths', desc: 'Discover careers aligned with your profile, ranked by match score.' },
              { icon: TrendingUp, title: 'Career-Skill Alignment', desc: 'See how well your current skills align with each career path.' },
              { icon: CheckCircle2, title: 'Existing Skills', desc: 'Identify which of your skills are relevant to your target careers.' },
              { icon: Brain, title: 'Skill Gaps Analysis', desc: 'Find the missing skills you need to reach your dream career.' },
              { icon: Sparkles, title: 'Recommended Technologies', desc: 'Get curated tech stack recommendations for your chosen path.' },
              { icon: MapPin, title: 'Personalized Roadmap', desc: 'Follow a step-by-step learning plan tailored to your level.' },
            ].map((feature, idx) => (
              <div
                key={feature.title}
                className="glass rounded-2xl p-6 card-hover animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-cyan-300" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-24 bg-ink-800/50 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300 font-medium">Ready to Begin?</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Start Your <span className="gradient-text">Career Journey</span> Today
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Take the free AI-powered assessment and discover the career path that's right for you.
            Get your personalized roadmap in minutes.
          </p>
          <Button size="lg" onClick={() => onNavigate('assessment')}>
            Start Career Assessment
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}

function AIOrbitIllustration() {
  const orbits = [
    { radius: 80, duration: '20s', items: [{ icon: 'Code2', angle: 0 }] },
    { radius: 130, duration: '25s', items: [{ icon: 'BarChart3', angle: 90 }, { icon: 'Brain', angle: 270 }] },
    { radius: 180, duration: '30s', items: [{ icon: 'Cloud', angle: 45 }, { icon: 'ShieldCheck', angle: 180 }, { icon: 'Palette', angle: 300 }] },
  ];

  const iconComponents: Record<string, typeof Code2> = {
    Code2,
    BarChart3,
    Brain,
    Cloud,
    ShieldCheck,
    Palette,
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central core */}
      <div className="absolute z-20 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-2xl shadow-blue-500/50 animate-pulse-glow">
        <Compass className="w-12 h-12 text-white" />
      </div>

      {/* Orbit rings */}
      {[80, 130, 180].map((r) => (
        <div
          key={r}
          className="absolute rounded-full border border-blue-500/20"
          style={{ width: r * 2, height: r * 2 }}
        />
      ))}

      {/* Orbiting icons */}
      {orbits.map((orbit, oi) =>
        orbit.items.map((item, ii) => {
          const Icon = iconComponents[item.icon];
          const delay = `${(item.angle / 360) * parseFloat(orbit.duration)}s`;
          return (
            <div
              key={`${oi}-${ii}`}
              className="absolute"
              style={{
                animation: `spin-slow ${orbit.duration} linear infinite`,
                animationDelay: `-${delay}`,
              }}
            >
              <div
                className="absolute"
                style={{
                  transform: `translateX(${orbit.radius}px)`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl glass flex items-center justify-center -ml-6 -mt-6"
                  style={{
                    animation: `spin-slow ${orbit.duration} linear infinite reverse`,
                    animationDelay: `-${delay}`,
                  }}
                >
                  <Icon className="w-5 h-5 text-cyan-300" />
                </div>
              </div>
            </div>
          );
        }),
      )}

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/60"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${20 + Math.random() * 60}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
}
