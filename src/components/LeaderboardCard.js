import React from 'react';
import { Crown } from 'lucide-react';

const LeaderboardCard = ({ rank, name, points, avatar, badges = [] }) => (
  <div className={`
    flex items-center gap-4 p-4 rounded-lg border-2 
    ${rank === 1 ? 'bg-yellow-50 border-yellow-200' : 
      rank === 2 ? 'bg-gray-50 border-gray-200' : 
      rank === 3 ? 'bg-orange-50 border-orange-200' : 
      'bg-white border-gray-100'}
  `}>
    <div className="flex-shrink-0 relative">
      {rank <= 3 && (
        <Crown 
          className={`absolute -top-3 -left-1 h-5 w-5 
            ${rank === 1 ? 'text-yellow-500' : 
              rank === 2 ? 'text-gray-500' : 
              'text-orange-500'}`}
        />
      )}
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
        {name.charAt(0)}
      </div>
    </div>
    <div className="flex-grow">
      <div className="flex items-center gap-2">
        <span className="font-bold">{name}</span>
        <div className="flex gap-1">
          {badges.map((badge, idx) => (
            <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              {badge}
            </span>
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-600">
        {points.toLocaleString()} points
      </p>
    </div>
    <div className="flex-shrink-0 text-2xl font-bold text-gray-400">
      #{rank}
    </div>
  </div>
);

export default LeaderboardCard;