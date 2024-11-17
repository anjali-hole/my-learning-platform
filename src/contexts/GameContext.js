import React, { createContext, useContext, useReducer } from 'react';
import { gameReducer } from '../reducers/gameReducer';
import { INITIAL_GAME_STATE } from '../constants/gameConstants'; // Import from constants

export const GameContext = createContext(null);

export const GameProvider = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);
  return (
    <GameContext.Provider value={{ gameState, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
