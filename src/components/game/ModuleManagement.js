import React, { useState } from 'react';
import { Plus, Trophy, Play, FileText, CheckCircle, Edit, Users, Trash, Calendar, X} from 'lucide-react';
import ProgressBar from '../ui/ProgressBar'; 

const ModuleManagement = () => {
    const [activeTab, setActiveTab] = useState('modules');
    const [selectedModule, setSelectedModule] = useState(null);
    const [editMode, setEditMode] = useState(false);
  
    const modules = [
      {
        id: 1,
        title: "Introduction to Chemistry",
        subject: "chemistry",
        level: "beginner",
        status: "published",
        students: 45,
        averageScore: 85,
        completionRate: 78,
        lastUpdated: "2024-11-15",
        content: [
          {
            id: 'c1',
            type: 'video',
            title: 'Atomic Structure Basics',
            duration: '15:00',
            description: 'Introduction to atomic structure',
            url: '/videos/atomic-structure'
          },
          {
            id: 'c2',
            type: 'reading',
            title: 'Understanding Chemical Bonds',
            duration: '20:00',
            content: 'Content here...'
          },
          {
            id: 'c3',
            type: 'quiz',
            title: 'Chemical Bonds Quiz',
            questions: [
              {
                id: 1,
                text: "What type of bond forms between atoms of similar electronegativity?",
                options: ["Covalent", "Ionic", "Metallic", "Hydrogen"],
                correct: 0
              }
            ]
          }
        ],
        prerequisites: ["Basic Math", "Scientific Notation"],
        learningObjectives: [
          "Understand atomic structure",
          "Identify different types of bonds",
          "Calculate bond energies"
        ]
      }
      // ... more modules
    ];
  
    const ModuleList = () => (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Course Modules</h2>
          <button
            onClick={() => {
              setSelectedModule(null);
              setEditMode(true);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600
                       flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Module
          </button>
        </div>
  
        <div className="space-y-4">
          {modules.map(module => (
            <div
              key={module.id}
              className="border-2 border-gray-100 rounded-lg p-4 hover:border-blue-200 
                         transition-all cursor-pointer"
              onClick={() => setSelectedModule(module)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{module.title}</h3>
                  <p className="text-sm text-gray-600">
                    {module.content.length} items • {module.students} students enrolled
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                  ${module.status === 'published' ? 'bg-green-100 text-green-800' :
                    module.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'}`}
                >
                  {module.status.charAt(0).toUpperCase() + module.status.slice(1)}
                </span>
              </div>
  
              <div className="mt-4 flex gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  {module.completionRate}% completion rate
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Trophy className="h-4 w-4" />
                  {module.averageScore}% avg. score
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  Updated {module.lastUpdated}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  
    const ModuleEditor = ({ module }) => {
      const [moduleData, setModuleData] = useState(
        module || {
          title: '',
          subject: '',
          level: 'beginner',
          content: [],
          prerequisites: [],
          learningObjectives: []
        }
      );
  
      const ContentItem = ({ item, onDelete, onEdit }) => (
        <div className="border-2 border-gray-100 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              {item.type === 'video' ? (
                <Play className="h-5 w-5 text-blue-500" />
              ) : item.type === 'reading' ? (
                <FileText className="h-5 w-5 text-purple-500" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
              <div>
                <h4 className="font-medium">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.duration}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(item)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Edit className="h-4 w-4 text-gray-500" />
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Trash className="h-4 w-4 text-red-500" />
              </button>
            </div>
          </div>
        </div>
      );
  
      return (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              {module ? 'Edit Module' : 'Create New Module'}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Save module logic
                  setEditMode(false);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save Module
              </button>
            </div>
          </div>
  
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Module Title
                  </label>
                  <input
                    type="text"
                    value={moduleData.title}
                    onChange={(e) => setModuleData({ ...moduleData, title: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter module title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    value={moduleData.subject}
                    onChange={(e) => setModuleData({ ...moduleData, subject: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg bg-white"
                  >
                    <option value="">Select subject</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="physics">Physics</option>
                    <option value="biology">Biology</option>
                  </select>
                </div>
              </div>
            </div>
  
            {/* Content Management */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">Content</h3>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600
                             flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Content
                </button>
              </div>
              <div className="space-y-3">
                {moduleData.content.map((item) => (
                  <ContentItem
                    key={item.id}
                    item={item}
                    onDelete={(id) => {
                      setModuleData({
                        ...moduleData,
                        content: moduleData.content.filter(c => c.id !== id)
                      });
                    }}
                    onEdit={(item) => {
                      // Edit content logic
                    }}
                  />
                ))}
              </div>
            </div>
  
            {/* Prerequisites and Objectives */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Prerequisites</h3>
                <div className="flex flex-wrap gap-2">
                  {moduleData.prerequisites.map((prereq, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2"
                    >
                      {prereq}
                      <button
                        onClick={() => {
                          setModuleData({
                            ...moduleData,
                            prerequisites: moduleData.prerequisites.filter((_, i) => i !== index)
                          });
                        }}
                        className="hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={() => {
                      // Add prerequisite logic
                    }}
                    className="px-3 py-1 border-2 border-dashed border-gray-300 rounded-full
                               text-sm text-gray-500 hover:border-blue-300 hover:text-blue-500"
                  >
                    Add Prerequisite
                  </button>
                </div>
              </div>
  
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Learning Objectives</h3>
                <div className="space-y-2">
                  {moduleData.learningObjectives.map((objective, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={objective}
                        onChange={(e) => {
                          const newObjectives = [...moduleData.learningObjectives];
                          newObjectives[index] = e.target.value;
                          setModuleData({
                            ...moduleData,
                            learningObjectives: newObjectives
                          });
                        }}
                        className="flex-grow px-4 py-2 border rounded-lg"
                      />
                      <button
                        onClick={() => {
                          setModuleData({
                            ...moduleData,
                            learningObjectives: moduleData.learningObjectives
                              .filter((_, i) => i !== index)
                          });
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setModuleData({
                        ...moduleData,
                        learningObjectives: [...moduleData.learningObjectives, '']
                      });
                    }}
                    className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg
                               text-gray-500 hover:border-blue-300 hover:text-blue-500"
                  >
                    Add Learning Objective
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };
  
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Module Management</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('modules')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'modules' ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
            >
              Modules
            </button>
            <button
              onClick={() => setActiveTab('quizzes')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'quizzes' ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
            >
              Quizzes
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'resources' ? 'bg-blue-500 text-white' : 'bg-white'
              }`}
            >
              Resources
            </button>
          </div>
        </div>
  
        {activeTab === 'modules' && (
          editMode ? (
            <ModuleEditor module={selectedModule} />
          ) : (
            <ModuleList />
          )
        )}
        
        {activeTab === 'quizzes' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold">Quiz Management</h2>
            {/* Quiz management content */}
          </div>
        )}
        
        {activeTab === 'resources' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold">Resource Management</h2>
            {/* Resource management content */}
          </div>
        )}
      </div>
    );
  };

  export default ModuleManagement;