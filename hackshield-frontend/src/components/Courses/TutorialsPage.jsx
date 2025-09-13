import { ChevronLeft, Shield } from 'lucide-react';
import { courseData } from './courseData';

const TutorialsPage = ({ onBack, onStartCourse }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Back to Dashboard
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500 shadow-lg">
                  <Shield className="w-5 h-5 text-white" />
                </span>
                <div>
                  <h1 className="text-xl font-bold tracking-wide">HackShield Tutorials</h1>
                  <div className="text-xs text-gray-600">Cybersecurity Learning Platform</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Cybersecurity Tutorials</h2>
          <p className="text-xl text-gray-600 mb-8">Master cybersecurity fundamentals with our comprehensive learning platform</p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {Object.entries(courseData).map(([courseId, course]) => (
              <TutorialCard
                key={courseId}
                title={course.title}
                description={course.description}
                icon={course.icon}
                lessons={course.lessons.length}
                duration={`${course.lessons.length * 30} mins`}
                difficulty={course.difficulty}
                color={
                  course.difficulty === 'Beginner' ? 'emerald' :
                  course.difficulty === 'Intermediate' ? 'blue' : 'purple'
                }
                onStart={() => onStartCourse(courseId)}
              />
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 border border-emerald-200">
            <h3 className="text-2xl font-bold text-emerald-800 mb-4">Ready to Start Learning?</h3>
            <p className="text-emerald-700 mb-6">Begin with our structured learning path designed for all skill levels.</p>
            <button
              onClick={() => onStartCourse('cyber-security-basics')}
              className="px-8 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-semibold text-lg shadow-lg"
            >
              Start Tutorial Series
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TutorialCard = ({ title, description, icon, lessons, duration, difficulty, color, onStart }) => {
  const colorClasses = {
    emerald: 'border-emerald-200 hover:border-emerald-300 hover:shadow-emerald-100',
    blue: 'border-blue-200 hover:border-blue-300 hover:shadow-blue-100',
    purple: 'border-purple-200 hover:border-purple-300 hover:shadow-purple-100'
  };

  const badgeClasses = {
    'Beginner': 'bg-green-100 text-green-700 border-green-200',
    'Intermediate': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Advanced': 'bg-red-100 text-red-700 border-red-200'
  };

  return (
    <div className={`bg-white rounded-2xl p-6 border-2 ${colorClasses[color]} hover:shadow-xl transition-all duration-300 hover:scale-105`}>
      <div className="text-4xl mb-4 text-center">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{title}</h3>
      <p className="text-gray-600 text-sm mb-6 text-center">{description}</p>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Lessons:</span>
          <span className="font-semibold text-gray-700">{lessons}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Duration:</span>
          <span className="font-semibold text-gray-700">{duration}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">Level:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${badgeClasses[difficulty]}`}>
            {difficulty}
          </span>
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
      >
        Start Course
      </button>
    </div>
  );
};

export default TutorialsPage;