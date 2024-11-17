export const QUEST_TYPES = {
    STORY: 'story',
    CHALLENGE: 'challenge',
    TEAM: 'team',
    EXPLORATION: 'exploration'
  };
  
  export const SKILL_TYPES = {
    CHEMISTRY: 'chemistry',
    PHYSICS: 'physics',
    BIOLOGY: 'biology'
  };
  
  export const ACHIEVEMENT_TYPES = {
    COMPLETION: 'completion',
    MASTERY: 'mastery',
    SOCIAL: 'social',
    EXPLORATION: 'exploration'
  };
export const INITIAL_GAME_STATE = {
    player: {
      id: '',
      name: '',
      level: 1,
      experience: 0,
      currentTitle: 'Novice Learner',
      skillPoints: 0,
      inventory: [],
      achievements: [],
      currentQuests: [],
      completedQuests: [],
      stats: {
        questsCompleted: 0,
        challengesWon: 0,
        teamContributions: 0,
        topPerformances: 0
      },
      skills: {
        chemistry: {
          level: 1,
          experience: 0,
          unlockedAbilities: []
        },
        physics: {
          level: 1,
          experience: 0,
          unlockedAbilities: []
        },
        biology: {
          level: 1,
          experience: 0,
          unlockedAbilities: []
        }
      }
    },
    modules: [],
    achievements: [],
    quests: [],
    world: {
      currentRegion: 'Chemistry Kingdom',
      unlockedRegions: ['Chemistry Kingdom'],
      regionProgress: {
        'Chemistry Kingdom': 0,
        'Physics Frontier': 0,
        'Biology Realm': 0
      }
    },
    team: {
      id: null,
      name: null,
      members: [],
      activeQuests: [],
      achievements: []
    }
  };
  