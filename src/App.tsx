/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { Search, Home, Gamepad2, Info, Maximize, ArrowLeft, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GAMES, Game } from './gamesData';

type View = 'home' | 'games' | 'game-player';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter games based on search query
  const filteredGames = useMemo(() => {
    return GAMES.filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game);
    setCurrentView('game-player');
    window.scrollTo(0, 0);
  };

  const navigateTo = (view: View) => {
    setCurrentView(view);
    setSelectedGame(null);
    window.scrollTo(0, 0);
  };

  // Fullscreen helper
  const toggleFullscreen = () => {
    const iframe = document.getElementById('game-iframe');
    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => navigateTo('home')}
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                UNBLOCKED<span className="text-indigo-500">ARCADE</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => navigateTo('home')}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentView === 'home' ? 'text-indigo-400' : 'text-zinc-400 hover:text-white'}`}
              >
                <Home className="w-4 h-4" /> Home
              </button>
              <button 
                onClick={() => navigateTo('games')}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentView === 'games' ? 'text-indigo-400' : 'text-zinc-400 hover:text-white'}`}
              >
                <Gamepad2 className="w-4 h-4" /> Games
              </button>
            </div>

            {/* Mobile Menu Button (Simplified for this version) */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={() => navigateTo('home')} className="p-2 text-zinc-400"><Home className="w-5 h-5" /></button>
              <button onClick={() => navigateTo('games')} className="p-2 text-zinc-400"><Gamepad2 className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 text-center"
            >
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
                PLAY WITHOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">LIMITS.</span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                The ultimate collection of unblocked games. Fast, clean, and always available.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => navigateTo('games')}
                  className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/20"
                >
                  Browse Games
                </button>
              </div>

              {GAMES.length === 0 && (
                <div className="mt-16 p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl max-w-2xl mx-auto text-left">
                  <h3 className="text-xl font-bold text-white mb-4">Getting Started</h3>
                  <p className="text-zinc-400 text-sm mb-4">
                    The site is currently empty by design. To see games in the library, you need to add them to the data file:
                  </p>
                  <div className="bg-black p-4 rounded-xl mb-4">
                    <code className="text-indigo-400 text-xs">src/gamesData.ts</code>
                  </div>
                  <p className="text-zinc-400 text-sm">
                    Once you add a game to the <code className="text-white">GAMES</code> array in that file, it will automatically appear in the library and search results.
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {(currentView === 'games') && (
            <motion.div 
              key="games"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Game Library</h2>
                  <p className="text-zinc-500">Explore our collection of hand-picked titles.</p>
                </div>

                <div className="relative w-full md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input 
                    type="text"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  />
                </div>
              </div>

              {filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredGames.map((game) => (
                    <motion.div
                      key={game.id}
                      layoutId={game.id}
                      whileHover={{ y: -5 }}
                      onClick={() => handleGameSelect(game)}
                      className="group cursor-pointer bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={game.thumbnail} 
                          alt={game.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <span className="text-white font-bold flex items-center gap-2">
                            Play Now <ExternalLink className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors">{game.title}</h3>
                          <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
                            {game.category}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-500 line-clamp-1">{game.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-24 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 mb-4">
                    <Search className="w-8 h-8 text-zinc-700" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No games available.</h3>
                  <p className="text-zinc-500">Try adjusting your search or check back later.</p>
                </div>
              )}
            </motion.div>
          )}

          {currentView === 'game-player' && selectedGame && (
            <motion.div 
              key="player"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            >
              <div className="flex items-center justify-between mb-6">
                <button 
                  onClick={() => navigateTo('games')}
                  className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Library
                </button>
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-bold text-white hidden sm:block">{selectedGame.title}</h2>
                  <button 
                    onClick={toggleFullscreen}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors text-sm font-bold"
                  >
                    <Maximize className="w-4 h-4" /> Fullscreen
                  </button>
                </div>
              </div>

              <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                <iframe 
                  id="game-iframe"
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  allowFullScreen
                  title={selectedGame.title}
                />
              </div>

              <div className="mt-8 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold rounded-full uppercase tracking-wider">
                    {selectedGame.category}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">{selectedGame.title}</h1>
                <p className="text-zinc-400 leading-relaxed max-w-3xl">
                  {selectedGame.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-zinc-800/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2 opacity-50 grayscale">
              <div className="w-6 h-6 bg-zinc-600 rounded flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                UNBLOCKED<span className="text-zinc-500">ARCADE</span>
              </span>
            </div>
            
            <div className="flex gap-8 text-sm font-medium text-zinc-500">
              <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">Home</button>
              <button onClick={() => navigateTo('games')} className="hover:text-white transition-colors">Games</button>
            </div>

            <p className="text-zinc-600 text-sm">
              &copy; {new Date().getFullYear()} Unblocked Arcade. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
