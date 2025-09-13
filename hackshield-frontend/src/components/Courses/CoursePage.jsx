// CoursePage.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { courseData } from '../Courses/courseData';
import { formatContent} from '../../utils/contentFormatter';

const CoursePage = ({ courseId, currentLesson, onBack, onNavigateLesson, onGoToLesson }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const course = courseData[courseId];

  if (!course) {
    return <div className="min-h-screen flex items-center justify-center">Course not found</div>;
  }

  const lesson = course.lessons[currentLesson];
  const progress = ((currentLesson + 1) / course.lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{course.icon}</span>
            <div>
              <h2 className="font-bold text-gray-900">{course.title}</h2>
              <p className="text-sm text-gray-500">{course.difficulty}</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-500">{currentLesson + 1} of {course.lessons.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full transition-all duration-300" style={{width: `${progress}%`}}></div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900 mb-3">Lessons</h3>
            {course.lessons.map((lessonItem, index) => (
              <button
                key={lessonItem.id}
                onClick={() => onGoToLesson(index)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  index === currentLesson
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : index < currentLesson
                    ? 'bg-green-50 text-green-700 hover:bg-green-100'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === currentLesson
                      ? 'bg-emerald-500 text-white'
                      : index < currentLesson
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index < currentLesson ? '✓' : index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{lessonItem.title}</div>
                    <div className="text-xs opacity-75">
                      {index === currentLesson ? 'Current' : index < currentLesson ? 'Completed' : 'Upcoming'}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Tutorials
            </button>
            <div className="hidden md:block h-6 w-px bg-gray-300"></div>
            <div className="hidden md:block">
              <h1 className="font-bold text-gray-900">{lesson?.title}</h1>
              <p className="text-sm text-gray-500">Lesson {currentLesson + 1} of {course.lessons.length}</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border p-8">
              <div className="prose max-w-none">
                {formatContent(lesson?.content || '')}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => onNavigateLesson('prev')}
                disabled={currentLesson === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  currentLesson === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <span className="text-sm text-gray-500">
                {currentLesson + 1} of {course.lessons.length}
              </span>

              <button
                onClick={() => onNavigateLesson('next')}
                disabled={currentLesson === course.lessons.length - 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  currentLesson === course.lessons.length - 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-emerald-500 text-white hover:bg-emerald-600'
                }`}
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CoursePage;