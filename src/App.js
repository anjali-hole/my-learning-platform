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
  Play,
  Book,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  Medal,
  Target,
  Beaker,
  FileText,
  X
} from 'lucide-react';
import { GameProvider } from './contexts/GameContext';
import { useGame } from './contexts/GameContext';
import { StudentProgress, AchievementSection, AchievementSystem, ProgressBar, QuestSystem, ModuleManagement } from './components';

// Sample Data and Constants
const QUIZ_DATA = {
  "chemical-bonds": {
    id: "chemical-bonds",
    title: "Chemical Bonds Quiz",
    description: "Test your knowledge of chemical bonding",
    timeLimit: 15, // minutes
    questions: [
      {
        id: 1,
        text: "What type of bond forms between atoms of similar electronegativity?",
        options: ["Covalent bond", "Ionic bond", "Metallic bond", "Hydrogen bond"],
        correct: 0,
        explanation: "Atoms with similar electronegativity share electrons, forming covalent bonds."
      },
      {
        id: 2,
        text: "In an ionic bond, what happens to the electrons?",
        options: [
          "They are shared equally",
          "They are transferred from one atom to another",
          "They form a metallic sea",
          "They create a double bond"
        ],
        correct: 1,
        explanation: "Ionic bonds involve the complete transfer of electrons from one atom to another."
      }
      // ... more questions
    ],
    passingScore: 80
  }
  // ... more quizzes
};

const MODULE_DATA = [
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
        title: 'Atomic Structure',
        url: '/content/atomic-structure',
        duration: '15:00',
        progress: 100
      },
      {
        type: 'reading',
        title: 'Chemical Bonds',
        content: 'Content here...',
        duration: '10:00',
        progress: 50
      },
      {
        type: 'quiz',
        id: 'chemical-bonds',
        title: 'Chemical Bonds Quiz',
        progress: 0
      }
    ],
    experience: 100,
    skillPoints: 10
  }
  // ... more modules
];

// Components
const Quiz = ({ quiz, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(quiz.timeLimit * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          submitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const submitQuiz = () => {
    const score = calculateScore();
    setShowResults(true);
    onComplete?.(score);
  };

  const calculateScore = () => {
    const correct = quiz.questions.filter(
      (q, i) => answers[i] === q.correct
    ).length;
    return (correct / quiz.questions.length) * 100;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const question = quiz.questions[currentQuestion];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
      {!showResults ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{quiz.title}</h2>
            <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
              Time: {formatTime(timer)}
            </div>
          </div>

          <div className="mb-6">
            <ProgressBar 
              value={(currentQuestion / quiz.questions.length) * 100} 
              color="blue"
            />
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </h3>
            <p className="text-gray-800 mb-4">{question.text}</p>

            <div className="space-y-3">
              {question.options.map((option, i) => (
                <button
                  key={i}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all
                    ${answers[currentQuestion] === i 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-200'}`}
                  onClick={() => setAnswers({ ...answers, [currentQuestion]: i })}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestion(prev => prev - 1)}
              disabled={currentQuestion === 0}
              className={`px-4 py-2 rounded-lg
                ${currentQuestion === 0 
                  ? 'bg-gray-100 text-gray-400' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              Previous
            </button>
            {currentQuestion < quiz.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestion(prev => prev + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Next
              </button>
            ) : (
              <button
                onClick={submitQuiz}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </>
      ) : (
        <QuizResults 
          score={calculateScore()} 
          answers={answers}
          quiz={quiz}
        />
      )}
    </div>
  );
};

const QuizResults = ({ score, answers, quiz }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
      <div className="text-4xl font-bold mb-4">
        {score}%
      </div>
      <div className={`inline-block px-4 py-2 rounded-full
        ${score >= quiz.passingScore 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'}`}
      >
        {score >= quiz.passingScore ? 'Passed!' : 'Try Again'}
      </div>
    </div>

    <div className="space-y-4">
      {quiz.questions.map((question, i) => (
        <div 
          key={i}
          className={`p-4 rounded-lg border-2
            ${answers[i] === question.correct 
              ? 'border-green-200 bg-green-50' 
              : 'border-red-200 bg-red-50'}`}
        >
          <p className="font-medium mb-2">{question.text}</p>
          <p className="text-sm">
            Your answer: {question.options[answers[i]]}
            {answers[i] !== question.correct && (
              <span className="block text-red-600">
                Correct answer: {question.options[question.correct]}
              </span>
            )}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            {question.explanation}
          </p>
        </div>
      ))}
    </div>

    <div className="flex justify-end">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => window.location.reload()}
      >
        Return to Dashboard
      </button>
    </div>
  </div>
);

// ... continuing App.js

const StudentDashboard = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleModuleClick = (module) => {
    setSelectedModule(module);
  };

  const handleStartQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setShowQuiz(true);
  };

  return (
    <div className="space-y-6">
      {/* Current Progress Overview */}
      <div className="grid grid-cols-4 gap-4">
        <ProgressCard
          title="Overall Progress"
          value={75}
          icon={BarChart}
          color="blue"
        />
        <ProgressCard
          title="Quests Completed"
          value="8/10"
          icon={Trophy}
          color="yellow"
        />
        <ProgressCard
          title="Active Streaks"
          value="5 days"
          icon={Star}
          color="purple"
        />
        <ProgressCard
          title="XP Today"
          value="450"
          icon={Target}
          color="green"
        />
      </div>

      {/* Active Modules */}
      {!showQuiz && !selectedModule && (
        <div className="grid md:grid-cols-2 gap-6">
          {MODULE_DATA.map(module => (
            <div 
              key={module.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
              onClick={() => handleModuleClick(module)}
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
                    <Beaker className="h-6 w-6 text-green-600" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold">{module.title}</h3>
                  <p className="text-sm text-gray-600">{module.description}</p>
                </div>
              </div>

              <div className="mb-4">
                <ProgressBar value={module.progress} color="blue" />
                <p className="text-sm text-gray-500 mt-1">{module.progress}% Complete</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    +{module.experience} XP
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    +{module.skillPoints} {module.subject}
                  </span>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Selected Module View */}
      {selectedModule && !showQuiz && (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{selectedModule.title}</h2>
            <button
              onClick={() => setSelectedModule(null)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            {selectedModule.content.map((item, index) => (
              <div 
                key={index}
                className="p-4 border-2 border-gray-100 rounded-lg hover:border-blue-200 transition-all"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {item.type === 'video' ? (
                      <Play className="h-5 w-5 text-blue-500" />
                    ) : item.type === 'reading' ? (
                      <FileText className="h-5 w-5 text-purple-500" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.duration}</p>
                    </div>
                  </div>
                  {item.type === 'quiz' ? (
                    <button
                      onClick={() => handleStartQuiz(QUIZ_DATA[item.id])}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Start Quiz
                    </button>
                  ) : (
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                      {item.progress === 100 ? 'Review' : 'Continue'}
                    </button>
                  )}
                </div>
                {item.progress !== undefined && (
                  <div className="mt-3">
                    <ProgressBar value={item.progress} color="blue" />
                    <p className="text-sm text-gray-500 mt-1">{item.progress}% Complete</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quiz View */}
      {showQuiz && selectedQuiz && (
        <Quiz
          quiz={selectedQuiz}
          onComplete={(score) => {
            console.log('Quiz completed with score:', score);
            // Handle quiz completion
          }}
        />
      )}
    </div>
  );
};

const TeacherDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedModule, setSelectedModule] = useState(null);

  const stats = {
    totalStudents: 45,
    averageProgress: 68,
    moduleCompletion: {
      "Chemical Bonds": 85,
      "Periodic Table": 72,
      "Lab Safety": 95,
      "Atomic Structure": 65
    },
    studentActivity: [
      {
        id: 1,
        name: "Sarah Chen",
        action: "completed Chemical Bonds Quiz",
        score: "95%",
        timestamp: "2 minutes ago",
        type: "success"
      },
      {
        id: 2,
        name: "James Wilson",
        action: "achieved Lab Master badge",
        badge: "Lab Master",
        timestamp: "15 minutes ago",
        type: "achievement"
      },
      {
        id: 3,
        name: "Emma Thompson",
        action: "needs help with Periodic Table",
        subject: "Periodic Table",
        timestamp: "1 hour ago",
        type: "alert"
      }
    ],
    studentProgress: [
      {
        id: 1,
        name: "Sarah Chen",
        progress: 85,
        lastActive: "2 minutes ago",
        currentModule: "Chemical Bonds",
        status: "on-track",
        recentScores: [95, 88, 92]
      },
      {
        id: 2,
        name: "James Wilson",
        progress: 72,
        lastActive: "1 hour ago",
        currentModule: "Periodic Table",
        status: "progressing",
        recentScores: [85, 78, 82]
      },
      {
        id: 3,
        name: "Emma Thompson",
        progress: 45,
        lastActive: "3 hours ago",
        currentModule: "Atomic Structure",
        status: "needs-help",
        recentScores: [65, 58, 62]
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Active Students"
          value={stats.totalStudents}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Average Progress"
          value={`${stats.averageProgress}%`}
          icon={BarChart}
          color="green"
        />
        <StatCard
          title="Active Modules"
          value={Object.keys(stats.moduleCompletion).length}
          icon={Book}
          color="purple"
        />
        <StatCard
          title="Need Attention"
          value={stats.studentProgress.filter(s => s.status === 'needs-help').length}
          icon={AlertCircle}
          color="orange"
        />
      </div>

      {/* Module Progress and Activity */}
      <div className="grid grid-cols-2 gap-6">
        {/* Module Progress */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Module Progress</h2>
            <select 
              className="px-3 py-2 border rounded-lg bg-white"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="semester">This Semester</option>
            </select>
          </div>
          <div className="space-y-4">
            {Object.entries(stats.moduleCompletion).map(([module, completion]) => (
              <div key={module} className="hover:bg-gray-50 p-3 rounded-lg transition-colors">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{module}</span>
                  <span>{completion}%</span>
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
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {stats.studentActivity.map((activity) => (
              <div 
                key={activity.id}
                className={`p-4 rounded-lg border-l-4 
                  ${activity.type === 'success' ? 'bg-green-50 border-green-500' :
                    activity.type === 'achievement' ? 'bg-yellow-50 border-yellow-500' :
                    'bg-red-50 border-red-500'}
                `}
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{activity.name}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                  <span className="text-sm text-gray-500">{activity.timestamp}</span>
                </div>
                {activity.score && (
                  <div className="mt-2">
                    <span className="text-sm font-medium text-green-600">
                      Score: {activity.score}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Progress Table */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-6">Student Progress</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Module
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.studentProgress.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">{student.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-48">
                      <ProgressBar value={student.progress} color="blue" />
                      <span className="text-sm text-gray-500">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm">{student.currentModule}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full
                      ${student.status === 'on-track' ? 'bg-green-100 text-green-800' :
                        student.status === 'progressing' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'}
                    `}>
                      {student.status === 'on-track' ? 'On Track' :
                       student.status === 'progressing' ? 'Progressing' :
                       'Needs Help'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        <button 
          className="p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors
                     flex items-center gap-3 text-blue-700"
        >
          <Users className="h-5 w-5" />
          Message Students
        </button>
        <button 
          className="p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors
                     flex items-center gap-3 text-purple-700"
        >
          <Book className="h-5 w-5" />
          Create Module
        </button>
        <button 
          className="p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors
                     flex items-center gap-3 text-green-700"
        >
          <CheckCircle className="h-5 w-5" />
          Create Quiz
        </button>
      </div>
    </div>
  );
};

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

const ProgressCard = ({ title, value, icon: Icon, color }) => {
  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className={`p-6 rounded-xl shadow-sm border-2 ${getColorClasses(color)}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        {Icon && <Icon className="h-8 w-8 opacity-75" />}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color = 'blue' }) => {
  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-700',
      green: 'bg-green-50 text-green-700',
      purple: 'bg-purple-50 text-purple-700',
      orange: 'bg-orange-50 text-orange-700'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className={`${getColorClasses(color)} p-6 rounded-xl shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        {Icon && <Icon className="h-8 w-8 opacity-75" />}
      </div>
    </div>
  );
};
const MainApp = () => {
  const { gameState, dispatch } = useGame();
  const [userRole, setUserRole] = useState('student');
  const [activeView, setActiveView] = useState('dashboard');

  useEffect(() => {
    // Initialize game state
    dispatch({
      type: 'INITIALIZE_GAME',
      payload: {
        modules: MODULE_DATA,
        achievements: [],
        quests: []
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation 
        userRole={userRole}
        onRoleChange={setUserRole}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      <main className="ml-64 p-8">
        {userRole === 'teacher' ? (
          <>
            {activeView === 'dashboard' && <TeacherDashboard />}
            {activeView === 'modules' && <ModuleManagement/>}
            {activeView === 'students' && <StudentProgress/>}
          </>
        ) : (
          <>
            {activeView === 'dashboard' && <StudentDashboard />}
            {activeView === 'quests' && <QuestSystem/>}
            {activeView === 'achievements' && <AchievementSystem/>}
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