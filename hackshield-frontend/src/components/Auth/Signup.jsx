import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, User, Mail, Lock, Loader2 } from 'lucide-react';
import api from '../../utils/api';

const bgUrl =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=2400&q=60";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

    try {
      const response = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-black text-white relative flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${bgUrl})` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90" />

      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
        <div className="flex justify-center">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </span>
        </div>

        <h2 className="mt-4 text-center text-2xl font-extrabold tracking-wide">
          Join HackShield
        </h2>
        <p className="mt-2 text-center text-sm text-white/70">
          Create your account to start learning cybersecurity
        </p>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mt-4 text-sm">
            {error}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/80">
              Full Name
            </label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-3 flex items-center">
                <User className="w-4 h-4 text-white/50" />
              </span>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/40 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80">
              Email address
            </label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-3 flex items-center">
                <Mail className="w-4 h-4 text-white/50" />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/40 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80">
              Password
            </label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-3 flex items-center">
                <Lock className="w-4 h-4 text-white/50" />
              </span>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/40 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80">
              Confirm Password
            </label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-3 flex items-center">
                <Lock className="w-4 h-4 text-white/50" />
              </span>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/40 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 py-3 rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? 'Creating account...' : 'Create account'}
          </button>

          <p className="text-center text-sm text-white/70">
            Already have an account?{' '}
            <Link to="/login" className="text-emerald-400 hover:text-emerald-300">
              Sign in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
