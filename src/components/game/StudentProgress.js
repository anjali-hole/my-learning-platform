import React, { useState } from 'react';
import { 
  BarChart, 
  Flame, 
  Clock, 
  Calendar, 
  CheckCircle, 
  Book, 
  Users,  // Added this
  TrendingUp, 
  TrendingDown,
  Plus,    // Add if you need it
  Search   // Add if you need it
} from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';

const StatCard = ({ title, value, icon: Icon, color = 'blue', trend }) => {
    const getColorClasses = (color) => {
      const colors = {
        blue: {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          accent: 'text-blue-500',
          trend: {
            up: 'text-blue-600',
            down: 'text-blue-600'
          }
        },
        green: {
          bg: 'bg-green-50',
          text: 'text-green-700',
          accent: 'text-green-500',
          trend: {
            up: 'text-green-600',
            down: 'text-red-600'
          }
        },
        purple: {
          bg: 'bg-purple-50',
          text: 'text-purple-700',
          accent: 'text-purple-500',
          trend: {
            up: 'text-purple-600',
            down: 'text-purple-600'
          }
        },
        orange: {
          bg: 'bg-orange-50',
          text: 'text-orange-700',
          accent: 'text-orange-500',
          trend: {
            up: 'text-orange-600',
            down: 'text-orange-600'
          }
        },
        red: {
          bg: 'bg-red-50',
          text: 'text-red-700',
          accent: 'text-red-500',
          trend: {
            up: 'text-green-600',
            down: 'text-red-600'
          }
        }
      };
      return colors[color] || colors.blue;
    };
  
    const colorClasses = getColorClasses(color);
  
    return (
      <div className={`${colorClasses.bg} p-6 rounded-xl shadow-sm`}>
        <div className="flex justify-between items-start">
          <div>
            <p className={`text-sm font-medium ${colorClasses.text} opacity-75`}>
              {title}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-2xl font-bold">{value}</p>
              {trend && (
                <span className={`flex items-center text-sm
                  ${trend.direction === 'up' ? colorClasses.trend.up : colorClasses.trend.down}`}
                >
                  {trend.direction === 'up' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {trend.value}%
                </span>
              )}
            </div>
          </div>
          {Icon && <Icon className={`h-8 w-8 ${colorClasses.accent} opacity-75`} />}
        </div>
      </div>
    );
  };

const StudentProgress = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
  
    const students = [
      {
        id: 1,
        name: "Sarah Chen",
        email: "sarah.chen@email.com",
        progress: {
          overall: 85,
          byModule: {
            "Chemical Bonds": 95,
            "Periodic Table": 82,
            "Atomic Structure": 78
          },
          quizScores: [
            { quiz: "Chemical Bonds Quiz", score: 95, date: "2024-11-15" },
            { quiz: "Periodic Table Quiz", score: 88, date: "2024-11-14" }
          ],
          achievements: [
            { name: "Perfect Score", date: "2024-11-15" },
            { name: "Fast Learner", date: "2024-11-13" }
          ],
          recentActivity: [
            { type: "quiz", description: "Completed Chemical Bonds Quiz", date: "2024-11-15" },
            { type: "module", description: "Started Atomic Structure", date: "2024-11-14" }
          ],
          status: "on-track",
          lastActive: "2 hours ago",
          streak: 5,
          totalTime: "45 hours"
        }
      },
      // ... more students
    ];
  
    const StudentDetails = ({ student }) => (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold">{student.name}</h2>
            <p className="text-gray-600">{student.email}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium
            ${student.progress.status === 'on-track' ? 'bg-green-100 text-green-800' :
              student.progress.status === 'at-risk' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'}`}>
            {student.progress.status.replace('-', ' ').charAt(0).toUpperCase() + 
             student.progress.status.slice(1)}
          </div>
        </div>
  
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Overall Progress"
            value={`${student.progress.overall}%`}
            icon={BarChart}
            color="blue"
          />
          <StatCard
            title="Active Streak"
            value={`${student.progress.streak} days`}
            icon={Flame}
            color="orange"
          />
          <StatCard
            title="Total Time"
            value={student.progress.totalTime}
            icon={Clock}
            color="purple"
          />
          <StatCard
            title="Last Active"
            value={student.progress.lastActive}
            icon={Calendar}
            color="green"
          />
        </div>
  
        <div className="grid grid-cols-2 gap-6">
          {/* Module Progress */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Module Progress</h3>
            {Object.entries(student.progress.byModule).map(([module, progress]) => (
              <div key={module} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{module}</span>
                  <span>{progress}%</span>
                </div>
                <ProgressBar value={progress} color={
                  progress >= 80 ? 'green' :
                  progress >= 60 ? 'blue' :
                  'red'
                } />
              </div>
            ))}
          </div>
  
          {/* Quiz Performance */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Recent Quiz Scores</h3>
            {student.progress.quizScores.map((quiz, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{quiz.quiz}</span>
                  <span className={`${
                    quiz.score >= 90 ? 'text-green-600' :
                    quiz.score >= 70 ? 'text-blue-600' :
                    'text-red-600'
                  }`}>{quiz.score}%</span>
                </div>
                <p className="text-sm text-gray-500">{quiz.date}</p>
              </div>
            ))}
          </div>
        </div>
  
        {/* Recent Activity Timeline */}
        <div className="mt-6">
          <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {student.progress.recentActivity.map((activity, index) => (
              <div key={index} className="flex gap-4">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                  ${activity.type === 'quiz' ? 'bg-blue-100' : 'bg-purple-100'}`}>
                  {activity.type === 'quiz' ? (
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  ) : (
                    <Book className="h-4 w-4 text-purple-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-sm text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Student Progress</h1>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search students..."
              className="px-4 py-2 border rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="px-4 py-2 border rounded-lg bg-white"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="on-track">On Track</option>
              <option value="at-risk">At Risk</option>
              <option value="struggling">Struggling</option>
            </select>
          </div>
        </div>
  
        <div className="grid grid-cols-3 gap-6">
          {/* Student List */}
          <div className="col-span-1 bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-bold mb-4">Students</h2>
            <div className="space-y-2">
              {students
                .filter(student => 
                  (filterStatus === 'all' || student.progress.status === filterStatus) &&
                  (student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   student.email.toLowerCase().includes(searchQuery.toLowerCase()))
                )
                .map(student => (
                  <button
                    key={student.id}
                    className={`w-full p-4 rounded-lg text-left transition-colors
                      ${selectedStudent?.id === student.id 
                        ? 'bg-blue-50 border-2 border-blue-200' 
                        : 'hover:bg-gray-50 border-2 border-transparent'}`}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium
                        ${student.progress.status === 'on-track' ? 'bg-green-100 text-green-800' :
                          student.progress.status === 'at-risk' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                        {student.progress.overall}%
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
  
          {/* Student Details */}
          <div className="col-span-2">
            {selectedStudent ? (
              <StudentDetails student={selectedStudent} />
            ) : (
              <div className="h-full bg-white rounded-xl shadow-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a student to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
export default StudentProgress;  