import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Settings, User, LogOut, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState<'user' | 'notifications' | 'settings' | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (dropdown: 'user' | 'notifications' | 'settings') => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const notifications = [
    { id: 1, type: 'alert', text: 'Match delayed due to rain.', time: '10m ago' },
    { id: 2, type: 'success', text: 'Registration successful for KVPL.', time: '2h ago' },
    { id: 3, type: 'alert', text: 'Auction starts in 2 hours!', time: '1d ago' },
  ];
  return (
    <nav className="bg-card border-b border-white/5 sticky top-0 z-50 px-6 py-4" ref={navRef}>
      <div className="flex items-center justify-between">
      {/* Logo */}
      <div 
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => navigate('/')}
      >
        <span className="text-2xl font-poppins font-bold tracking-tight text-white">
          Match<span className="text-primary">Mint</span>
        </span>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-full leading-5 bg-white/5 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white/10 focus:border-primary/50 transition-colors sm:text-sm"
          placeholder="Search tournaments, teams, players..."
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/register')}
          className="hidden sm:block px-5 py-1.5 rounded-full bg-primary text-white font-medium text-sm hover:bg-primary/90 transition-colors shadow-[0_0_10px_rgba(255,90,0,0.3)]"
        >
          Register
        </button>
        <button className="hidden sm:block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 font-medium text-sm transition-colors">
          AUCTIONS
        </button>
        
        <div className="h-6 w-px bg-white/10 mx-1 hidden sm:block"></div>

        <div className="relative">
          <button 
            onClick={() => toggleDropdown('notifications')}
            className={`transition-colors relative ${activeDropdown === 'notifications' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-primary rounded-full border-2 border-card"></span>
          </button>

          {activeDropdown === 'notifications' && (
            <div className="absolute right-0 mt-4 w-80 bg-card-alt border border-white/10 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
              <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/5 flex justify-between items-center">
                <h3 className="font-poppins font-bold text-white text-sm">Notifications</h3>
                <button className="text-xs text-primary hover:text-white transition-colors">Mark all read</button>
              </div>
              <div className="divide-y divide-white/5 max-h-[300px] overflow-y-auto hide-scrollbar">
                {notifications.map(n => (
                  <div key={n.id} className="p-4 hover:bg-white/5 transition-colors cursor-pointer flex gap-3">
                    <div className="mt-0.5">
                      {n.type === 'alert' ? <AlertCircle className="h-4 w-4 text-primary" /> : <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">{n.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-white/5 text-center">
                <button className="text-xs font-bold text-gray-400 hover:text-white transition-colors">View All Settings</button>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button 
            onClick={() => toggleDropdown('settings')}
            className={`transition-colors ${activeDropdown === 'settings' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Settings className="h-5 w-5" />
          </button>

          {activeDropdown === 'settings' && (
            <div className="absolute right-0 mt-4 w-64 bg-card-alt border border-white/10 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
              <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/5">
                <h3 className="font-poppins font-bold text-white text-sm">Quick Settings</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Push Notifications</span>
                  <div className="w-8 h-4 bg-primary/20 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-primary rounded-full absolute right-0 shadow-md border border-card"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Data Saver</span>
                  <div className="w-8 h-4 bg-white/10 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-gray-400 rounded-full absolute left-0 shadow-md border border-card"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Dark Mode</span>
                  <div className="w-8 h-4 bg-primary/20 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-primary rounded-full absolute right-0 shadow-md border border-card"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {user ? (
          <div className="relative">
            <button 
              onClick={() => toggleDropdown('user')}
              className="flex items-center gap-3 ml-2 pl-4 border-l border-white/10 focus:outline-none group"
            >
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs text-gray-400 leading-none">Welcome,</span>
                <span className="text-sm font-bold text-white leading-tight group-hover:text-primary transition-colors">{user.name}</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 text-primary font-bold group-hover:bg-primary/30 transition-colors">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </button>
            
            {activeDropdown === 'user' && (
              <div className="absolute right-0 mt-3 w-48 bg-[#141414] border border-white/10 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <button 
                  onClick={() => { logout(); setActiveDropdown(null); }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 ml-2 pl-4 py-1 border-l border-white/10 hover:text-primary transition-colors focus:outline-none"
          >
            <span className="text-sm font-medium hidden sm:block">Login / Signup</span>
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <User className="h-4 w-4 text-gray-300" />
            </div>
          </button>
        )}
      </div>
      </div>
    </nav>
  );
};
