import React from 'react';
import { activityFeed } from '../../data/mockData';
import { Calendar, Users, Trophy } from 'lucide-react';

export const ActivityPanel = () => {
  const getIcon = (type: string) => {
    switch(type) {
      case 'registration': return <Users className="h-3 w-3 text-secondary" />;
      case 'auction': return <Calendar className="h-3 w-3 text-primary" />;
      case 'match': return <Trophy className="h-3 w-3 text-primary" />;
      default: return <div className="h-1.5 w-1.5 rounded-full bg-gray-400" />;
    }
  };

  return (
    <div className="bg-card border border-white/5 rounded-2xl p-5 mt-6 hidden xl:block hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,90,0,0.15)] transition-all duration-500">
      <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
        Activity Feed
      </h3>
      
      <div className="space-y-3">
        {activityFeed.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="mt-1 h-6 w-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
              {getIcon(activity.type)}
            </div>
            <div>
              <p className="text-xs text-gray-300 leading-tight">
                {activity.text}
              </p>
              <span className="text-[10px] text-gray-500 mt-0.5 block">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
