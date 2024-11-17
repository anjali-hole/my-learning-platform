// src/reducers/gameReducer.js
import { calculateLevel } from '../utils/gameUtils';

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_GAME':
      return {
        ...state,
        modules: action.payload.modules,
        achievements: action.payload.achievements,
        quests: action.payload.quests
      };

    case 'COMPLETE_MODULE':
      return {
        ...state,
        player: {
          ...state.player,
          experience: state.player.experience + action.payload.experience,
          skills: {
            ...state.player.skills,
            ...action.payload.skills
          },
          achievements: [
            ...state.player.achievements,
            ...action.payload.achievements
          ]
        }
      };

    case 'COMPLETE_QUEST':
      return {
        ...state,
        player: {
          ...state.player,
          experience: state.player.experience + action.payload.experience,
          completedQuests: [...state.player.completedQuests, action.payload.questId],
          stats: {
            ...state.player.stats,
            questsCompleted: state.player.stats.questsCompleted + 1
          }
        },
        world: {
          ...state.world,
          regionProgress: {
            ...state.world.regionProgress,
            [action.payload.region]: 
              state.world.regionProgress[action.payload.region] + action.payload.progress
          }
        }
      };
  
      case 'COMPLETE_QUIZ':
        const newLevel = calculateLevel(
          state.player.experience + action.payload.experience
        );
        
        return {
          ...state,
          player: {
            ...state.player,
            level: newLevel,
            experience: state.player.experience + action.payload.experience,
            skillPoints: state.player.skillPoints + action.payload.skillPoints,
            achievements: [
              ...state.player.achievements,
              ...action.payload.achievements
            ]
          }
        };
  
      case 'UNLOCK_REGION':
        return {
          ...state,
          world: {
            ...state.world,
            unlockedRegions: [...state.world.unlockedRegions, action.payload.region]
          }
        };
  
      case 'JOIN_TEAM':
        return {
          ...state,
          team: {
            ...action.payload.team,
            members: [...action.payload.team.members, state.player.id]
          }
        };
  
      case 'LEVEL_UP_SKILL':
        return {
          ...state,
          player: {
            ...state.player,
            skillPoints: state.player.skillPoints - 1,
            skills: {
              ...state.player.skills,
              [action.payload.skill]: {
                ...state.player.skills[action.payload.skill],
                level: state.player.skills[action.payload.skill].level + 1,
                unlockedAbilities: [
                  ...state.player.skills[action.payload.skill].unlockedAbilities,
                  action.payload.ability
                ]
              }
            }
          }
        };

        case 'UPDATE_QUEST_OBJECTIVE':
          return {
            ...state,
            quests: state.quests.map(quest =>
              quest.id === action.payload.questId
                ? {
                    ...quest,
                    objectives: quest.objectives.map((obj, index) =>
                      index === action.payload.objectiveIndex
                        ? { ...obj, completed: action.payload.completed }
                        : obj
                    )
                  }
                : quest
            )
          };
  
      default:
        return state;
    }
  };
  