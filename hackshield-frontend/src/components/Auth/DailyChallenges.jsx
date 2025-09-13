import React from 'react';
import { Star } from 'lucide-react';

const challenges = [
  { id: 1, title: '🛡️ Set up a secure password', description: 'Learn how to create a strong and memorable password.', points: 50 },
  { id: 2, title: '🕵️‍♂️ Spot the phishing email', description: 'Play the simulation and catch the fake email.', points: 75 },
  { id: 3, title: '🔐 Enable 2FA', description: 'Understand two-factor authentication and try it.', points: 60 },
  { id: 4, title: '🧠 Quick Quiz: Malware types', description: 'Take a short quiz on viruses, worms, and trojans.', points: 40 }
];

export default function DailyChallenges() {
  const bgUrl = "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?auto=format&fit=crop&w=2400&q=60";

  return (
    <div className="min-h-screen bg-gray-900 relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${bgUrl})` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 via-gray-900/70 to-gray-900/80" />
      <div className="relative z-10 max-w-5xl w-full bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-10 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-emerald-300">🎯 Daily Challenges</h1>
          <p className="mt-2 text-white/80 text-lg">Welcome back, Cyber Defender! Complete missions to earn points and rank up.</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="rounded-xl p-6 bg-gray-800/60 border border-white/10 shadow-lg hover:shadow-emerald-400/20 transition">
              <h2 className="text-xl font-semibold mb-1 text-white">{challenge.title}</h2>
              <p className="text-sm text-white/75 mb-3">{challenge.description}</p>
              <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 text-xs font-medium px-3 py-1 rounded-full">
                <Star className="w-4 h-4" /> {challenge.points} Points
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-white/70">New challenges drop every day. Stay sharp, agent! 🧠</p>
        </div>
      </div>
    </div>
  );
}
