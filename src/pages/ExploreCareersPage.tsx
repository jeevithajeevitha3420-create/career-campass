import { useState } from 'react';
import {
  Compass,
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
  Award,
  Zap,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  BookOpen,
  Rocket,
  Sparkles,
  Search,
  X,
} from 'lucide-react';
import { CAREER_PATHS } from '@/data/careers';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import type { Page } from '@/App';

interface ExploreCareersPageProps {
  onNavigate: (page: Page) => void;
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
};

const categories = ['All', 'Engineering', 'Data & AI', 'Infrastructure', 'Security', 'Design', 'Research', 'Business'];

export function ExploreCareersPage({ onNavigate }: ExploreCareersPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = CAREER_PATHS.filter((path) => {
    const matchesCategory = selectedCategory === 'All' || path.category === selectedCategory;
    const matchesSearch =
      search === '' ||
      path.title.toLowerCase().includes(search.toLowerCase()) ||
      path.coreSkills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-ink-900 pt-16">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-4">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-300 font-medium">Explore Careers</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Discover <span className="gradient-text">Career Paths</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Browse in-demand career paths with detailed insights on required skills, salary, growth, and learning resources.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search careers or skills..."
            className="w-full pl-12 pr-12 py-3.5 rounded-xl glass-light text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-500/20 border border-blue-500/50 text-white'
                  : 'glass-light text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-slate-400 text-sm mb-6">
          Showing {filtered.length} career path{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Career cards */}
        <div className="space-y-4">
          {filtered.map((path, idx) => {
            const Icon = iconMap[path.icon] || Compass;
            const isExpanded = expandedId === path.id;

            return (
              <Card key={path.id} className="animate-fade-in-up" hover>
                <div className="cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : path.id)}>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/15 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-cyan-300" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <h3 className="font-display font-bold text-white text-lg">{path.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="slate">{path.category}</Badge>
                            <span className="text-xs text-green-400">{path.demand} demand</span>
                            <span className="text-xs text-slate-500">{path.growthRate}</span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-sm font-semibold text-amber-300">{path.avgSalary}</div>
                          <div className="text-xs text-slate-500">avg. salary</div>
                        </div>
                      </div>

                      <p className="text-slate-400 text-sm mb-3 line-clamp-2">{path.description}</p>

                      <div className="flex flex-wrap gap-1.5">
                        {path.coreSkills.slice(0, 6).map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-300 text-xs font-medium">
                            {s}
                          </span>
                        ))}
                        {path.coreSkills.length > 6 && (
                          <span className="px-2 py-0.5 text-slate-500 text-xs">+{path.coreSkills.length - 6} more</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-slate-700/50 animate-fade-in">
                    {/* Stats */}
                    <div className="grid sm:grid-cols-3 gap-4 mb-6">
                      <div className="glass-light rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="w-4 h-4 text-cyan-400" />
                          <span className="text-xs text-slate-400">Growth Rate</span>
                        </div>
                        <p className="text-white font-semibold text-sm">{path.growthRate}</p>
                      </div>
                      <div className="glass-light rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Award className="w-4 h-4 text-amber-400" />
                          <span className="text-xs text-slate-400">Avg. Salary</span>
                        </div>
                        <p className="text-white font-semibold text-sm">{path.avgSalary}</p>
                      </div>
                      <div className="glass-light rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Zap className="w-4 h-4 text-green-400" />
                          <span className="text-xs text-slate-400">Demand</span>
                        </div>
                        <p className="text-white font-semibold text-sm">{path.demand}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">{path.description}</p>

                    {/* Core skills */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-blue-400" />
                        Core Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {path.coreSkills.map((s) => (
                          <span key={s} className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-300 text-xs font-medium border border-blue-500/20">
                            {s}
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
                        {path.recommendedTech.map((t) => (
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
                        Project Recommendations
                      </h4>
                      <div className="space-y-3">
                        {path.projects.map((proj) => (
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

                    {/* Resources */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-green-400" />
                        Learning Resources
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {path.resources.map((res) => (
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

                    {/* CTA */}
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/5 border border-blue-500/20">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                      <p className="text-sm text-slate-300 flex-1">
                        Want to see how well this career matches your profile?
                      </p>
                      <Button size="sm" onClick={() => onNavigate('assessment')}>
                        Take Assessment
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl glass-light flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">No careers found</h3>
            <p className="text-slate-400 text-sm mb-4">Try a different search or category filter</p>
            <Button variant="outline" onClick={() => { setSearch(''); setSelectedCategory('All'); }}>
              Clear filters
            </Button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="glass rounded-2xl p-8">
            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Not sure which path is right for you?
            </h3>
            <p className="text-slate-400 text-sm mb-6 max-w-xl mx-auto">
              Take the AI-powered assessment and get personalized career recommendations based on your unique profile.
            </p>
            <Button size="lg" onClick={() => onNavigate('assessment')}>
              <Sparkles className="w-5 h-5" />
              Start Career Assessment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
