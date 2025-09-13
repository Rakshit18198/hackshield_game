import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { Shield, Lock, Mail, Loader2, ArrowRight } from "lucide-react";

// Use same background as landing/forgot so the theme is consistent
const bgUrl =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=2400&q=60";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-black text-white relative overflow-hidden flex flex-col">
      {/* Background + overlay */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${bgUrl})` }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90"
        aria-hidden
      />

      {/* Top bar (compact, consistent with theme) */}
      <header className="relative z-10">
        <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-emerald-500 shadow-lg">
              <Shield className="w-5 h-5 text-white" />
            </span>
            <span className="text-lg font-bold">HackShield</span>
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg"
          >
            Create account <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>
      </header>

      {/* Auth card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur shadow-2xl">
          {/* Emblem */}
          <div className="mx-auto w-40 h-40 rounded-full bg-gradient-to-b from-gray-200 to-gray-400/80 border-4 border-white/10 flex items-center justify-center">
            <div className="w-[70%] h-[70%] rounded-full bg-black/70 flex items-center justify-center">
              <Lock className="w-16 h-16 text-white" />
            </div>
          </div>

          <h2 className="mt-4 text-center text-3xl font-extrabold tracking-wide">
            Welcome to HackShield
          </h2>
          <p className="mt-2 text-center text-sm text-white/80">
            Sign in to your account to continue
          </p>

          {error && (
            <div className="mt-4 bg-red-500/10 border border-red-400/40 text-red-300 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/90">
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
                  className="w-full rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/40 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/90">
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
                  autoComplete="current-password"
                  required
                  className="w-full rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/40 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="text-right mt-1">
                <Link to="/forgot-password" className="text-sm text-emerald-300 hover:text-emerald-200">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className="text-center text-sm text-white/70">
              Don't have an account? {" "}
              <Link to="/signup" className="text-emerald-300 hover:text-emerald-200 font-medium">
                Sign up here
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
