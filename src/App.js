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
import ResetPasswordPage from './ResetPasswordPage';
import MissionDetailPage from './MissionDetailPage';
import InteractiveGamePage from './InteractiveGamePage';
import MissionCompletePage from './MissionCompletePage';
import CodeChallengePage from './CodeChallengePage';
import CyberNewsPage from './CyberNewsPage';
import DeleteAccountPage from './DeleteAccountPage';
import EmailVerificationPage from './EmailVerificationPage';
import MissionBriefingPage from './MissionBriefingPage';
import ProfilePage from './ProfilePage';
import RoleSelectPage from './RoleSelectPage';
import SkillTreePage from './SkillTreePage';
import TerminalSimPage from './TerminalSimPage';
import TrainingHubPage from './TrainingHubPage'






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
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/mission-detail" element={<MissionDetailPage />} />
        <Route path="/interactive" element={<InteractiveGamePage />} />
        <Route path="/mission-complete" element={<MissionCompletePage />} />
        <Route path="/code-challenge" element={<CodeChallengePage />} />
        <Route path="/cyber-news" element={<CyberNewsPage />} />
        <Route path="/delete-account" element={<DeleteAccountPage />} />
        <Route path="/email-verification" element={<EmailVerificationPage />} />
        <Route path="/mission-briefing" element={<MissionBriefingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/role-select" element={<RoleSelectPage />} />
        <Route path='/skill-tree' element={<SkillTreePage />} />
        <Route path='/terminal-sim' element={<TerminalSimPage/>}/>
        <Route path='/training-hub' element={<TrainingHubPage/>}/>

      </Routes>
    </Router>
  );
};

export default App;
