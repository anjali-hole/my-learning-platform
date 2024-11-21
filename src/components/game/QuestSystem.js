import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Trophy,
  Play,
  Clock,
  Coins,
  TargetIcon
} from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';


const QuestSystem = () => {
  const [activeQuestType, setActiveQuestType] = useState('daily');
  
  const quests = {
    daily: [
      {
        id: 1,
        title: "Chemistry Champion",
        description: "Complete 3 chemistry modules today",
        progress: 2,
        total: 3,
        rewards: {
          xp: 150,
          items: ["Chemistry Badge", "Bonus Quiz Power-up"],
          currency: 50
        },
        timeLeft: "5 hours",
        type: "daily",
        difficulty: "medium"
      },
      {
        id: 2,
        title: "Perfect Score Streak",
        description: "Get 100% on 2 quizzes",
        progress: 1,
        total: 2,
        rewards: {
          xp: 200,
          items: ["Quiz Master Badge"],
          currency: 75
        },
        timeLeft: "8 hours",
        type: "daily",
        difficulty: "hard"
      }
    ],
    weekly: [
      {
        id: 3,
        title: "Element Explorer",
        description: "Study all elements in Group 1",
        progress: 4,
        total: 6,
        rewards: {
          xp: 500,
          items: ["Periodic Master Badge", "Rare Element Card"],
          currency: 150
        },
        timeLeft: "3 days",
        type: "weekly",
        difficulty: "medium"
      }
    ],
    storyline: [
      {
        id: 4,
        title: "The Atomic Mystery",
        description: "Uncover the secrets of atomic structure",
        chapter: 1,
        progress: 2,
        total: 5,
        rewards: {
          xp: 1000,
          items: ["Atomic Sage Title", "Special Lab Equipment"],
          currency: 300
        },
        type: "storyline",
        difficulty: "epic"
      }
    ]
  };

  const QuestCard = ({ quest }) => {
    const difficultyColors = {
      easy: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      hard: 'bg-red-100 text-red-800',
      epic: 'bg-purple-100 text-purple-800'
    };

    return (
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold">{quest.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[quest.difficulty]}`}>
                {quest.difficulty.charAt(0).toUpperCase() + quest.difficulty.slice(1)}
              </span>
            </div>
            <p className="text-gray-600">{quest.description}</p>
          </div>
          {quest.timeLeft && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              {quest.timeLeft}
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{quest.progress}/{quest.total}</span>
          </div>
          <ProgressBar 
            value={(quest.progress / quest.total) * 100} 
            color={quest.type === 'storyline' ? 'purple' : 'blue'}
          />
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Rewards:</div>
          <div className="flex flex-wrap gap-2">
            {quest.rewards.xp && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center gap-1">
                <Star className="h-4 w-4" />
                {quest.rewards.xp} XP
              </span>
            )}
            {quest.rewards.currency && (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm flex items-center gap-1">
                <Coins className="h-4 w-4" />
                {quest.rewards.currency} Coins
              </span>
            )}
            {quest.rewards.items?.map((item, index) => (
              <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {item}
              </span>
            ))}
          </div>
        </div>

        <button 
          className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                     transition-colors flex items-center justify-center gap-2"
        >
          {quest.progress === quest.total ? (
            <>
              <Trophy className="h-4 w-4" />
              Claim Rewards
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              Continue Quest
            </>
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quests</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveQuestType('daily')}
            className={`px-4 py-2 rounded-lg transition-colors
              ${activeQuestType === 'daily' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            Daily
          </button>
          <button
            onClick={() => setActiveQuestType('weekly')}
            className={`px-4 py-2 rounded-lg transition-colors
              ${activeQuestType === 'weekly' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            Weekly
          </button>
          <button
            onClick={() => setActiveQuestType('storyline')}
            className={`px-4 py-2 rounded-lg transition-colors
              ${activeQuestType === 'storyline' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            Story
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {quests[activeQuestType]?.map(quest => (
          <QuestCard key={quest.id} quest={quest} />
        ))}
      </div>
    </div>
  );
};
export default QuestSystem;