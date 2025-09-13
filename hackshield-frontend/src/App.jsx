import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Dashboard from './components/Dashboard/Dashboard';
import Game from './components/Game/Game';
import Game2D from './components/Game2D/Game2D';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import HackShieldLanding from './components/Auth/HackShieldLanding';
import DailyChallenges from './components/Auth/DailyChallenges';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/hackshield-landing" element={<HackShieldLanding />} />
          <Route path="/daily-challenges" element={<DailyChallenges />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/game/:gameId"
            element={
              <ProtectedRoute>
                <Game />
              </ProtectedRoute>
            }
          />

          {/* 2D Adventure Game (new) */}
          <Route
            path="/game2d"
            element={
              <ProtectedRoute>
                <Game2D />
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;