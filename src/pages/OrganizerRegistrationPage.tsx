import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Camera, ChevronRight, ChevronLeft, CheckCircle2, Trophy, Image as ImageIcon, Video, MessageSquare, BarChart, Activity, Shield } from 'lucide-react';

export const OrganizerRegistrationPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tournamentName: '',
    location: '',
    description: '',
    organizerName: '',
    phone: '',
    logoUrl: '',
    bannerUrl: '',
  });

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const premiumFeatures = [
    {
      id: 'live-auction',
      title: 'Live Auction Room',
      description: 'Real-time bidding, purse management, and live player assignment.',
      icon: <Trophy className="w-5 h-5 text-primary" />,
      price: '₹1,999'
    },
    {
      id: 'livestream',
      title: 'Livestream Integration',
      description: 'Embed YouTube or Facebook live streams directly on your tournament page.',
      icon: <Video className="w-5 h-5 text-primary" />,
      price: '₹999'
    },
    {
      id: 'chat',
      title: 'Realtime Chat',
      description: 'Dedicated chat rooms for owners and audience during the tournament.',
      icon: <MessageSquare className="w-5 h-5 text-primary" />,
      price: '₹499'
    },
    {
      id: 'advanced-stats',
      title: 'Advanced Statistics',
      description: 'Player heatmaps, wagon wheels, and detailed performance metrics.',
      icon: <Activity className="w-5 h-5 text-primary" />,
      price: '₹1,499'
    },
    {
      id: 'analytics',
      title: 'Analytics Dashboards',
      description: 'Comprehensive views of audience engagement, top players, and sponsor ROI.',
      icon: <BarChart className="w-5 h-5 text-primary" />,
      price: '₹1,299'
    }
  ];

  const updateForm = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      updateForm('logoUrl', url);
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      updateForm('bannerUrl', url);
    }
  };

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const isStepValid = () => {
    if (step === 1) {
      const isPhoneValid = /^\d{10}$/.test(formData.phone.trim());
      return (
        formData.tournamentName.trim() !== '' &&
        formData.location.trim() !== '' &&
        formData.organizerName.trim() !== '' &&
        isPhoneValid
      );
    }
    return true; // Step 2 and 3 are always valid (features are optional)
  };

  const renderStepIndicator = () => {
    const steps = ['Setup', 'Features', 'Checkout'];
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

  const calculateTotal = () => {
    return selectedFeatures.reduce((total, featureId) => {
      const feature = premiumFeatures.find(f => f.id === featureId);
      if (feature) {
        const price = parseInt(feature.price.replace(/[^\d]/g, ''), 10);
        return total + price;
      }
      return total;
    }, 0); // Base platform is free
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background with blur and gradient overlay */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat blur-sm opacity-20"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80")' }}
      />

      <main className="flex-1 flex flex-col relative z-10">
        <div className="w-full max-w-3xl mx-auto px-4 mt-6 mb-4 flex justify-end">
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
          <div className="relative w-full max-w-3xl bg-card border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            
            {/* Header Ambient Glow */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>

            <div className="px-6 pt-8 pb-4 sm:px-10 sm:pt-10 border-b border-white/5 relative z-10 text-center sm:text-left">
              <h2 className="text-2xl font-poppins font-bold text-white mb-1">
                {step === 1 ? 'Create Tournament' : step === 2 ? 'Select Tournament Features' : step === 3 ? 'Review & Checkout' : 'Ecosystem Created'}
              </h2>
              <p className="text-sm text-gray-400">
                {step === 1 ? 'Set up your local cricket ecosystem.' : step === 2 ? 'Customize your platform with premium modules.' : step === 3 ? 'Confirm your tournament package details.' : 'Your workspace is ready.'}
              </p>
            </div>

            <div className="px-6 py-6 sm:px-10 sm:py-8 relative z-10">
              
              {step < 4 && renderStepIndicator()}

              {/* STEP 1: Basic Information */}
              {step === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Logo Upload */}
                    <div className="col-span-1 flex flex-col items-center justify-center">
                      <label className="text-xs font-medium text-gray-400 mb-2">Tournament Logo</label>
                      <label className="relative w-32 h-32 rounded-2xl border-2 border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center text-gray-500 hover:border-primary/50 hover:text-primary transition-colors cursor-pointer group overflow-hidden">
                        <input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={handleLogoUpload} />
                        {formData.logoUrl ? (
                          <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <Trophy className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] uppercase tracking-wider font-medium leading-tight text-center px-2">Upload</span>
                          </>
                        )}
                      </label>
                    </div>

                    <div className="col-span-1 md:col-span-2 space-y-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-400 ml-1">Tournament Name *</label>
                        <input type="text" value={formData.tournamentName} onChange={(e) => updateForm('tournamentName', e.target.value)} placeholder="e.g. Premier League 2024" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600" />
                      </div>
                      
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-400 ml-1">Village / Location *</label>
                        <input type="text" value={formData.location} onChange={(e) => updateForm('location', e.target.value)} placeholder="e.g. Udupi Ground" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-400 ml-1">Description (Optional)</label>
                    <textarea value={formData.description} onChange={(e) => updateForm('description', e.target.value)} placeholder="Briefly describe your tournament..." rows={3} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600 resize-none" />
                  </div>

                  <div className="pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                     <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-400 ml-1">Organizer Name *</label>
                        <input type="text" value={formData.organizerName} onChange={(e) => updateForm('organizerName', e.target.value)} placeholder="Full Name" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-400 ml-1">Contact Number *</label>
                        <input type="tel" maxLength={10} value={formData.phone} onChange={(e) => updateForm('phone', e.target.value.replace(/\D/g, ''))} placeholder="10-digit mobile" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600" />
                      </div>
                  </div>

                  {/* Banner Upload Optional */}
                  <div className="pt-2">
                    <label className="text-xs font-medium text-gray-400 ml-1 mb-2 block">Cover Banner (Optional)</label>
                    <label className="relative w-full h-32 rounded-xl border border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center text-gray-500 hover:border-primary/50 hover:text-primary transition-colors cursor-pointer group overflow-hidden">
                        <input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={handleBannerUpload} />
                        {formData.bannerUrl ? (
                          <img src={formData.bannerUrl} alt="Banner" className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex items-center gap-2">
                            <ImageIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium">Upload Banner Image</span>
                          </div>
                        )}
                      </label>
                  </div>

                </div>
              )}

              {/* STEP 2: Feature Selection */}
              {step === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-start gap-4 mb-6">
                    <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Included for Free</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Every tournament includes player registrations, basic public pages, team owner invites, and match viewing at no cost.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {premiumFeatures.map((feature) => {
                      const isSelected = selectedFeatures.includes(feature.id);
                      return (
                        <div 
                          key={feature.id}
                          onClick={() => toggleFeature(feature.id)}
                          className={`relative p-5 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col h-full ${
                            isSelected 
                              ? 'bg-primary/5 border-primary shadow-[0_0_15px_rgba(255,90,0,0.15)]' 
                              : 'bg-background border-white/10 hover:border-white/30 hover:bg-white/[0.02]'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary/20' : 'bg-white/5'}`}>
                              {feature.icon}
                            </div>
                            <div className="text-right">
                              <span className={`text-sm font-bold ${isSelected ? 'text-primary' : 'text-white'}`}>
                                {feature.price}
                              </span>
                            </div>
                          </div>
                          
                          <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
                          <p className="text-xs text-gray-400 leading-relaxed flex-grow">
                            {feature.description}
                          </p>
                          
                          <div className={`mt-4 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-primary border-primary' : 'border-white/30'
                          }`}>
                            {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: Checkout */}
              {step === 3 && (
                <div className="animate-in slide-in-from-right-4 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Summary */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Tournament Summary</h3>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                            {formData.logoUrl ? (
                              <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                              <Trophy className="w-8 h-8 text-gray-500" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-lg leading-tight">{formData.tournamentName || 'Unnamed Tournament'}</h4>
                            <p className="text-sm text-gray-400">{formData.location || 'No Location'}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-400 space-y-1">
                          <p><span className="text-gray-500">Organizer:</span> {formData.organizerName}</p>
                          <p><span className="text-gray-500">Contact:</span> {formData.phone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="bg-background border border-white/10 rounded-2xl p-6">
                       <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Order Details</h3>
                       
                       <div className="space-y-3 mb-6">
                         <div className="flex justify-between items-center text-sm">
                           <span className="text-gray-400">Basic Platform</span>
                           <span className="text-white font-medium">Free</span>
                         </div>
                         
                         {selectedFeatures.length > 0 ? (
                           selectedFeatures.map(id => {
                             const feature = premiumFeatures.find(f => f.id === id);
                             return (
                               <div key={id} className="flex justify-between items-center text-sm">
                                 <span className="text-gray-400">{feature?.title}</span>
                                 <span className="text-white font-medium">{feature?.price}</span>
                               </div>
                             );
                           })
                         ) : (
                           <div className="text-sm text-gray-500 italic py-2">No premium features selected.</div>
                         )}
                       </div>

                       <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                         <span className="font-bold text-white">Total Amount</span>
                         <span className="text-2xl font-poppins font-bold text-primary">
                           ₹{calculateTotal().toLocaleString()}
                         </span>
                       </div>

                       <p className="text-[10px] text-gray-500 mt-4 text-center">
                         This is a prototype. No payment will be processed.
                       </p>
                    </div>

                  </div>
                </div>
              )}

              {/* STEP 4: Success */}
              {step === 4 && (
                <div className="text-center py-12 animate-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(255,90,0,0.3)]">
                    <Trophy className="w-12 h-12 text-primary" />
                  </div>
                  <h2 className="text-3xl font-poppins font-bold text-white mb-3">Tournament Created!</h2>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                    "{formData.tournamentName}" ecosystem is now active. As the Organizer, you have access to the admin dashboard to manage approvals, auctions, and matches.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8 text-left">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="font-bold text-white text-sm mb-1">1. Share Links</div>
                      <p className="text-xs text-gray-400">Distribute your tournament link to players for registration.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="font-bold text-white text-sm mb-1">2. Invite Owners</div>
                      <p className="text-xs text-gray-400">Generate and share access codes for Team Owners.</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="font-bold text-white text-sm mb-1">3. Review Profiles</div>
                      <p className="text-xs text-gray-400">Approve pending players to add them to the auction pool.</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate('/')}
                    className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(255,90,0,0.4)] focus:outline-none"
                  >
                    Go to Admin Dashboard
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
                  {step === 3 ? 'Confirm & Create' : 'Continue'}
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
