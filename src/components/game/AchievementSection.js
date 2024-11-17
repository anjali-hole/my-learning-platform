// src/components/game/AchievementSection.js
import React, { useState } from 'react';
import { Medal, Star, Trophy, Award, Crown, Target, Zap, Shield } from 'lucide-react';
import ProgressBar from '../ui/ProgressBar'; 


const AchievementCard = ({ achievement, isRecent }) => {
  const getAchievementIcon = (type) => {
    switch (type) {
      case 'mastery':
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 'progress':
        return <Target className="h-6 w-6 text-blue-500" />;
      case 'challenge':
        return <Zap className="h-6 w-6 text-purple-500" />;
      case 'social':
        return <Shield className="h-6 w-6 text-green-500" />;
      default:
        return <Medal className="h-6 w-6 text-yellow-500" />;
    }
  };

  const getAchievementColor = (type) => {
    switch (type) {
      case 'mastery':
        return 'bg-yellow-900/50 border-yellow-500';
      case 'progress':
        return 'bg-blue-900/50 border-blue-500';
      case 'challenge':
        return 'bg-purple-900/50 border-purple-500';
      case 'social':
        return 'bg-green-900/50 border-green-500';
      default:
        return 'bg-gray-700 border-gray-500';
    }
  };

  return (
    <div className={`
      p-4 rounded-lg border-2 transition-all duration-300
      ${getAchievementColor(achievement.type)}
      ${isRecent ? 'animate-pulse' : ''}
    `}>
      <div className="flex items-center gap-3">
        {getAchievementIcon(achievement.type)}
        <div>
          <h3 className="font-medium text-white">{achievement.title}</h3>
          <p className="text-sm text-gray-300">{achievement.description}</p>
        </div>
      </div>
      {achievement.progress && (
        <div className="mt-3">
          <ProgressBar 
            value={achievement.progress} 
            color={
              achievement.type === 'mastery' ? 'yellow' :
              achievement.type === 'progress' ? 'blue' :
              achievement.type === 'challenge' ? 'purple' :
              'green'
            }
          />
          <p className="text-sm text-gray-400 mt-1">
            {achievement.progress}% Complete
          </p>
        </div>
      )}
      {achievement.reward && (
        <div className="mt-2 flex items-center gap-2">
          <Award className="h-4 w-4 text-yellow-500" />
          <span className="text-sm text-yellow-300">{achievement.reward}</span>
        </div>
      )}
      {isRecent && (
        <div className="absolute top-2 right-2">
          <span className="px-2 py-1 bg-yellow-500 text-yellow-900 text-xs rounded-full">
            New!
          </span>
        </div>
      )}
    </div>
  );
};

const AchievementSection = ({ achievements }) => {
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const filteredAchievements = achievements.filter(achievement => 
    filter === 'all' ? true : achievement.type === filter
  );

  const displayedAchievements = showAll 
    ? filteredAchievements 
    : filteredAchievements.slice(-4);

  const recentAchievements = achievements
    .filter(a => a.timestamp > Date.now() - 24 * 60 * 60 * 1000);

  const achievementStats = {
    total: achievements.length,
    mastery: achievements.filter(a => a.type === 'mastery').length,
    progress: achievements.filter(a => a.type === 'progress').length,
    challenge: achievements.filter(a => a.type === 'challenge').length,
    social: achievements.filter(a => a.type === 'social').length
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <div>
            <h2 className="text-2xl font-bold">Achievements</h2>
            <p className="text-sm text-gray-400">
              {achievementStats.total} Total Achievements Unlocked
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-sm
              ${filter === 'all' ? 'bg-white text-gray-900' : 'bg-gray-700 text-white'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('mastery')}
            className={`px-3 py-1 rounded-full text-sm
              ${filter === 'mastery' ? 'bg-yellow-500 text-yellow-900' : 'bg-gray-700 text-white'}`}
          >
            Mastery
          </button>
          <button
            onClick={() => setFilter('progress')}
            className={`px-3 py-1 rounded-full text-sm
              ${filter === 'progress' ? 'bg-blue-500 text-blue-900' : 'bg-gray-700 text-white'}`}
          >
            Progress
          </button>
          <button
            onClick={() => setFilter('challenge')}
            className={`px-3 py-1 rounded-full text-sm
              ${filter === 'challenge' ? 'bg-purple-500 text-purple-900' : 'bg-gray-700 text-white'}`}
          >
            Challenges
          </button>
          <button
            onClick={() => setFilter('social')}
            className={`px-3 py-1 rounded-full text-sm
              ${filter === 'social' ? 'bg-green-500 text-green-900' : 'bg-gray-700 text-white'}`}
          >
            Social
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedAchievements.map(achievement => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            isRecent={recentAchievements.includes(achievement)}
          />
        ))}
      </div>

      {filteredAchievements.length > 4 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            {showAll ? 'Show Less' : `Show All (${filteredAchievements.length})`}
          </button>
        </div>
      )}
    </div>
  );
};

export default AchievementSection;