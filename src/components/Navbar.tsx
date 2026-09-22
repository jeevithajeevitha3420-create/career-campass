import { Compass, Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { Page } from '@/App';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { label: string; page: Page }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Assessment', page: 'assessment' },
    { label: 'Explore Careers', page: 'explore' },
  ];

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-blue-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-400/50 transition-shadow">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-white tracking-tight">
              CareerCompass <span className="text-cyan-400">AI</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === item.page
                    ? 'text-white bg-blue-500/15 border border-blue-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <button
              onClick={() => handleNav('assessment')}
              className="px-5 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-600/20"
            >
              Start Assessment
            </button>
          </div>

          <button
            className="md:hidden text-slate-300 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass border-t border-blue-500/10 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNav(item.page)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  currentPage === item.page
                    ? 'text-white bg-blue-500/15'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('assessment')}
              className="block w-full text-center px-4 py-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
            >
              Start Assessment
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
