//Game.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';

// Warm, brown-friendly background image (wood/amber vibe works well with neon accents)
const bgUrl = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=60';

const Game = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [gameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    initializeGame();
  }, [gameId, navigate]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0 && !gameCompleted) {
      const timer = setTimeout(() => setTimeLeft((t) => (t !== null ? t - 1 : t)), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameCompleted) {
      handleTimeout();
    }
  }, [timeLeft, gameCompleted]);

  const initializeGame = async () => {
    try {
      const gameResponse = await api.get(`/games/${gameId}`);
      setGame(gameResponse.data);

      const sessionResponse = await api.post(`/games/${gameId}/start`, {});
      setSession(sessionResponse.data.session);

      if (gameResponse.data.questions[0]?.time_limit) {
        setTimeLeft(gameResponse.data.questions[0].time_limit);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error initializing game:', error);
      navigate('/dashboard');
    }
  };

  const handleTimeout = () => {
    setShowResult(true);
    setIsCorrect(false);
    setTimeout(() => {
      handleNextQuestion();
    }, 1500);
  };

  const handleSubmitAnswer = async () => {
    if (submitting || !game) return;

    setSubmitting(true);
    let answerPayload = null; // keep for debugging in catch

    try {
      const question = game.questions[currentQuestion];
      answerPayload = {
        sessionId: session.id,
        questionId: question.id,
      };

      if (question.question_type === 'mcq') {
        answerPayload.selectedOptionId = selectedOption;
      } else {
        answerPayload.answer = userAnswer;
      }

      const response = await api.post(`/games/${gameId}/answer`, answerPayload);
      const result = response.data;
      setIsCorrect(result.isCorrect);
      setScore((s) => s + (result.pointsEarned || 0));
      setShowResult(true);

      setTimeout(() => {
        handleNextQuestion();
      }, 1500);
    } catch (error) {
      console.error('Error submitting answer:', error);
      console.error('Session data:', session);
      console.error('Request data:', answerPayload);
      console.error('Response:', error.response?.data);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    setShowResult(false);
    setUserAnswer('');
    setSelectedOption(null);

    if (!game) return;

    if (currentQuestion + 1 < game.questions.length) {
      const nextIndex = currentQuestion + 1;
      setCurrentQuestion(nextIndex);
      const nextQuestion = game.questions[nextIndex];
      setTimeLeft(nextQuestion.time_limit ?? null);
    } else {
      completeGame();
    }
  };

  const completeGame = async () => {
    try {
      await api.post(`/games/${gameId}/complete`, {
        sessionId: session.id,
        totalScore: score,
      });
      setGameCompleted(true);
    } catch (error) {
      console.error('Error completing game:', error);
    }
  };

  const renderQuestion = () => {
    if (!game || !game.questions[currentQuestion]) return null;
    const question = game.questions[currentQuestion];

    return (
      <div className="space-y-6">
        {/* Meta */}
        <div className="flex justify-between items-center text-sm">
          <div className="text-stone-700">
            Question <span className="font-semibold text-stone-900">{currentQuestion + 1}</span> of {game.questions.length}
          </div>
          {timeLeft !== null && (
            <div className="px-3 py-1 rounded-lg bg-white/70 border border-stone-400 text-stone-900 font-medium">Time: {timeLeft}s</div>
          )}
        </div>

        {/* Card */}
        <div className="rounded-2xl p-8 bg-white/70 border border-stone-400 shadow">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-stone-900 mb-4">{question.question_text}</h3>

            {question.question_type === 'mcq' && (
              <div className="space-y-3">
                {question.options?.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors duration-200 border ${
                      selectedOption === option.id
                        ? 'border-amber-600 bg-amber-50'
                        : 'border-stone-300 hover:border-stone-400 bg-white/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="option"
                      value={option.id}
                      checked={selectedOption === option.id}
                      onChange={(e) => setSelectedOption(parseInt(e.target.value))}
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <div
                        className={`w-4 h-4 border-2 rounded-full mr-3 flex items-center justify-center ${
                          selectedOption === option.id ? 'border-amber-600 bg-amber-600' : 'border-stone-300'
                        }`}
                      >
                        {selectedOption === option.id && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <span className="text-stone-900">{option.option_text}</span>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {question.question_type === 'true_false' && (
              <div className="space-y-3">
                {['true', 'false'].map((option) => (
                  <label
                    key={option}
                    className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors duration-200 border ${
                      userAnswer === option
                        ? 'border-amber-600 bg-amber-50'
                        : 'border-stone-300 hover:border-stone-400 bg-white/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name="trueFalse"
                      value={option}
                      checked={userAnswer === option}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <div
                        className={`w-4 h-4 border-2 rounded-full mr-3 flex items-center justify-center ${
                          userAnswer === option ? 'border-amber-600 bg-amber-600' : 'border-stone-300'
                        }`}
                      >
                        {userAnswer === option && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <span className="text-stone-900 capitalize">{option}</span>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {question.question_type === 'fill_blank' && (
              <div>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Enter your answer..."
                  className="w-full rounded-lg border border-stone-300 bg-white/85 px-4 py-3 text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                />
              </div>
            )}

            {/* Drag and drop (typed) */}
            {question.question_type === 'drag_drop' && (
              <div>
                <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-900 mb-2">💡 Matching Question</p>
                  <p className="text-sm text-amber-800">Match the elements with risk levels. Format: "element: risk level"</p>
                  <p className="text-xs text-amber-700 mt-1">Example: "suspicious links: high risk"</p>
                </div>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your matches here..."
                  className="w-full min-h-[100px] resize-none rounded-lg border border-stone-300 bg-white/85 px-4 py-3 text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                />
              </div>
            )}

            {/* Scenario */}
            {question.question_type === 'scenario' && (
              <div>
                <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="text-sm text-emerald-800 mb-2">🎯 Scenario Question</p>
                  <p className="text-sm text-emerald-700">What would you do first? Be specific about your actions.</p>
                  <p className="text-xs text-emerald-600 mt-1">Example: "Call the colleague to verify the request"</p>
                </div>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Describe your first action..."
                  className="w-full min-h-[100px] resize-none rounded-lg border border-stone-300 bg-white/85 px-4 py-3 text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                />
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-stone-700">Points: {question.points}</div>
            <button
              onClick={handleSubmitAnswer}
              disabled={
                submitting ||
                (question.question_type === 'mcq' && !selectedOption) ||
                (question.question_type === 'true_false' && !userAnswer) ||
                (question.question_type === 'fill_blank' && !userAnswer.trim()) ||
                (question.question_type === 'drag_drop' && !userAnswer.trim()) ||
                (question.question_type === 'scenario' && !userAnswer.trim())
              }
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition border ${
                submitting
                  ? 'bg-stone-300 text-stone-600 border-stone-300 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-white border-emerald-500'
              }`}
            >
              {submitting ? 'Submitting...' : 'Submit Answer'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderResult = () => (
    <div className="rounded-2xl p-8 bg-white/70 border border-stone-400 shadow text-center">
      <div className={`text-6xl mb-4 ${isCorrect ? 'text-emerald-600' : 'text-red-500'}`}>{isCorrect ? '✅' : '❌'}</div>
      <h3 className={`text-2xl font-bold mb-2 ${isCorrect ? 'text-emerald-700' : 'text-red-600'}`}>{isCorrect ? 'Correct!' : 'Incorrect'}</h3>
      <p className="text-stone-700">{isCorrect ? 'Great job! You got it right.' : 'Better luck next time!'}</p>
    </div>
  );

  const renderGameComplete = () => (
    <div className="rounded-2xl p-8 bg-white/70 border border-stone-400 shadow text-center">
      <div className="text-6xl mb-4 text-emerald-600">🎉</div>
      <h3 className="text-2xl font-bold mb-2 text-stone-900">Game Complete!</h3>
      <p className="text-stone-700 mb-6">Congratulations! You've completed the game.</p>
      <div className="rounded-lg p-6 mb-6 bg-amber-50 border border-amber-200">
        <div className="text-3xl font-bold text-amber-700 mb-2">{score}</div>
        <div className="text-sm text-stone-700">Total Score</div>
      </div>
      <button onClick={() => navigate('/dashboard')} className="px-5 py-2.5 rounded-lg text-sm font-semibold transition bg-emerald-500 hover:bg-emerald-400 text-white border border-emerald-500">
        Back to Dashboard
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-stone-200 via-stone-300 to-stone-400">
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-emerald-500/30 border-t-emerald-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative text-stone-900 overflow-hidden bg-gradient-to-b from-stone-100 via-stone-200 to-stone-300">
      {/* brownish background image + warm amber overlay to match landing but not too dark */}
      <div className="absolute inset-0 bg-center bg-cover opacity-25" style={{ backgroundImage: `url(${bgUrl})` }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.18),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(120,53,15,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100/50 via-stone-200/50 to-stone-300/70" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-wide text-stone-900">{game?.name}</h1>
            <p className="text-stone-700">Score: <span className="font-semibold text-emerald-700">{score}</span></p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-white/70 border border-stone-400 hover:bg-white/80 text-stone-900"
          >
            Exit Game
          </button>
        </div>

        {/* Body */}
        {gameCompleted ? renderGameComplete() : showResult ? renderResult() : renderQuestion()}
      </div>

      {/* subtle noise/scanline so it doesn't feel flat */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.6) 1px, transparent 1px)', backgroundSize: '100% 3px' }} />
    </div>
  );
};

export default Game;