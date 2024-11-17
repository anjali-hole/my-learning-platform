import React, { useState } from 'react';
import { Plus, X, Edit, Trash, Save, Eye, EyeOff } from 'lucide-react';

// Quiz Question Component
const QuizQuestion = ({ question, onAnswer, isTeacherView = false, onEdit }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(question);

  const handleAnswerSelect = (index) => {
    if (!isTeacherView) {
      setSelectedAnswer(index);
      onAnswer(index === question.correctAnswer);
    }
  };

  const handleSaveEdit = () => {
    onEdit(editedQuestion);
    setIsEditing(false);
  };

  if (isEditing && isTeacherView) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <input
          type="text"
          value={editedQuestion.text}
          onChange={(e) => setEditedQuestion({...editedQuestion, text: e.target.value})}
          className="w-full p-2 border rounded"
        />
        {editedQuestion.options.map((option, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...editedQuestion.options];
                newOptions[idx] = e.target.value;
                setEditedQuestion({...editedQuestion, options: newOptions});
              }}
              className="flex-grow p-2 border rounded"
            />
            <input
              type="radio"
              checked={idx === editedQuestion.correctAnswer}
              onChange={() => setEditedQuestion({...editedQuestion, correctAnswer: idx})}
            />
          </div>
        ))}
        <div className="flex gap-2">
          <button
            onClick={handleSaveEdit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <Save className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium">{question.text}</h3>
        {isTeacherView && (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-blue-500 hover:text-blue-600"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => onEdit(null)}
              className="p-2 text-red-500 hover:text-red-600"
            >
              <Trash className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            className={`w-full p-3 text-left rounded-lg border-2 transition-all
              ${selectedAnswer === null ? 'border-gray-200 hover:border-blue-300' :
                index === question.correctAnswer ? 'border-green-500 bg-green-50' :
                selectedAnswer === index ? 'border-red-500 bg-red-50' :
                'border-gray-200 opacity-50'}`}
          >
            {option}
          </button>
        ))}
      </div>
      {isTeacherView && (
        <div className="mt-2 text-sm text-gray-500">
          Correct Answer: Option {question.correctAnswer + 1}
        </div>
      )}
    </div>
  );
};

// Quiz View Component
const QuizView = ({ isTeacherView = false }) => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "What type of bond forms between atoms of similar electronegativity?",
      options: [
        "Covalent bond",
        "Ionic bond",
        "Hydrogen bond",
        "Metallic bond"
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      text: "Which factor influences atomic radius?",
      options: [
        "Number of protons only",
        "Number of neutrons only",
        "Number of electron shells",
        "Temperature only"
      ],
      correctAnswer: 2
    }
  ]);

  const [studentResponses, setStudentResponses] = useState({
    total: 45,
    correct: {
      1: 35,
      2: 28
    },
    averageTime: 45
  });

  const [showResults, setShowResults] = useState(false);

  const handleQuestionEdit = (editedQuestion, index) => {
    if (editedQuestion === null) {
      // Delete question
      setQuestions(questions.filter((_, idx) => idx !== index));
    } else {
      // Update question
      const newQuestions = [...questions];
      newQuestions[index] = editedQuestion;
      setQuestions(newQuestions);
    }
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, {
      id: questions.length + 1,
      text: "New Question",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: 0
    }]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Chemical Bonds Quiz</h2>
        {isTeacherView && (
          <div className="flex gap-4">
            <button
              onClick={() => setShowResults(!showResults)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {showResults ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showResults ? 'Hide Stats' : 'Show Stats'}
            </button>
            <button
              onClick={handleAddQuestion}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <Plus className="h-4 w-4" />
              Add Question
            </button>
          </div>
        )}
      </div>

      {isTeacherView && showResults && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-2">Total Responses</h3>
            <p className="text-2xl font-bold">{studentResponses.total}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-2">Average Score</h3>
            <p className="text-2xl font-bold text-green-500">
              {Math.round((Object.values(studentResponses.correct).reduce((a, b) => a + b, 0) / 
                (questions.length * studentResponses.total)) * 100)}%
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium mb-2">Average Time</h3>
            <p className="text-2xl font-bold">{studentResponses.averageTime}s</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {questions.map((question, index) => (
          <QuizQuestion
            key={question.id}
            question={question}
            onAnswer={(isCorrect) => console.log(`Answer ${isCorrect ? 'correct' : 'incorrect'}`)}
            isTeacherView={isTeacherView}
            onEdit={(editedQuestion) => handleQuestionEdit(editedQuestion, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizView;