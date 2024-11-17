export const calculateLevel = (experience) => {
    return Math.floor(experience / 1000) + 1;
  };
  
  export const determineQuizAchievements = (quizData) => {
    const achievements = [];
    
    if (quizData.score === 100) {
      achievements.push({
        id: 'perfect_score',
        title: 'Perfect Score',
        description: 'Ace a quiz with 100% accuracy',
        type: 'mastery'
      });
    }
    
    return achievements;
  };
  
  export const checkContentUnlocks = (level) => {
    const unlocks = {
      2: 'Physics Frontier',
      3: 'Biology Realm',
      4: 'Advanced Challenges',
      5: 'Team Quests'
    };
    
    return unlocks[level] || null;
  };