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
      const { 
        quizId, 
        score, 
        achievements, 
        timeSpent, 
        streak, 
        powerupsUsed,
        moduleId 
      } = action.payload;

      // Calculate XP and progress gains
      const baseXP = score * 10;
      const streakBonus = streak * 5;
      const timeBonus = Math.max(0, (300 - timeSpent) * 2);
      const totalXP = baseXP + streakBonus + timeBonus;

      // Calculate module progress increase
      const moduleProgress = Math.min(
        (score / 100) * 25, // Max 25% progress per quiz
        100 - state.modules.find(m => m.id === moduleId).progress
      );

      // Update relevant stats and progress
      return {
        ...state,
        player: {
          ...state.player,
          experience: state.player.experience + totalXP,
          level: calculateLevel(state.player.experience + totalXP),
          quizStats: {
            ...state.player.quizStats,
            totalAttempts: state.player.quizStats.totalAttempts + 1,
            perfectScores: score === 100 ? 
              state.player.quizStats.perfectScores + 1 : 
              state.player.quizStats.perfectScores,
            averageScore: 
              ((state.player.quizStats.averageScore * state.player.quizStats.totalAttempts) + score) / 
              (state.player.quizStats.totalAttempts + 1),
            streakRecord: Math.max(state.player.quizStats.streakRecord, streak),
            powerupsUsed: state.player.quizStats.powerupsUsed + powerupsUsed,
            timeRecords: {
              ...state.player.quizStats.timeRecords,
              [quizId]: Math.min(
                timeSpent,
                state.player.quizStats.timeRecords[quizId] || Infinity
              )
            }
          }
        },
        modules: state.modules.map(module =>
          module.id === moduleId
            ? {
                ...module,
                progress: module.progress + moduleProgress
              }
            : module
        )
      };

    case 'UNLOCK_ACHIEVEMENT':
      const { achievement, rewards } = action.payload;
      
      // Process rewards
      const processedRewards = {
        experience: rewards.experience || 0,
        powerups: rewards.powerups || {},
        boosters: rewards.boosters || {},
        items: rewards.items || []
      };

      return {
        ...state,
        player: {
          ...state.player,
          experience: state.player.experience + processedRewards.experience,
          inventory: {
            ...state.player.inventory,
            powerups: {
              ...state.player.inventory.powerups,
              ...Object.fromEntries(
                Object.entries(processedRewards.powerups).map(([key, value]) => [
                  key,
                  (state.player.inventory.powerups[key] || 0) + value
                ])
              )
            },
            boosters: {
              ...state.player.inventory.boosters,
              ...Object.fromEntries(
                Object.entries(processedRewards.boosters).map(([key, value]) => [
                  key,
                  (state.player.inventory.boosters[key] || 0) + value
                ])
              )
            }
          },
          achievementsUnlocked: [
            ...state.player.achievementsUnlocked,
            achievement.id
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
  