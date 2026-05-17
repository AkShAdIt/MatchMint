import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Sidebar } from '../components/layout/Sidebar';
import { MainSection } from '../components/home/MainSection';
import { FeaturedMatch } from '../components/home/FeaturedMatch';
import { NewsPanel } from '../components/home/NewsPanel';
import { ActivityPanel } from '../components/home/ActivityPanel';

export const Home = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background with blur and gradient overlay */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat blur-sm opacity-20"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80")' }}
      />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <div className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <Sidebar />
            <MainSection />
            
            {/* Right Sidebar */}
            <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">
              <FeaturedMatch />
              <NewsPanel />
              <ActivityPanel />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};
