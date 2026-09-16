import { useState } from 'react';
import { motion } from 'motion/react';
import { Search as SearchIcon, Play, Mic2, Album } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

const Search = () => {
  const [query, setQuery] = useState('');
  const { playTrack } = usePlayer();

  // Mock data for search
  const results = [
    { id: 101, title: "Blinding Lights", artist: "The Weeknd", cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=200", type: "song" },
    { id: 102, title: "Save Your Tears", artist: "The Weeknd", cover: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=200", type: "song" },
    { id: 201, title: "The Weeknd", artist: "Artist", cover: "https://images.unsplash.com/photo-1514525253344-99a42d74081c?w=200", type: "artist" },
  ];

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" size={24} />
        <input 
          type="text" 
          placeholder="What do you want to listen to?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full py-6 pl-16 pr-8 text-xl text-white outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Result */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Top Result</h2>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl group relative overflow-hidden"
          >
            <img src={results[0].cover} className="w-24 h-24 rounded-2xl mb-6 shadow-2xl" alt="" />
            <h3 className="text-4xl font-black mb-2">{results[0].title}</h3>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
              Song <span className="w-1 h-1 rounded-full bg-gray-500" /> {results[0].artist}
            </p>
            <button 
              onClick={() => playTrack(results[0])}
              className="absolute bottom-8 right-8 w-16 h-16 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all shadow-xl shadow-primary/40"
            >
              <Play fill="white" size={28} className="ml-1" />
            </button>
          </motion.div>
        </section>

        {/* Songs List */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Songs</h2>
          <div className="space-y-2">
            {results.filter(r => r.type === 'song').map(song => (
              <div 
                key={song.id}
                onClick={() => playTrack(song)}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 group cursor-pointer transition-colors"
              >
                <img src={song.cover} className="w-12 h-12 rounded-lg" alt="" />
                <div className="flex-1">
                  <h4 className="font-bold text-white group-hover:text-primary transition-colors">{song.title}</h4>
                  <p className="text-sm text-gray-400">{song.artist}</p>
                </div>
                <Play size={16} className="opacity-0 group-hover:opacity-100 text-primary" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Search;