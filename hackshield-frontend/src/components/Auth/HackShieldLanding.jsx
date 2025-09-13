import React from "react";
import { Link } from "react-router-dom";
import { Shield, Gamepad2, Trophy, Brain, ShoppingBag, Play, GraduationCap, Target, Twitter, Linkedin, Github } from "lucide-react";

const bgUrl =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=2400&q=60";

export default function HackShieldLanding() {
  const categories = [
    { title: "Game Time!", subtitle: "Play Missions", to: "/games", icon: <Gamepad2 className="w-10 h-10" /> },
    { title: "Awareness", subtitle: "Campaigns", to: "/campaigns", icon: <GraduationCap className="w-10 h-10" /> },
    { title: "Cyber Cards", subtitle: "Mini Games", to: "/cards", icon: <Brain className="w-10 h-10" /> },
    { title: "Trivia Time!", subtitle: "Test Yourself", to: "/trivia", icon: <Target className="w-10 h-10" /> },
  ];

  return (
    <div className="h-screen w-full bg-black text-white relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${bgUrl})` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90" />

      <header className="relative z-10">
        <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-emerald-500 shadow-lg">
              <Shield className="w-5 h-5 text-white" />
            </span>
            <span className="text-lg font-bold">HackShield</span>
          </Link>
          <ul className="hidden md:flex items-center gap-4 text-sm uppercase">
            <li><Link to="/" className="hover:text-emerald-300">Home</Link></li>
            <li><Link to="/games" className="hover:text-emerald-300">Games</Link></li>
            <li><Link to="/trivia" className="hover:text-emerald-300">Trivia</Link></li>
            <li><Link to="/content" className="hover:text-emerald-300">Content</Link></li>
            <li><Link to="/sponsors" className="hover:text-emerald-300">Sponsors</Link></li>
            <li><Link to="/blog" className="hover:text-emerald-300">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-emerald-300">Contact</Link></li>
            <li>
              <Link to="/store" className="inline-flex items-center gap-1 bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold hover:bg-yellow-300">
                <ShoppingBag className="w-4 h-4" /> Store
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 overflow-y-auto">
        <div>
          <div className="mx-auto w-56 h-56 rounded-full bg-gradient-to-b from-gray-200 to-gray-400/80 border-4 border-white/10 flex items-center justify-center">
            <div className="w-[70%] h-[70%] rounded-full bg-black/70 flex items-center justify-center">
              <Gamepad2 className="w-20 h-20 text-white" />
            </div>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-wide">
            <span className="block">Hackshield</span>
          </h1>
          <div className="mt-4 flex gap-3 justify-center">
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20"><Linkedin className="w-4 h-4" /></a>
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20"><Github className="w-4 h-4" /></a>
          </div>
          <div className="mt-4 flex gap-2 justify-center">
            <Link to="/login" className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400">
              <Play className="w-4 h-4" /> Login & Start
            </Link>
            <Link to="/signup" className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10">
              Create Account
            </Link>
          </div>
        </div>

        <section className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((c) => (
            <Link key={c.title} to={c.to} className="group relative w-36 h-36 rounded-full">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 opacity-90 group-hover:opacity-100" />
              <div className="absolute inset-[4px] rounded-full bg-black/80 grid place-items-center">
                <div className="flex flex-col items-center text-center px-2">
                  <span className="mb-1">{c.icon}</span>
                  <span className="text-xs font-bold leading-none">{c.title}</span>
                  <span className="text-[9px] uppercase text-white/70">{c.subtitle}</span>
                </div>
              </div>
            </Link>
          ))}
        </section>

        <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl w-full text-left">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-1 flex items-center gap-1 text-sm"><Shield className="w-3 h-3" /> Learn Defense</h3>
            <p className="text-xs text-white/80">Understand real-world threats and how to stop them.</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-1 flex items-center gap-1 text-sm"><Brain className="w-3 h-3" /> Ethical Hacking</h3>
            <p className="text-xs text-white/80">Explore ethical tools and practices in a fun environment.</p>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-1 flex items-center gap-1 text-sm"><Trophy className="w-3 h-3" /> Track Progress</h3>
            <p className="text-xs text-white/80">Level up with challenges, achievements, and rewards.</p>
          </div>
        </section>

        <footer className="mt-6 mb-4 text-[10px] text-white/70">Built for Students | Cybersecurity & Gamification</footer>
      </main>
    </div>
  );
}