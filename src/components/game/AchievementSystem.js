import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Trophy,
  Play,
  Clock,
  CheckCircle,
  Lock

} from 'lucide-react';
import ProgressBar from '.././ui/ProgressBar';

const AchievementSystem = () => {
  const [filter, setFilter] = useState('all');
  const [showLocked, setShowLocked] = useState(false);

  const achievements = {
    mastery: [
      {
        id: 1,
        title: "Chemistry Novice",
        description: "Complete your first chemistry module",
        progress: 100,
        unlocked: true,
        date: "2024-11-15",
        rarity: "common",
        rewards: {
          xp: 100,
          title: "Chemistry Student"
        }
      },
      {
        id: 2,
        title: "Lab Master",
        description: "Complete 10 lab simulations with perfect scores",
        progress: 60,
        unlocked: false,
        rarity: "epic",
        rewards: {
          xp: 1000,
          title: "Master Chemist",
          item: "Golden Lab Coat"
        }
      }
    ],
    exploration: [
      {
        id: 3,
        title: "Element Explorer",
        description: "Discover all elements in the periodic table",
        progress: 45,
        unlocked: false,
        rarity: "rare",
        rewards: {
          xp: 500,
          title: "Element Master"
        }
      }
    ],
    social: [
      {
        id: 4,
        title: "Helpful Hand",
        description: "Help 5 other students with their studies",
        progress: 100,
        unlocked: true,
        date: "2024-11-14",
        rarity: "uncommon",
        rewards: {
          xp: 300,
          title: "Student Mentor"
        }
      }
    ]
  };

  const AchievementCard = ({ achievement }) => {
    const rarityColors = {
      common: 'border-gray-200 bg-gray-50',
      uncommon: 'border-green-200 bg-green-50',
      rare: 'border-blue-200 bg-blue-50',
      epic: 'border-purple-200 bg-purple-50'
    };

    return (
      <div className={`rounded-xl p-6 border-2 ${rarityColors[achievement.rarity]} 
                      transition-all ${!achievement.unlocked && 'opacity-60'}`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg">{achievement.title}</h3>
            <p className="text-gray-600">{achievement.description}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium 
            ${achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
              achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
              achievement.rarity === 'uncommon' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'}`}>
            {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
          </span>
        </div>

        {achievement.progress < 100 && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{achievement.progress}%</span>
            </div>
            <ProgressBar value={achievement.progress} color={
              achievement.rarity === 'epic' ? 'purple' :
              achievement.rarity === 'rare' ? 'blue' :
              achievement.rarity === 'uncommon' ? 'green' :
              'gray'
            } />
          </div>
        )}

        <div className="space-y-2">
          {achievement.unlocked ? (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span>Unlocked on {achievement.date}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-500">
              <Lock className="h-5 w-5" />
              <span>Locked</span>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {achievement.rewards.xp && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                {achievement.rewards.xp} XP
              </span>
            )}
            {achievement.rewards.title && (
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                Title: {achievement.rewards.title}
              </span>
            )}
            {achievement.rewards.item && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {achievement.rewards.item}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Achievements</h2>
        <div className="flex gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-white'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('mastery')}
              className={`px-4 py-2 rounded-lg ${filter === 'mastery' ? 'bg-blue-500 text-white' : 'bg-white'}`}
            >
              Mastery
            </button>
            <button
              onClick={() => setFilter('exploration')}
              className={`px-4 py-2 rounded-lg ${filter === 'exploration' ? 'bg-blue-500 text-white' : 'bg-white'}`}
            >
              Exploration
            </button>
            <button
              onClick={() => setFilter('social')}
              className={`px-4 py-2 rounded-lg ${filter === 'social' ? 'bg-blue-500 text-white' : 'bg-white'}`}
            >
              Social
            </button>
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showLocked}
              onChange={(e) => setShowLocked(e.target.checked)}
              className="rounded border-gray-300"
            />
            Show Locked
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {Object.entries(achievements).map(([category, categoryAchievements]) => {
          if (filter !== 'all' && category !== filter) return null;
          return categoryAchievements
            .filter(a => showLocked || a.unlocked)
            .map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ));
        })}
      </div>
    </div>
  );
};


export default AchievementSystem;