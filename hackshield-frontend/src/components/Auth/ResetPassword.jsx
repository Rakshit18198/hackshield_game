import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Shield, Lock, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import api from '../../utils/api';

const bgUrl =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=2400&q=60";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);

  const token = searchParams.get('token');

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError('Invalid reset link. Please request a new password reset.');
        setVerifying(false);
        return;
      }
      try {
        await api.get(`/auth/verify-reset-token/${token}`);
        setTokenValid(true);
      } catch {
        setError('This reset link is invalid or has expired. Please request a new password reset.');
      } finally {
        setVerifying(false);
      }
    };
    verifyToken();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }
    try {
      await api.post('/auth/reset-password', { token, password: formData.password });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderCard = (icon, title, message, children) => (
    <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl text-white">
      <div className="flex justify-center mb-4">{icon}</div>
      <h2 className="text-center text-2xl font-extrabold">{title}</h2>
      <p className="mt-2 text-center text-sm text-white/70">{message}</p>
      {children}
    </div>
  );

  if (verifying) {
    return (
      <div className="h-screen w-full bg-black relative flex items-center justify-center">
        <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${bgUrl})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90" />
        {renderCard(<Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />, 'Verifying Reset Link', 'Please wait while we verify your reset link...')}
      </div>
    );
  }

  if (success) {
    return (
      <div className="h-screen w-full bg-black relative flex items-center justify-center">
        <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${bgUrl})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90" />
        {renderCard(<CheckCircle2 className="w-10 h-10 text-emerald-400" />, 'Password Reset Successfully', 'Your password has been updated.', (
          <div className="mt-6 text-center">
            <Link to="/login" className="text-emerald-400 hover:text-emerald-300">Go to Login</Link>
          </div>
        ))}
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="h-screen w-full bg-black relative flex items-center justify-center">
        <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${bgUrl})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90" />
        {renderCard(<XCircle className="w-10 h-10 text-red-500" />, 'Invalid Reset Link', error, (
          <div className="mt-6 space-y-2 text-center">
            <Link to="/forgot-password" className="block text-emerald-400 hover:text-emerald-300">Request New Reset Link</Link>
            <Link to="/login" className="block text-white/60 hover:text-white">Back to Login</Link>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-black relative flex items-center justify-center">
      <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${bgUrl})` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90" />
      {renderCard(<Shield className="w-10 h-10 text-emerald-400" />, 'Reset Your Password', 'Enter your new password below.', (
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {error && <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">{error}</div>}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80">New Password</label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-3 flex items-center">
                <Lock className="w-4 h-4 text-white/50" />
              </span>
              <input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} placeholder="Enter new password" className="w-full rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/40 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80">Confirm New Password</label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-3 flex items-center">
                <Lock className="w-4 h-4 text-white/50" />
              </span>
              <input id="confirmPassword" name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm new password" className="w-full rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/40 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full flex justify-center items-center gap-2 py-3 rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition">
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
          <p className="text-center text-sm text-white/70">Remember your password? <Link to="/login" className="text-emerald-400 hover:text-emerald-300">Sign in here</Link></p>
        </form>
      ))}
    </div>
  );
}
