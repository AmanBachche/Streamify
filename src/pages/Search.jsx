import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Search as SearchIcon, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import { fetchSearchResults } from '../services/navidromeData';

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const { playTrack } = usePlayer();

  useEffect(() => {
    let isMounted = true;

    const runSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        const data = await fetchSearchResults(query);
        if (isMounted) {
          setResults(data);
          setError('');
        }
      } catch (error) {
        console.error('Navidrome search failed:', error);
        if (isMounted) setError(error.message || 'Search failed.');
      }
    };

    const timeout = setTimeout(runSearch, 250);
    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [query]);

  const topResult = results[0] ?? null;
  const songResults = results.filter((item) => item.type === 'song');

  const openResult = (item) => {
    if (item.type === 'artist') navigate(`/artist/${item.id}`);
    else if (item.type === 'album') navigate(`/album/${item.id}`);
    else playTrack(item);
  };

  return (
    <div className="space-y-8">
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

      {error && <p role="status" className="mx-auto max-w-2xl rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">{error}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-bold mb-6">Top Result</h2>
          {topResult ? (
            <motion.div 
              whileHover={{ scale: 1.02 }}
              onClick={() => topResult.type !== 'song' && openResult(topResult)}
              role={topResult.type !== 'song' ? 'button' : undefined}
              tabIndex={topResult.type !== 'song' ? 0 : undefined}
              className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl group relative overflow-hidden"
            >
              <img src={topResult.cover} className="w-24 h-24 rounded-2xl mb-6 shadow-2xl" alt="" />
              <h3 className="text-4xl font-black mb-2">{topResult.title}</h3>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                {topResult.type === 'artist' ? 'Artist' : 'Song'} <span className="w-1 h-1 rounded-full bg-gray-500" /> {topResult.artist}
              </p>
              <button 
                onClick={(event) => { event.stopPropagation(); openResult(topResult); }}
                className="absolute bottom-8 right-8 w-16 h-16 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all shadow-xl shadow-primary/40"
              >
                {topResult.type === 'song' ? <Play fill="white" size={28} className="ml-1" /> : <span className="text-sm font-bold">Open</span>}
              </button>
            </motion.div>
          ) : (
            <p className="text-gray-400">Search songs, albums, and artists in Navidrome…</p>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Songs</h2>
          <div className="space-y-2">
            {songResults.length ? songResults.map((song) => (
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
            )) : <p className="text-gray-400">{query.trim() ? 'No matching songs.' : 'Enter a search to find songs.'}</p>}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Search;