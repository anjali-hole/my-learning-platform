import React from 'react';
import { Play, FileText, CheckCircle, Clock } from 'lucide-react';
import ProgressBar from './ui/ProgressBar';

const ModuleContent = ({ content }) => (
  <div className="space-y-4">
    {content.map((item, index) => (
      <div key={index} className="border-2 border-gray-100 rounded-lg p-4 hover:border-blue-200 transition-all">
        <div className="flex items-center gap-3">
          {item.type === 'video' ? (
            <div className="p-2 bg-blue-100 rounded-lg">
              <Play className="h-5 w-5 text-blue-600" />
            </div>
          ) : item.type === 'quiz' ? (
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          ) : (
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
          )}
          <div className="flex-grow">
            <h4 className="font-medium">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{item.duration}</span>
          </div>
        </div>
        {item.progress !== undefined && (
          <div className="mt-3">
            <ProgressBar value={item.progress} color={item.color || 'blue'} />
            <p className="text-sm text-gray-500 mt-1">{item.progress}% Complete</p>
          </div>
        )}
      </div>
    ))}
  </div>
);

export default ModuleContent;