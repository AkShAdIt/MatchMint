import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Camera, ChevronRight, ChevronLeft, CheckCircle2, Briefcase, Lock, Image as ImageIcon, ShieldAlert } from 'lucide-react';

export const OwnerRegistrationPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [accessCode, setAccessCode] = useState('');
  const [codeError, setCodeError] = useState('');
  
  const [formData, setFormData] = useState({
    teamName: '',
    ownerName: '',
    phone: '',
    village: '',
    managerName: '',
    sponsorName: '',
    logoUrl: '',
  });

  const updateForm = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      updateForm('logoUrl', url);
    }
  };

  const validateAccessCode = () => {
    if (accessCode.trim().length < 5) {
      setCodeError('Invalid access code. Please check with your organizer.');
      return false;
    }
    setCodeError('');
    return true;
  };

  const handleNext = () => {
    if (step === 1) {
      if (!validateAccessCode()) return;
    }
    setStep(prev => prev + 1);
  };
  
  const handleBack = () => setStep(prev => prev - 1);

  const isStepValid = () => {
    if (step === 1) {
      return accessCode.trim().length > 0;
    }
    if (step === 2) {
      const isPhoneValid = /^\d{10}$/.test(formData.phone.trim());
      return (
        formData.teamName.trim() !== '' &&
        formData.ownerName.trim() !== '' &&
        formData.village.trim() !== '' &&
        isPhoneValid
      );
    }
    return true;
  };

  const renderStepIndicator = () => {
    const steps = ['Access', 'Team Details', 'Preview'];
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
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background with blur and gradient overlay */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat blur-sm opacity-20"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80")' }}
      />

      <main className="flex-1 flex flex-col relative z-10">
        <div className="w-full max-w-2xl mx-auto px-4 mt-6 mb-4 flex justify-end">
           {step !== 4 && (
            <button 
              onClick={() => navigate('/register')}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
           )}
        </div>

        <div className="flex-1 flex items-start justify-center px-4 pb-12 sm:px-6">
          <div className="relative w-full max-w-2xl bg-card border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            
            {/* Header Ambient Glow */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>

            <div className="px-6 pt-8 pb-4 sm:px-10 sm:pt-10 border-b border-white/5 relative z-10 text-center sm:text-left">
              <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-3">
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                  <Lock className="w-3 h-3" />
                  Invitation Only
                </span>
              </div>
              <h2 className="text-2xl font-poppins font-bold text-white mb-1">
                {step === 1 ? 'Tournament Access' : step === 2 ? 'Team Registration' : step === 3 ? 'Review Team Card' : 'Registration Submitted'}
              </h2>
              <p className="text-sm text-gray-400">
                {step === 1 ? 'Enter your secure code to register a team.' : step === 2 ? 'Provide details for your franchise.' : step === 3 ? 'Confirm how your team appears in the auction.' : 'Awaiting organizer approval.'}
              </p>
            </div>

            <div className="px-6 py-6 sm:px-10 sm:py-8 relative z-10">
              
              {step < 4 && renderStepIndicator()}

              {/* STEP 1: Access Code Gate */}
              {step === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 py-8">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
                      <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-poppins font-bold text-white mb-2">Have an Access Code?</h3>
                    <p className="text-sm text-gray-400 max-w-sm mb-8">
                      Team ownership is restricted. You need an access code provided by the tournament organizer to proceed.
                    </p>

                    <div className="w-full max-w-sm space-y-2">
                      <input 
                        type="text" 
                        value={accessCode} 
                        onChange={(e) => {
                          setAccessCode(e.target.value.toUpperCase());
                          setCodeError('');
                        }}
                        placeholder="ENTER CODE" 
                        className={`w-full bg-background border rounded-xl px-4 py-4 text-center text-xl font-bold tracking-widest text-white focus:outline-none transition-all ${
                          codeError ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50'
                        }`}
                      />
                      {codeError && (
                        <p className="text-red-400 text-xs font-medium text-left px-1">{codeError}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Team Details */}
              {step === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div className="flex flex-col items-center justify-center mb-8">
                    <label className="text-xs font-medium text-gray-400 mb-2">Franchise Logo</label>
                    <label className="relative w-28 h-28 rounded-full border-2 border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center text-gray-500 hover:border-primary/50 hover:text-primary transition-colors cursor-pointer group overflow-hidden shadow-lg">
                      <input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={handleLogoUpload} />
                      {formData.logoUrl ? (
                        <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <ImageIcon className="w-8 h-8 mb-1 group-hover:scale-110 transition-transform" />
                          <span className="text-[10px] uppercase tracking-wider font-medium leading-tight text-center px-2">Upload Logo</span>
                        </>
                      )}
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5 col-span-1 sm:col-span-2">
                      <label className="text-xs font-medium text-gray-400 ml-1">Team Name *</label>
                      <input type="text" value={formData.teamName} onChange={(e) => updateForm('teamName', e.target.value)} placeholder="e.g. Royal Strikers" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600 font-bold" />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-400 ml-1">Owner Name *</label>
                      <input type="text" value={formData.ownerName} onChange={(e) => updateForm('ownerName', e.target.value)} placeholder="Full Name" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-400 ml-1">Phone Number *</label>
                      <input type="tel" maxLength={10} value={formData.phone} onChange={(e) => updateForm('phone', e.target.value.replace(/\D/g, ''))} placeholder="10-digit mobile" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600" />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-400 ml-1">Base Village / Area *</label>
                      <input type="text" value={formData.village} onChange={(e) => updateForm('village', e.target.value)} placeholder="e.g. Malpe" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-400 ml-1">Manager / Secretary (Optional)</label>
                      <input type="text" value={formData.managerName} onChange={(e) => updateForm('managerName', e.target.value)} placeholder="Name" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-400 ml-1">Primary Sponsor (Optional)</label>
                    <input type="text" value={formData.sponsorName} onChange={(e) => updateForm('sponsorName', e.target.value)} placeholder="e.g. ABC Enterprises" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600" />
                  </div>
                </div>
              )}

              {/* STEP 3: Preview */}
              {step === 3 && (
                <div className="animate-in slide-in-from-right-4 duration-300">
                  <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl mx-auto max-w-sm group">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[60px] -mr-20 -mt-20"></div>
                    
                    <div className="flex flex-col items-center justify-center text-center relative z-10">
                      <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center overflow-hidden mb-4 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                        {formData.logoUrl ? (
                          <img src={formData.logoUrl} alt="Team Logo" className="w-full h-full object-cover" />
                        ) : (
                          <ShieldAlert className="w-10 h-10 text-gray-600" />
                        )}
                      </div>

                      <h3 className="text-3xl font-poppins font-black text-white uppercase italic tracking-tight leading-none mb-2">
                        {formData.teamName || 'TEAM NAME'}
                      </h3>
                      
                      <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                          {formData.village || 'Location'}
                        </span>
                      </div>

                      <div className="w-full space-y-3">
                        <div className="bg-black/40 border border-white/5 rounded-xl p-3 flex justify-between items-center">
                          <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Owner</span>
                          <span className="text-sm font-bold text-white">{formData.ownerName || '-'}</span>
                        </div>
                        {formData.managerName && (
                          <div className="bg-black/40 border border-white/5 rounded-xl p-3 flex justify-between items-center">
                            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Manager</span>
                            <span className="text-sm font-medium text-gray-300">{formData.managerName}</span>
                          </div>
                        )}
                        {formData.sponsorName && (
                          <div className="bg-black/40 border border-white/5 rounded-xl p-3 flex justify-between items-center">
                            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Sponsor</span>
                            <span className="text-sm font-medium text-primary">{formData.sponsorName}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-400 mt-6 max-w-sm mx-auto">
                    This franchise card will be displayed during the live auction and on the public tournament page.
                  </p>
                </div>
              )}

              {/* STEP 4: Success */}
              {step === 4 && (
                <div className="text-center py-12 animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                    <ShieldAlert className="w-10 h-10 text-yellow-500" />
                  </div>
                  <h2 className="text-3xl font-poppins font-bold text-white mb-3">Pending Approval</h2>
                  <p className="text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed">
                    Your franchise registration for <span className="text-white font-medium">"{formData.teamName}"</span> has been submitted to the tournament organizer.
                  </p>
                  
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 max-w-sm mx-auto mb-8 text-left">
                    <h4 className="text-sm font-bold text-white mb-2">Next Steps</h4>
                    <ul className="space-y-2 text-xs text-gray-400">
                      <li className="flex gap-2"><span className="text-primary">•</span> The organizer will review your details.</li>
                      <li className="flex gap-2"><span className="text-primary">•</span> You will be notified once approved.</li>
                      <li className="flex gap-2"><span className="text-primary">•</span> Once approved, you can access your purse and enter the live auction room.</li>
                    </ul>
                  </div>

                  <button 
                    onClick={() => navigate('/')}
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
                  onClick={step === 1 ? () => navigate(-1) : handleBack}
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
                  {step === 1 ? 'Validate Code' : step === 3 ? 'Submit Registration' : 'Continue'}
                  {step < 3 && <ChevronRight className="w-4 h-4 opacity-70" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
