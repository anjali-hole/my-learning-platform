// src/components/game/QuestSystem.js
import React, { useState } from 'react';
import { 
  Scroll, 
  CheckCircle, 
  Calendar, 
  Clock, 
  Trophy, 
  Star,
  ChevronRight,
  AlertCircle 
} from 'lucide-react';
import { useGame } from '../../contexts/GameContext';
import { QUEST_TYPES } from '../../constants/gameConstants';
import ProgressBar from '../ui/ProgressBar';

const QuestRewards = ({ rewards }) => {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {rewards.experience && (
        <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm flex items-center gap-1">
          <Star className="h-4 w-4" />
          {rewards.experience} XP
        </div>
      )}
      {rewards.skillPoints && (
        <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1">
          <Trophy className="h-4 w-4" />
          {rewards.skillPoints} Skill Points
        </div>
      )}
      {rewards.items?.map((item, index) => (
        <div 
          key={index} 
          className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
        >
          {item}
        </div>
      ))}
    </div>
  );
};

const QuestDeadline = ({ deadline }) => {
  const timeRemaining = deadline - Date.now();
  const hoursRemaining = Math.max(0, Math.floor(timeRemaining / (1000 * 60 * 60)));
  
  return (
    <div className="mt-2 flex items-center gap-2 text-sm">
      <Clock className="h-4 w-4 text-gray-400" />
      {hoursRemaining > 0 ? (
        <span className="text-gray-600">
          {hoursRemaining} hours remaining
        </span>
      ) : (
        <span className="text-red-500 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          Expired
        </span>
      )}
    </div>
  );
};

const QuestObjectives = ({ objectives, onObjectiveComplete }) => {
  return (
    <div className="space-y-2 my-4">
      {objectives.map((objective, index) => (
        <div 
          key={index} 
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => onObjectiveComplete?.(index)}
        >
          <div 
            className={`
              w-5 h-5 rounded-full flex items-center justify-center
              ${objective.completed 
                ? 'bg-green-500' 
                : objective.inProgress
                  ? 'bg-yellow-200'
                  : 'bg-gray-200'
              }
            `}
          >
            {objective.completed && <CheckCircle className="h-3 w-3 text-white" />}
          </div>
          <div className="flex-grow">
            <span className={`text-sm ${objective.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
              {objective.description}
            </span>
            {objective.progress !== undefined && (
              <div className="mt-1">
                <ProgressBar 
                  value={objective.progress} 
                  color={
                    objective.completed ? 'green' :
                    objective.inProgress ? 'yellow' :
                    'blue'
                  }
                  size="small"
                />
              </div>
            )}
          </div>
          {objective.reward && (
            <div className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
              +{objective.reward}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const QuestCard = ({ quest, onAccept, onComplete, onObjectiveComplete }) => {
  const getTypeStyle = (type) => {
    switch (type) {
      case QUEST_TYPES.STORY:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case QUEST_TYPES.CHALLENGE:
        return 'bg-red-100 text-red-800 border-red-200';
      case QUEST_TYPES.TEAM:
        return 'bg-green-100 text-green-800 border-green-200';
      case QUEST_TYPES.EXPLORATION:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isCompleted = quest.objectives?.every(obj => obj.completed);
  const progress = quest.objectives
    ? (quest.objectives.filter(obj => obj.completed).length / quest.objectives.length) * 100
    : 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100 hover:border-blue-200 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-lg">{quest.title}</h3>
            <span className={`px-3 py-1 rounded-full text-sm ${getTypeStyle(quest.type)}`}>
              {quest.type}
            </span>
          </div>
          <p className="text-gray-600">{quest.description}</p>
          {quest.deadline && <QuestDeadline deadline={quest.deadline} />}
        </div>
      </div>

      <QuestObjectives 
        objectives={quest.objectives} 
        onObjectiveComplete={onObjectiveComplete} 
      />

      {quest.rewards && <QuestRewards rewards={quest.rewards} />}

      <div className="mt-4 flex items-center justify-between">
        <div className="flex-grow">
          <ProgressBar 
            value={progress} 
            color={isCompleted ? 'green' : 'blue'} 
          />
          <p className="text-sm text-gray-500 mt-1">
            {Math.round(progress)}% Complete
          </p>
        </div>
        
        <div className="ml-4">
          {!quest.started && !quest.completed && (
            <button
              onClick={() => onAccept?.(quest)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              Accept Quest
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
          {quest.started && !quest.completed && (
            <button
              onClick={() => onComplete?.(quest)}
              className={`
                px-4 py-2 rounded-lg transition-colors flex items-center gap-2
                ${isCompleted 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
              `}
              disabled={!isCompleted}
            >
              Complete Quest
              {isCompleted && <Trophy className="h-4 w-4" />}
            </button>
          )}
          {quest.completed && (
            <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Completed
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const QuestSystem = ({ player, quests, onQuestProgress, onQuestComplete }) => {
  const [activeTab, setActiveTab] = useState('available');
  const { dispatch } = useGame();

  const handleObjectiveComplete = (questId, objectiveIndex) => {
    dispatch({
      type: 'UPDATE_QUEST_OBJECTIVE',
      payload: {
        questId,
        objectiveIndex,
        completed: true
      }
    });
  };

  const tabs = [
    { id: 'available', label: 'Available', count: quests?.filter(q => !q.started && !q.completed).length },
    { id: 'active', label: 'In Progress', count: quests?.filter(q => q.started && !q.completed).length },
    { id: 'completed', label: 'Completed', count: quests?.filter(q => q.completed).length }
  ];

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Scroll className="h-6 w-6 text-blue-500" />
          <h2 className="text-2xl font-bold">Quest Journal</h2>
        </div>
        <div className="flex gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-2 rounded-lg transition-colors flex items-center gap-2
                ${activeTab === tab.id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'}
              `}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`
                  px-2 py-0.5 rounded-full text-sm
                  ${activeTab === tab.id 
                    ? 'bg-blue-400 text-white' 
                    : 'bg-gray-100 text-gray-600'}
                `}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {quests
          ?.filter(quest => {
            if (activeTab === 'available') return !quest.started && !quest.completed;
            if (activeTab === 'active') return quest.started && !quest.completed;
            return quest.completed;
          })
          .map(quest => (
            <QuestCard
              key={quest.id}
              quest={quest}
              onAccept={() => onQuestProgress?.(quest)}
              onComplete={() => onQuestComplete?.(quest)}
              onObjectiveComplete={(objectiveIndex) => 
                handleObjectiveComplete(quest.id, objectiveIndex)
              }
            />
          ))}
      </div>

      {quests?.filter(quest => 
        activeTab === 'available' ? !quest.started && !quest.completed :
        activeTab === 'active' ? quest.started && !quest.completed :
        quest.completed
      ).length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No {activeTab} quests available</p>
        </div>
      )}
    </div>
  );
};

export default QuestSystem;