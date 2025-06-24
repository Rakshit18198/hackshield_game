// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import ExploreMenu from './ExploreMenu';

import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import MissionsPage from './MissionsPage';
import GamePlayPage from './GamePlayPage';
import CompletionPage from './CompletionPage';
import LeaderboardPage from './LeaderboardPage';
import AchievementsPage from './AchievementsPage';
import TutorialPage from './TutorialPage';
import FAQPage from './FAQPage';
import SupportPage from './SupportPage';
import AdminDashboard from './AdminDashboard';
import RegisterPage from './RegisterPage';
import SettingsPage from './SettingsPage';
import InventoryPage from './InventoryPage';
import DailyChallengesPage from './DailyChallengesPage';
import ShopPage from './ShopPage';
import NotificationPage from './NotificationsPage';
import ForgotPasswordPage from './ForgotPasswordPage';







const App = () => {
  return (
    <Router>
      {/* <ExploreMenu /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/missions" element={<MissionsPage />} />
        <Route path="/play" element={<GamePlayPage />} />
        <Route path="/complete" element={<CompletionPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/dailychallenges" element={<DailyChallengesPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
      </Routes>
    </Router>
  );
};

export default App;
