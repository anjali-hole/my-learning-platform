// LeaderboardPage.js
import React from 'react';
import { Trophy } from 'lucide-react';
import Card from './Card';
import LeaderboardCard from './LeaderboardCard';

const LeaderboardPage = () => {
  const leaderboardData = [
    { rank: 1, name: "Emma Thompson", points: 2850, badges: ["Top Contributor", "Quiz Master"] },
    { rank: 2, name: "James Wilson", points: 2720, badges: ["Lab Expert"] },
    { rank: 3, name: "Sarah Chen", points: 2680, badges: ["Team Player"] },
    { rank: 4, name: "Miguel Rodriguez", points: 2540, badges: ["Fast Learner"] },
    { rank: 5, name: "Alex Kim", points: 2490, badges: ["Problem Solver"] }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center gap-2 mb-6">
          <Trophy className="h-6 w-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-gray-900">Leaderboard</h2>
        </div>
        <div className="space-y-3">
          {leaderboardData.map((user) => (
            <LeaderboardCard key={user.rank} {...user} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default LeaderboardPage;