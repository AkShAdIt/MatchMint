import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trophy, Briefcase, User, CheckCircle2, ChevronRight } from 'lucide-react';

export const RegisterRolePage = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'organizer',
      title: 'Organizer',
      description: 'Create and manage local cricket tournaments.',
      icon: <Trophy className="h-8 w-8 text-primary" />,
      features: [
        'Create tournaments',
        'Manage auctions',
        'Approve registrations',
        'Control matches and formats'
      ],
      cta: 'Continue as Organizer'
    },
    {
      id: 'owner',
      title: 'Team Owner',
      description: 'Participate in player auctions and build your squad.',
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      features: [
        'Join tournament auctions',
        'Bid for players live',
        'Manage team purse',
        'Build your playing XI'
      ],
      cta: 'Continue as Owner'
    },
    {
      id: 'player',
      title: 'Player',
      description: 'Register for tournaments and enter the auction pool.',
      icon: <User className="h-8 w-8 text-primary" />,
      features: [
        'Create player profile',
        'Enter tournament auctions',
        'Get selected by teams',
        'Track tournament participation'
      ],
      cta: 'Register as Player',
      isHighlight: true
    }
  ];

  const handleRoleSelect = (roleId: string) => {
    if (roleId === 'player') {
      navigate('/register/tournament');
    } else {
      alert(`Opening ${roleId} placeholder flow...`);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background with blur and gradient overlay */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat blur-sm opacity-20"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80")' }}
      />
      
      {/* Header */}
      <header className="p-6 relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-2xl font-poppins font-bold tracking-tight text-white">
            Match<span className="text-primary">Mint</span>
          </span>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors focus:outline-none"
        >
          <X className="h-5 w-5" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10">
        <div className="w-full max-w-5xl bg-card border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
          
          <div className="px-6 py-12 sm:px-12 sm:py-16 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-white mb-4 tracking-tight">
                Choose your role
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto text-lg">
                Select how you want to participate in the MatchMint tournament ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {roles.map((role) => (
                <div 
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`flex flex-col bg-card rounded-2xl border transition-all duration-300 cursor-pointer group hover:-translate-y-1 ${
                    role.isHighlight 
                      ? 'border-primary/30 hover:border-primary shadow-[0_0_20px_rgba(255,90,0,0.1)] hover:shadow-[0_0_30px_rgba(255,90,0,0.2)]' 
                      : 'border-white/5 hover:border-white/20 hover:shadow-xl'
                  }`}
                >
                  <div className="p-8 flex-1">
                    <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center ${
                      role.isHighlight ? 'bg-primary/20' : 'bg-white/5'
                    }`}>
                      {role.icon}
                    </div>
                    
                    <h3 className="text-2xl font-poppins font-bold text-white mb-3">
                      {role.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                      {role.description}
                    </p>
                    
                    <ul className="space-y-3 mb-8">
                      {role.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 pt-0 mt-auto">
                    <button className={`w-full py-3.5 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                      role.isHighlight 
                        ? 'bg-primary text-white hover:bg-primary/90' 
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}>
                      {role.cta}
                      <ChevronRight className={`h-4 w-4 ${role.isHighlight ? '' : 'opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300'}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
