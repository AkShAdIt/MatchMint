import React, { useState } from 'react';
import { Search, Bell, Settings, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <nav className="bg-card border-b border-white/5 sticky top-0 z-50 flex items-center justify-between px-6 py-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
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

        <button className="text-gray-400 hover:text-white transition-colors">
          <Bell className="h-5 w-5" />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors">
          <Settings className="h-5 w-5" />
        </button>
        
        {user ? (
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-[#141414] border border-white/10 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <button 
                  onClick={() => { logout(); setIsDropdownOpen(false); }}
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
    </nav>
  );
};
