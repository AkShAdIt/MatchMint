import React from 'react';
import { newsAnnouncements } from '../../data/mockData';

export const NewsPanel = () => {
  return (
    <div className="bg-card border border-white/5 rounded-2xl p-5 hover:border-primary/20 hover:shadow-[0_0_20px_rgba(255,90,0,0.05)] transition-all duration-500">
      <h3 className="font-poppins font-medium text-gray-200 mb-4 flex items-center justify-between">
        News & Updates
        <span className="text-[10px] uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
          Latest
        </span>
      </h3>
      
      <div className="space-y-4">
        {newsAnnouncements.map((news) => (
          <div key={news.id} className="relative pl-3 py-1 border-l-2 border-white/10 hover:border-primary hover:bg-white/[0.02] transition-all duration-300 group cursor-pointer rounded-r-md">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block group-hover:text-primary transition-colors">
              {news.tournament} • {news.date}
            </span>
            <p className="text-sm text-gray-300 group-hover:text-white transition-colors leading-snug">
              {news.text}
            </p>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-5 py-2 text-xs font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
        View All News
      </button>
    </div>
  );
};
