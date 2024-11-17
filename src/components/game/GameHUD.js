// src/components/game/GameHUD.js
import React from 'react';
import { Star, Trophy } from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';

const GameHUD = ({ gameState }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-800 text-white p-2 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span>Level {gameState.player.level}</span>
          </div>
          <div className="w-32">
            <ProgressBar 
              value={(gameState.player.experience % 1000) / 10} 
              color="yellow"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {Object.entries(gameState.player.skills).map(([skill, data]) => (
            <div key={skill} className="flex items-center gap-2">
              <span className="capitalize">{skill}</span>
              <div className="w-24">
                <ProgressBar 
                  value={(data.experience % 100)} 
                  color={
                    skill === 'chemistry' ? 'green' :
                    skill === 'physics' ? 'blue' :
                    'purple'
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span>{gameState.player.achievements.length} Achievements</span>
        </div>
      </div>
    </div>
  );
};
export default GameHUD;