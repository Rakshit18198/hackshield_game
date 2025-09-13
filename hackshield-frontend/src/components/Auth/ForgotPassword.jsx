import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import { Shield, Lock, Mail, CheckCircle, Loader2, ArrowLeft } from "lucide-react";

const bgUrl =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=2400&q=60"; // same background as landing

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      await api.post("/auth/forgot-password", { email });
      setSuccess(true);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to send reset email. Please try again."
      );
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

      {/* Top bar (compact, consistent with landing) */}
      <header className="relative z-10">
        <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-emerald-500 shadow-lg">
              <Shield className="w-5 h-5 text-white" />
            </span>
            <span className="text-lg font-bold">HackShield</span>
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
        </nav>
      </header>

      {/* Center card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur shadow-2xl">
          {/* Emblem */}
          <div className="mx-auto w-40 h-40 rounded-full bg-gradient-to-b from-gray-200 to-gray-400/80 border-4 border-white/10 flex items-center justify-center">
            <div className="w-[70%] h-[70%] rounded-full bg-black/70 flex items-center justify-center">
              {success ? (
                <CheckCircle className="w-16 h-16 text-emerald-400" />
              ) : (
                <Lock className="w-16 h-16 text-white" />
              )}
            </div>
          </div>

          {/* Headings */}
          {success ? (
            <>
              <h2 className="mt-4 text-center text-3xl font-extrabold tracking-wide">
                Check Your Email
              </h2>
              <p className="mt-2 text-center text-sm text-white/80">
                If an account with that email exists, a password reset link has been
                sent. Please follow the instructions to reset your password.
              </p>
              <div className="mt-6 bg-emerald-500/10 border border-emerald-400/40 text-emerald-300 px-4 py-3 rounded-lg text-sm">
                We just sent a secure link to <span className="font-semibold">{email}</span>.
              </div>
              <div className="text-center mt-6">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Login
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="mt-4 text-center text-3xl font-extrabold tracking-wide">
                Forgot Your Password?
              </h2>
              <p className="mt-2 text-center text-sm text-white/80">
                Enter your email and we'll send you a reset link.
              </p>

              {/* Error */}
              {error && (
                <div className="mt-4 bg-red-500/10 border border-red-400/40 text-red-300 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Form */}
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white/90"
                  >
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/40 pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>

                <div className="text-center text-sm text-white/70">
                  Remember your password? {" "}
                  <Link to="/login" className="text-emerald-300 hover:text-emerald-200 font-medium">
                    Sign in here
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
