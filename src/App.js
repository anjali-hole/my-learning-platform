// src/App.js
import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Trophy,
  Users,
  BookOpen,
  BarChart,
  Calendar,
  Settings,
  LogOut,
  UserCog,
  CheckCircle,
  ChevronRight,
  Medal,
  Target
} from 'lucide-react';
import { GameProvider } from './contexts/GameContext';
import { useGame } from './contexts/GameContext';
import {
  EnhancedModule,
  QuestSystem,
  AchievementSection,
  ProgressBar
} from './components';

const SAMPLE_MODULES = [
  {
    id: 1,
    title: "Introduction to Chemistry",
    description: "Learn the basics of atomic structure and chemical bonds",
    type: "video",
    subject: "chemistry",
    progress: 75,
    content: [
      {
        type: 'video',
        title: 'Atomic Structure Basics',
        url: '/videos/atomic-structure',
        duration: '15:00',
        completed: false
      },
      {
        type: 'reading',
        title: 'Chemical Bonds Overview',
        content: 'Content here...',
        duration: '10:00',
        completed: false
      },
      {
        type: 'quiz',
        title: 'Test Your Knowledge',
        questions: [
          {
            id: 1,
            text: "What is the central part of an atom called?",
            options: ["Nucleus", "Electron", "Proton", "Neutron"],
            correct: 0
          }
        ]
      }
    ],
    experience: 100,
    skillPoints: 10,
  },
  {
    id: 2,
    title: "Advanced Physics",
    description: "Understanding Newton's Laws of Motion",
    type: "simulation",
    subject: "physics",
    progress: 45,
    experience: 150,
    skillPoints: 15
  }
];

const Navigation = ({ userRole, onRoleChange, activeView, setActiveView }) => (
  <div className="fixed left-0 top-0 h-screen w-64 bg-gray-900 p-6 flex flex-col">
    <div className="flex items-center gap-3 mb-8">
      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
        <span className="text-white font-bold">
          {userRole === 'teacher' ? 'T' : 'S'}
        </span>
      </div>
      <div className="text-white">
        <h2 className="font-bold">
          {userRole === 'teacher' ? 'Dr. Smith' : 'Sarah Chen'}
        </h2>
        <p className="text-sm text-gray-400 capitalize">{userRole}</p>
      </div>
    </div>

    <nav className="flex-grow">
      <ul className="space-y-2">
        {userRole === 'teacher' ? (
          <>
            <li>
              <button
                onClick={() => setActiveView('dashboard')}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2
                  ${activeView === 'dashboard' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
              >
                <BarChart className="h-4 w-4" />
                Class Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('modules')}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2
                  ${activeView === 'modules' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
              >
                <BookOpen className="h-4 w-4" />
                Manage Content
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('students')}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2
                  ${activeView === 'students' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
              >
                <Users className="h-4 w-4" />
                Student Progress
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <button
                onClick={() => setActiveView('dashboard')}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2
                  ${activeView === 'dashboard' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
              >
                <BookOpen className="h-4 w-4" />
                My Modules
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('quests')}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2
                  ${activeView === 'quests' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
              >
                <Trophy className="h-4 w-4" />
                Quests
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('achievements')}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2
                  ${activeView === 'achievements' ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
              >
                <Medal className="h-4 w-4" />
                Achievements
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>

    <div className="border-t border-gray-700 pt-4">
      <button
        onClick={() => onRoleChange(userRole === 'teacher' ? 'student' : 'teacher')}
        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg flex items-center gap-2"
      >
        <UserCog className="h-4 w-4" />
        Switch to {userRole === 'teacher' ? 'Student' : 'Teacher'} View
      </button>
      <button
        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg flex items-center gap-2"
      >
        <Settings className="h-4 w-4" />
        Settings
      </button>
      <button
        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg flex items-center gap-2"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </div>
  </div>
);

const TeacherDashboard = () => {
  const stats = {
    totalStudents: 45,
    averageProgress: 68,
    completionRate: 82,
    needsAttention: 7
  };

  const moduleCompletion = {
    "Chemical Bonds": 85,
    "Periodic Table": 72,
    "Lab Safety": 95,
    "Atomic Structure": 65
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500 font-medium">Total Students</h3>
          <p className="text-2xl font-bold">{stats.totalStudents}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500 font-medium">Average Progress</h3>
          <p className="text-2xl font-bold text-blue-500">{stats.averageProgress}%</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500 font-medium">Completion Rate</h3>
          <p className="text-2xl font-bold text-green-500">{stats.completionRate}%</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500 font-medium">Needs Attention</h3>
          <p className="text-2xl font-bold text-orange-500">{stats.needsAttention}</p>
        </div>
      </div>

      {/* Module Progress */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Module Completion</h2>
        <div className="space-y-4">
          {Object.entries(moduleCompletion).map(([module, completion]) => (
            <div key={module}>
              <div className="flex justify-between text-sm mb-1">
                <span>{module}</span>
                <span className="font-medium">{completion}%</span>
              </div>
              <ProgressBar 
                value={completion}
                color={completion > 80 ? 'green' : completion > 60 ? 'blue' : 'orange'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm">Sarah completed "Chemical Bonds Quiz"</p>
            <p className="text-xs text-gray-500">2 minutes ago</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-sm">James achieved "Lab Master" badge</p>
            <p className="text-xs text-gray-500">15 minutes ago</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <p className="text-sm">Emma needs help with "Periodic Table"</p>
            <p className="text-xs text-gray-500">1 hour ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentDashboard = () => {
  const { gameState } = useGame();
  
  return (
    <div className="space-y-6">
      {/* Active Modules */}
      <div className="grid md:grid-cols-2 gap-6">
        {SAMPLE_MODULES.map(module => (
          <EnhancedModule
            key={module.id}
            module={module}
            onClick={(module) => console.log('Module clicked:', module)}
          />
        ))}
      </div>

      {/* Active Quests */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-500" />
          Active Quests
        </h2>
        <div className="space-y-4">
          <div className="p-4 border-2 border-gray-100 rounded-lg hover:border-blue-200 transition-colors">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Complete Chemical Bonds Module</h3>
                <p className="text-sm text-gray-600">Master the basics of chemical bonding</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-3">
              <ProgressBar value={65} color="blue" />
              <p className="text-sm text-gray-500 mt-1">65% Complete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MainApp = () => {
  const { gameState, dispatch } = useGame();
  const [userRole, setUserRole] = useState('student');
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation 
        userRole={userRole}
        onRoleChange={setUserRole}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <main className="ml-64 p-8">
        {/* Content Area */}
        {userRole === 'teacher' ? (
          // Teacher Views
          <>
            {activeView === 'dashboard' && <TeacherDashboard />}
            {activeView === 'modules' && <div>Module Management Content</div>}
            {activeView === 'students' && <div>Student Progress Tracking Content</div>}
          </>
        ) : (
          // Student Views
          <>
            {activeView === 'dashboard' && <StudentDashboard />}
            {activeView === 'quests' && (
              <QuestSystem
                player={gameState.player}
                quests={gameState.quests}
                onQuestProgress={(quest) => {
                  dispatch({ type: 'START_QUEST', payload: { questId: quest.id } });
                }}
                onQuestComplete={(quest) => {
                  dispatch({ type: 'COMPLETE_QUEST', payload: { questId: quest.id } });
                }}
              />
            )}
            {activeView === 'achievements' && (
              <AchievementSection achievements={gameState.achievements || []} />
            )}
          </>
        )}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <GameProvider>
      <MainApp />
    </GameProvider>
  );
};

export default App;