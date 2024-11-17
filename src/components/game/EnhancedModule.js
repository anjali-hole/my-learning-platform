// src/components/game/EnhancedModule.js
import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Book, 
  CheckCircle, 
  Sparkles,
  ChevronRight 
} from 'lucide-react';
import { useGame } from '../../contexts/GameContext';
import ProgressBar from '../ui/ProgressBar';

const EnhancedModule = ({ module }) => {
  const { gameState, dispatch } = useGame();
  const [showQuestPrompt, setShowQuestPrompt] = useState(false);
  const [currentQuest, setCurrentQuest] = useState(null);

  const handleModuleClick = () => {
    if (!module) return;

    dispatch({
      type: 'UPDATE_MODULE_PROGRESS',
      payload: {
        moduleId: module.id,
        progress: Math.min((module.progress || 0) + 10, 100)
      }
    });
  };

  const handleContinueClick = (e) => {
    e.stopPropagation();
    handleModuleClick();
  };

  const checkQuestTriggers = () => {
    // Return early if module or quests are undefined
    if (!module?.quests || !Array.isArray(module.quests)) {
      return;
    }

    const triggeredQuest = module.quests.find(quest => {
      return quest?.trigger?.type === 'progress' && 
             quest.trigger.value <= (module.progress || 0);
    });

    if (triggeredQuest && 
        gameState?.player?.completedQuests && 
        !gameState.player.completedQuests.includes(triggeredQuest.id)) {
      setCurrentQuest(triggeredQuest);
      setShowQuestPrompt(true);
    }
  };

  // Check for quest triggers when progress updates
  useEffect(() => {
    checkQuestTriggers();
  }, [module?.progress, gameState?.player?.completedQuests]);

  // Guard clause for when module is undefined
  if (!module) {
    return null;
  }

  return (
    <div 
      className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all relative"
      onClick={handleModuleClick}
    >
      <div className="flex items-center gap-3 mb-4">
        {module.type === 'video' ? (
          <div className="p-2 bg-blue-100 rounded-lg">
            <Play className="h-6 w-6 text-blue-600" />
          </div>
        ) : module.type === 'reading' ? (
          <div className="p-2 bg-purple-100 rounded-lg">
            <Book className="h-6 w-6 text-purple-600" />
          </div>
        ) : (
          <div className="p-2 bg-green-100 rounded-lg">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
        )}
        <div>
          <h3 className="text-lg font-bold">{module.title || 'Untitled Module'}</h3>
          <p className="text-sm text-gray-600">{module.description || 'No description available'}</p>
        </div>
      </div>

      <div className="mb-4">
        <ProgressBar 
          value={module.progress || 0} 
          color={
            module.type === 'video' ? 'blue' :
            module.type === 'reading' ? 'purple' :
            'green'
          }
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {module.experience && (
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              +{module.experience} XP
            </div>
          )}
          {module.skillPoints && module.subject && (
            <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              +{module.skillPoints} {module.subject}
            </div>
          )}
        </div>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 
                     transition-all duration-300 flex items-center gap-2"
          onClick={handleContinueClick}
        >
          Continue Learning
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Quest Prompt Modal */}
      {showQuestPrompt && currentQuest && (
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-sm m-4">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-yellow-500" />
              <h3 className="text-xl font-bold">New Quest Available!</h3>
            </div>
            <p className="text-gray-600 mb-4">{currentQuest.description}</p>
            <div className="flex justify-end gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowQuestPrompt(false);
                  setCurrentQuest(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Later
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ 
                    type: 'START_QUEST', 
                    payload: { questId: currentQuest.id } 
                  });
                  setShowQuestPrompt(false);
                  setCurrentQuest(null);
                }}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg 
                           hover:bg-yellow-600 transition-colors"
              >
                Accept Quest
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedModule;