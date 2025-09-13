import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Phaser from 'phaser';
import { Scene1 } from './scenes/Scene1';
import { Scene2 } from './scenes/Scene2';

const bgUrl = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=60';

const Game2D = () => {
  const navigate = useNavigate();
  const gameContainerRef = useRef(null);
  const gameInstanceRef = useRef(null);
  const isMountedRef = useRef(false);

  const [gameError, setGameError] = useState(null);
  const [gameReady, setGameReady] = useState(false);

  const initializeGame = async () => {
    if (!isMountedRef.current) return;

    setGameError(null);

    try {
      const gameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'phaser-game-container',
        backgroundColor: '#2c3e50',
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
            debug: false,
          },
        },
        scene: [Scene1, Scene2],
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: 800,
          height: 600,
        },
        render: {
          pixelArt: false,
          antialias: true,
        },
      };

      const game = new Phaser.Game(gameConfig);
      gameInstanceRef.current = game;

      game.events.once('ready', () => {
        if (isMountedRef.current) {
          setGameReady(true);
        }
      });

      game.events.once('destroy', () => {
        gameInstanceRef.current = null;
        setGameReady(false);
      });

    } catch (error) {
      console.error('Failed to initialize game:', error);
      if (isMountedRef.current) {
        setGameError(error.message);
      }
    }
  };

  const cleanupGame = () => {
    if (gameInstanceRef.current) {
      try {
        gameInstanceRef.current.destroy(true, false);
      } catch (error) {
        console.error("Error during game destruction:", error);
      }
      gameInstanceRef.current = null;
    }
    setGameReady(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    isMountedRef.current = true;

    const initTimer = setTimeout(() => {
      if (isMountedRef.current) {
        initializeGame();
      }
    }, 100);

    return () => {
      isMountedRef.current = false;
      clearTimeout(initTimer);
      cleanupGame();
    };
  }, [navigate]);

  const toggleFullscreen = async () => {
    if (!gameContainerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await gameContainerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err);
    }
  };

  const handleRestart = () => {
    setGameReady(false);
    setGameError(null);
    cleanupGame();

    setTimeout(() => {
      if (isMountedRef.current) {
        initializeGame();
      }
    }, 200);
  };

  return (
    <div className="min-h-screen relative text-stone-900 overflow-hidden bg-gradient-to-b from-stone-100 via-stone-200 to-stone-300">
      {/* Background */}
      <div className="absolute inset-0 bg-center bg-cover opacity-25" style={{ backgroundImage: `url(${bgUrl})` }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.18),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(120,53,15,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-amber-100/50 via-stone-200/50 to-stone-300/70" />

      <div className="relative max-w-3xl mx-auto px-2 sm:px-4 lg:px-2 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-lg font-bold tracking-wide text-stone-900">Hackshield Cybersecurity Game</h1>
            {/* <p className="text-md text-stone-700">Multiplayer cybersecurity world</p> */}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={toggleFullscreen}
              disabled={!gameReady}
              className="px-2 py-1 rounded-lg text-sm font-semibold bg-white/70 border border-stone-400 hover:bg-white/80 text-stone-900 disabled:opacity-50"
            >
              Fullscreen
            </button>
            <button
              onClick={handleRestart}
              className="px-2 py-1 rounded-lg text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-white"
            >
              Restart
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-2 py-1 rounded-lg text-sm font-semibold bg-white/70 border border-stone-400 hover:bg-white/80 text-stone-900"
            >
              Exit Game
            </button>
          </div>
        </div>

        {/* Game Container */}
        <div className="flex justify-center">
          <div className="rounded-2xl p-4 bg-white/70 border border-stone-400 shadow">
            <div
              ref={gameContainerRef}
              className="rounded-lg overflow-hidden bg-black relative"
              style={{
                width: '700px',
                height: '525px',
              }}
            >
              <div id="phaser-game-container" className="w-full h-full" />

              {/* Loading overlay */}
              {!gameReady && !gameError && (
                <div className="absolute inset-0 flex items-center justify-center text-white bg-black/50 z-10">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500/30 border-t-emerald-400 mx-auto mb-4" />
                    <p className="mb-2">Loading Game...</p>
                  </div>
                </div>
              )}

              {/* Error overlay */}
              {gameError && (
                <div className="absolute inset-0 flex items-center justify-center text-white bg-black/50 z-10">
                  <div className="text-center">
                    <div className="text-4xl mb-4">⚠️</div>
                    <p className="text-red-400 mb-2">Game Error</p>
                    <p className="text-sm opacity-75 mb-4">{gameError}</p>
                    <button
                      onClick={handleRestart}
                      className="px-4 py-2 rounded-lg text-sm bg-emerald-500 hover:bg-emerald-400 text-white"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Game Controls */}
            <div className="mt-4 px-3 py-3 bg-stone-100/70 rounded-lg">
              <div className="flex justify-between items-center text-sm text-stone-700">
                <div className="flex space-x-4">
                  <span>🎮 Arrow Keys: Move</span>
                  <span>⌨️ Space: Interact</span>
                  <span>🗺️ Walk into entries to change maps</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${gameReady ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                  <span>{gameReady ? 'Online' : 'Loading'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game2D;