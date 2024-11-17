// GameTypes.js - Type definitions for game elements
const QUEST_TYPES = {
  STORY: 'story',
  CHALLENGE: 'challenge',
  TEAM: 'team',
  EXPLORATION: 'exploration',
  BOSS: 'boss'
};

const REWARD_TYPES = {
  XP: 'experience',
  ITEM: 'item',
  SKILL_POINT: 'skill_point',
  UNLOCK: 'unlock',
  BADGE: 'badge',
  CURRENCY: 'currency'
};

const SKILL_CATEGORIES = {
  CHEMISTRY: 'chemistry',
  PHYSICS: 'physics',
  BIOLOGY: 'biology'
};

// Data structures for game elements
const INITIAL_GAME_STATE = {
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