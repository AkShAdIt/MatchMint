import React, { useState } from 'react';
import { X, Camera, ChevronRight, ChevronLeft, Shield, Zap, Target, Flame, CheckCircle2, User } from 'lucide-react';
import { Tournament } from './TournamentSelectionModal';

interface PlayerRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tournament: Tournament | null;
}

export const PlayerRegistrationModal: React.FC<PlayerRegistrationModalProps> = ({ isOpen, onClose, tournament }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    age: '',
    village: '',
    nickname: '',
    photoUrl: '',
    role: '',
    battingStyle: 'Right Handed',
    bowlingStyle: '',
    experience: 'Intermediate',
  });

  if (!isOpen) return null;

  const updateForm = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      updateForm('photoUrl', url);
    }
  };
  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const isStepValid = () => {
    if (step === 1) {
      const isPhoneValid = /^\d{10}$/.test(formData.phone.trim());
      const ageNum = parseInt(formData.age, 10);
      const isAgeValid = !isNaN(ageNum) && ageNum >= 10 && ageNum <= 80;

      return (
        formData.fullName.trim() !== '' &&
        isPhoneValid &&
        isAgeValid &&
        formData.village.trim() !== ''
      );
    }
    if (step === 2) {
      if (!formData.role) return false;
      if ((formData.role === 'Bowler' || formData.role === 'All-Rounder') && !formData.bowlingStyle) {
        return false;
      }
      return true;
    }
    return true;
  };

  const renderStepIndicator = () => {
    const steps = ['Basic Info', 'Cricket Profile', 'Preview'];
    return (
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10 -z-10" />
        {steps.map((s, idx) => {
          const stepNum = idx + 1;
          const isActive = step >= stepNum;
          return (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border transition-colors ${
                isActive 
                  ? 'bg-primary border-primary text-white shadow-[0_0_10px_rgba(255,90,0,0.5)]' 
                  : 'bg-card border-white/20 text-gray-500'
              }`}>
                {step > stepNum ? <CheckCircle2 className="w-5 h-5" /> : stepNum}
              </div>
              <span className={`text-[10px] sm:text-xs font-medium uppercase tracking-wider ${
                isActive ? 'text-primary' : 'text-gray-500'
              }`}>{s}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/90 backdrop-blur-sm"
        onClick={step === 4 ? onClose : undefined}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-background border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 my-auto">
        
        {/* Header Ambient Glow */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>

        {/* Close Button */}
        {step !== 4 && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors focus:outline-none z-20"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Tournament Context Header */}
        <div className="px-6 pt-8 pb-4 sm:px-10 sm:pt-10 border-b border-white/5 relative z-10 text-center sm:text-left">
          <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-3">
            <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-live-gradient animate-pulse"></span>
              Registrations Open
            </span>
          </div>
          <h2 className="text-2xl font-poppins font-bold text-white mb-1">{tournament?.name || 'Tournament'}</h2>
          <p className="text-sm text-gray-400">{tournament?.location || 'Location'}</p>
        </div>

        <div className="px-6 py-6 sm:px-10 sm:py-8 relative z-10">
          
          {step < 4 && renderStepIndicator()}

          {/* STEP 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="flex flex-col items-center justify-center mb-8">
                <label className="relative w-24 h-24 rounded-full border-2 border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center text-gray-500 hover:border-primary/50 hover:text-primary transition-colors cursor-pointer group overflow-hidden">
                  <input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={handlePhotoUpload} />
                  {formData.photoUrl ? (
                    <img src={formData.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <Camera className="w-8 h-8 mb-1 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] uppercase tracking-wider font-medium leading-tight text-center px-2">Upload Photo</span>
                    </>
                  )}
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400 ml-1">Full Name *</label>
                  <input type="text" value={formData.fullName} onChange={(e) => updateForm('fullName', e.target.value)} placeholder="Enter full name" className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400 ml-1">Phone Number *</label>
                  <input type="tel" maxLength={10} value={formData.phone} onChange={(e) => updateForm('phone', e.target.value.replace(/\D/g, ''))} placeholder="10-digit mobile number" className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400 ml-1">Age *</label>
                  <input type="number" min="10" max="80" value={formData.age} onChange={(e) => updateForm('age', e.target.value)} placeholder="10 - 80 years" className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400 ml-1">Village / Area *</label>
                  <input type="text" value={formData.village} onChange={(e) => updateForm('village', e.target.value)} placeholder="e.g. Udupi, Malpe" className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400 ml-1">Nickname (Optional)</label>
                <input type="text" value={formData.nickname} onChange={(e) => updateForm('nickname', e.target.value)} placeholder="What do your teammates call you?" className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600" />
              </div>
            </div>
          )}

          {/* STEP 2: Cricket Profile */}
          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Primary Role *</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'Batsman', icon: Flame },
                    { id: 'Bowler', icon: Target },
                    { id: 'All-Rounder', icon: Zap },
                    { id: 'Wicket Keeper', icon: Shield }
                  ].map((role) => (
                    <button
                      key={role.id}
                      onClick={() => updateForm('role', role.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 focus:outline-none ${
                        formData.role === role.id
                          ? 'bg-primary/10 border-primary text-white shadow-[inset_0_0_20px_rgba(255,90,0,0.1)]'
                          : 'bg-card border-white/5 text-gray-400 hover:border-white/20 hover:bg-white/[0.02]'
                      }`}
                    >
                      <role.icon className={`w-6 h-6 mb-2 ${formData.role === role.id ? 'text-primary' : 'text-gray-500'}`} />
                      <span className="text-sm font-medium">{role.id}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Batting Style</label>
                  <div className="flex bg-card border border-white/10 rounded-xl overflow-hidden p-1">
                    {['Right Handed', 'Left Handed'].map(style => (
                      <button
                        key={style}
                        onClick={() => updateForm('battingStyle', style)}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none ${
                          formData.battingStyle === style ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Experience Level</label>
                  <div className="flex bg-card border border-white/10 rounded-xl overflow-hidden p-1">
                    {['Beginner', 'Intermediate', 'Experienced'].map(exp => (
                      <button
                        key={exp}
                        onClick={() => updateForm('experience', exp)}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none ${
                          formData.experience === exp ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {exp}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {(formData.role === 'Bowler' || formData.role === 'All-Rounder') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-400 ml-1">Bowling Style *</label>
                    <select 
                      value={formData.bowlingStyle} 
                      onChange={(e) => updateForm('bowlingStyle', e.target.value)}
                      className="w-full bg-card border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="text-gray-500">Select style...</option>
                      <option value="Fast">Fast</option>
                      <option value="Medium Pace">Medium Pace</option>
                      <option value="Off Spin">Off Spin</option>
                      <option value="Leg Spin">Leg Spin</option>
                      <option value="Left Arm Spin">Left Arm Spin</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Preview */}
          {step === 3 && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl mx-auto max-w-sm group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[60px] -mr-20 -mt-20"></div>
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div>
                    <div className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">{tournament?.name || 'Tournament'}</div>
                    <div className="text-2xl font-poppins font-black text-white uppercase italic tracking-tight leading-none">Auction <br/>Pool</div>
                  </div>
                  <div className="w-12 h-16 bg-white/5 border border-white/10 rounded flex items-center justify-center overflow-hidden">
                    {formData.photoUrl ? (
                      <img src={formData.photoUrl} alt="Player" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-gray-600" />
                    )}
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  <div>
                    <h3 className="text-3xl font-poppins font-bold text-white tracking-tight truncate">{formData.fullName || 'PLAYER NAME'}</h3>
                    <p className="text-gray-400 font-medium text-sm flex items-center gap-1.5">
                      {formData.village || 'Location'} • {formData.age ? `${formData.age} YRS` : 'Age'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <div className="bg-black/40 border border-white/5 rounded-xl p-3">
                      <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Primary Role</div>
                      <div className="text-sm font-bold text-primary truncate">{formData.role || 'Unassigned'}</div>
                    </div>
                    <div className="bg-black/40 border border-white/5 rounded-xl p-3">
                      <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Batting</div>
                      <div className="text-sm font-bold text-white truncate">{formData.battingStyle}</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-gray-400 mt-6 max-w-sm mx-auto">
                This is how your card will appear to team owners during the live player auction.
              </p>
            </div>
          )}

          {/* STEP 4: Success */}
          {step === 4 && (
            <div className="text-center py-12 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(255,90,0,0.3)]">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl font-poppins font-bold text-white mb-3">Registration Submitted!</h2>
              <p className="text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed">
                You are now in the review pool for {tournament?.name || 'the tournament'}. You will be notified once the organizer approves your profile for the auction.
              </p>
              <button 
                onClick={onClose}
                className="bg-card border border-white/10 hover:border-white/20 text-white font-medium py-3 px-8 rounded-xl transition-all hover:bg-white/5 focus:outline-none"
              >
                Return to Homepage
              </button>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        {step < 4 && (
          <div className="px-6 py-5 sm:px-10 bg-card/50 border-t border-white/5 flex items-center justify-between">
            <button 
              onClick={step === 1 ? onClose : handleBack}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors focus:outline-none flex items-center gap-1"
            >
              {step > 1 && <ChevronLeft className="w-4 h-4" />}
              {step === 1 ? 'Cancel' : 'Back'}
            </button>
            
            <button 
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`font-medium py-2.5 px-6 rounded-xl transition-all focus:outline-none flex items-center gap-2 ${
                isStepValid() 
                  ? 'bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(255,90,0,0.3)] cursor-pointer' 
                  : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10'
              }`}
            >
              {step === 3 ? 'Enter Auction Pool' : 'Continue'}
              {step < 3 && <ChevronRight className="w-4 h-4 opacity-70" />}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
