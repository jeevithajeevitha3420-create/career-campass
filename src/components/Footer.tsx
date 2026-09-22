import { Compass, Github, Twitter, Linkedin } from 'lucide-react';
import type { Page } from '@/App';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-blue-500/10 bg-ink-900/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                CareerCompass <span className="text-cyan-400">AI</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              An AI-powered career companion that helps you understand your strengths,
              discover career paths, identify skill gaps, and build a personalized roadmap.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/30 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/30 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg glass-light flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/30 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Platform</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => onNavigate('assessment')} className="text-slate-400 hover:text-cyan-300 text-sm transition-colors">Career Assessment</button></li>
              <li><button onClick={() => onNavigate('explore')} className="text-slate-400 hover:text-cyan-300 text-sm transition-colors">Explore Careers</button></li>
              <li><button onClick={() => onNavigate('home')} className="text-slate-400 hover:text-cyan-300 text-sm transition-colors">How It Works</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-slate-400 hover:text-cyan-300 text-sm transition-colors">Learning Paths</a></li>
              <li><a href="#" className="text-slate-400 hover:text-cyan-300 text-sm transition-colors">Career Guides</a></li>
              <li><a href="#" className="text-slate-400 hover:text-cyan-300 text-sm transition-colors">Skill Tracker</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700/50 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-slate-500 text-xs">
            © 2026 CareerCompass AI. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs">
            Discover your skills. Explore your career. Build your future.
          </p>
        </div>
      </div>
    </footer>
  );
}
