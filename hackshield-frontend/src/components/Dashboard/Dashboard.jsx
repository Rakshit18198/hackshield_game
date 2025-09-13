import React, { useState, useEffect } from 'react';
import TutorialsPage from '../Courses/TutorialsPage';
import CoursePage from '../Courses/CoursePage';
import { courseData } from '../Courses/courseData';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { Shield, LogOut, BarChart3, Target, Trophy, Gamepad2, BookOpen, Award } from 'lucide-react';

export default function Dashboard() {
  const [games, setGames] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (!token) return navigate('/login');
    if (userData) setUser(JSON.parse(userData));
    fetchGames();
    fetchStats();
  }, [navigate]);

  const fetchGames = async () => {
    try {
      const res = await api.get('/games');
      setGames(res.data);
    } catch (e) { console.error(e); }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get('/games/dashboard/stats');
      setStats(res.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  // Course navigation functions
  const startCourse = (courseId) => {
    setCurrentCourse(courseId);
    setCurrentLesson(0);
    setCurrentView('course');
  };

  const navigateLesson = (direction) => {
    const course = courseData[currentCourse];
    if (!course) return;

    if (direction === 'next' && currentLesson < course.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    } else if (direction === 'prev' && currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const goToLesson = (lessonIndex) => {
    setCurrentLesson(lessonIndex);
  };

  const getDifficultyColor = (lvl) => ({
    1: 'bg-emerald-400/20 text-emerald-700 border border-emerald-400/40',
    2: 'bg-cyan-400/20 text-cyan-700 border border-cyan-400/40',
    3: 'bg-yellow-400/20 text-yellow-700 border border-yellow-400/40',
    4: 'bg-orange-400/20 text-orange-700 border border-orange-400/40',
    5: 'bg-red-400/20 text-red-700 border border-red-400/40',
  }[lvl] || 'bg-gray-400/20 text-gray-700 border border-gray-400/40');

  const getCategoryIcon = (cat) => ({
    phishing:'🎣',
    password_security:'🔐',
    social_engineering:'👥',
    malware:'🦠',
    network_security:'🌐',
    data_protection:'📊'
  }[cat] || '🎮');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 text-emerald-700">
        <div className="relative">
          <div className="animate-spin rounded-full h-24 w-24 border-4 border-emerald-500/30 border-t-emerald-400" />
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase">Loading</span>
        </div>
      </div>
    );
  }

  // Render different views based on current state
  if (currentView === 'tutorials') {
    return (
      <TutorialsPage
        onBack={() => setCurrentView('dashboard')}
        onStartCourse={startCourse}
      />
    );
  }

  if (currentView === 'course' && currentCourse) {
    return (
      <CoursePage
        courseId={currentCourse}
        currentLesson={currentLesson}
        onBack={() => setCurrentView('tutorials')}
        onNavigateLesson={navigateLesson}
        onGoToLesson={goToLesson}
      />
    );
  }

  // Dashboard view
  const bgUrl = 'https://images.unsplash.com/photo-1587202372775-d3d7b1c6b0f6?auto=format&fit=crop&w=2400&q=60';

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 text-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-center bg-cover opacity-25" style={{ backgroundImage: `url(${bgUrl})` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-200/60 via-gray-300/50 to-gray-400/60" />

      {/* Header */}
      <header className="relative z-10 border-b border-gray-400 bg-white/60 backdrop-blur-md shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500 shadow-lg">
              <Shield className="w-5 h-5 text-white" />
            </span>
            <div>
              <h1 className="text-xl font-extrabold tracking-wide">HackShield</h1>
              <div className="text-[10px] text-gray-700 -mt-1">Cybersecurity & Gamification</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-800">Welcome, {user?.name}</span>
            <button
              onClick={() => { localStorage.clear(); navigate('/login'); }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-extrabold tracking-wide text-emerald-700">Your Progress</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-5">
          <StatCard label="Games Completed" value={stats.overall?.total_completions || 0} icon={<Trophy className="w-6 h-6" />} />
          <StatCard label="Best Score" value={stats.overall?.total_points || 0} icon={<Target className="w-6 h-6" />} />
          <StatCard label="Total Attempts" value={stats.overall?.total_attempts || 0} icon={<BarChart3 className="w-6 h-6" />} />
          <StatCard label="Accuracy" value={`${Math.round(stats.overall?.average_accuracy || 0)}%`} icon={<Gamepad2 className="w-6 h-6" />} />
        </div>
        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-emerald-700 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickActionCard
              title="Start Tutorial"
              description="Learn cybersecurity basics"
              icon={<BookOpen className="w-6 h-6" />}
              color="emerald"
              onClick={() => setCurrentView('tutorials')}
            />
            <QuickActionCard
              title="Play Games"
              description="Test your skills"
              icon={<Target className="w-6 h-6" />}
              color="blue"
              onClick={() => navigate('/game2d')}
            />
            <QuickActionCard
              title="View Progress"
              description="Track your learning"
              icon={<BarChart3 className="w-6 h-6" />}
              color="purple"
              onClick={() => navigate('/dashboard')}
            />
            <QuickActionCard
              title="Achievements"
              description="See your badges"
              icon={<Award className="w-6 h-6" />}
              color="yellow"
              onClick={() => navigate('/dashboard')}
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((g) => (
            <div key={g.id} className="rounded-2xl p-5 bg-white/60 border border-gray-400 shadow hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{getCategoryIcon(g.category)}</span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{g.name}</h3>
                    <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${getDifficultyColor(g.difficulty_level)}`}>
                      Level {g.difficulty_level}
                    </span>
                  </div>
                </div>
                <span className={`text-[10px] uppercase tracking-wider ${g.is_active ? 'text-emerald-600' : 'text-gray-500'}`}>
                  {g.is_active ? 'Active' : 'Coming Soon'}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-4 line-clamp-2">{g.description}</p>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-600">Category: {g.category?.replace(/_/g, ' ')}</div>
                <button
                  onClick={() => g.is_active && navigate(`/game/${g.id}`)}
                  disabled={!g.is_active}
                  className={`${g.is_active ? 'bg-emerald-500 text-white hover:bg-emerald-400' : 'bg-gray-300 text-gray-500 cursor-not-allowed'} px-4 py-2 rounded-lg text-sm font-semibold transition`}
                >
                  {g.is_active ? 'Play Now' : 'Coming Soon'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Reusable UI Components
function QuickActionCard({ title, description, icon, color, onClick }) {
  const colorClasses = {
    emerald: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200',
    blue: 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200',
    purple: 'bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200',
    yellow: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200'
  };

  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl border transition-colors text-left ${colorClasses[color]}`}
    >
      <div className="flex items-center justify-between mb-2">
        {icon}
      </div>
      <h4 className="font-semibold text-sm">{title}</h4>
      <p className="text-xs opacity-80 mt-1">{description}</p>
    </button>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="rounded-2xl p-5 bg-white/60 border border-gray-400 shadow flex items-center">
      <div className="p-3 rounded-xl bg-emerald-100 text-emerald-700">
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-xs font-semibold text-gray-700 uppercase">{label}</p>
        <p className="text-2xl font-extrabold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
