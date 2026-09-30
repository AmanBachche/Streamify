import { motion } from 'motion/react';
import { Heart, Play, Clock, MoreHorizontal, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { fetchFavorites, updateStarred } from '../services/navidromeData';
import { getAuth } from '../services/navidromeAuth';

const Favorites = () => {
  const navigate = useNavigate();
  const { playTrack, currentTrack } = usePlayer();
  const username = getAuth()?.username || 'Navidrome user';
  const [likedSongs, setLikedSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const data = await fetchFavorites();
        if (isMounted) setLikedSongs(data);
      } catch (error) {
        console.error('Failed to load favorites from Navidrome:', error);
        if (isMounted) setError(error.message || 'Unable to load favorites.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back
      </button>
      <header className="flex flex-col md:flex-row items-end gap-8 p-8 rounded-[3rem] bg-gradient-to-br from-primary/40 via-accent/20 to-transparent border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -mr-20 -mt-20" />
        
        <motion.div 
          whileHover={{ scale: 1.05, rotate: -2 }}
          className="w-52 h-52 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/30 relative z-10"
        >
          <Heart size={100} fill="white" className="text-white" />
        </motion.div>

        <div className="flex-1 pb-2 relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-white/70 mb-2">Playlist</p>
          <h1 className="text-8xl font-black tracking-tighter text-white italic leading-tight">Liked Songs</h1>
          <div className="flex items-center gap-3 mt-6">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold border border-white/10">AZ</div>
            <p className="text-sm font-bold text-white">{username}</p>
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <p className="text-sm font-bold text-gray-400">{likedSongs.length} tracks</p>
          </div>
        </div>
      </header>

      <div className="flex items-center gap-6 px-4">
        <button 
          onClick={() => likedSongs[0] && playTrack(likedSongs[0])}
          disabled={!likedSongs.length}
          className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all"
        >
          <Play fill="white" size={32} className="ml-1" />
        </button>
        <MoreHorizontal size={28} className="text-gray-500 cursor-pointer hover:text-white transition-colors" />
      </div>

      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="grid grid-cols-[60px_1fr_1fr_100px_60px] gap-4 px-8 py-5 border-b border-white/5 text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
          <span>#</span>
          <span>Title</span>
          <span className="hidden md:block">Album</span>
          <div className="flex justify-center"><Clock size={16} /></div>
          <span></span>
        </div>

        <div className="p-2">
          {likedSongs.length ? likedSongs.map((track, index) => {
            const isPlaying = currentTrack?.id === track.id;
            return (
              <motion.div 
                key={track.id}
                onClick={() => playTrack(track)}
                whileHover={{ x: 4 }}
                className={`grid grid-cols-[60px_1fr_1fr_100px_60px] gap-4 px-6 py-4 rounded-2xl items-center cursor-pointer transition-all group ${isPlaying ? 'bg-primary/10 border border-primary/20' : 'hover:bg-white/5'}`}
              >
                <span className={`text-sm font-mono ${isPlaying ? 'text-primary' : 'text-gray-500'}`}>
                  {isPlaying ? (
                    <div className="flex gap-[2px] items-end h-3 w-4">
                        {[1,2,3].map(i => <div key={i} className="w-1 h-full bg-primary animate-pulse" style={{animationDelay: `${i*0.2}s`}} />)}
                    </div>
                  ) : index + 1}
                </span>

                <div className="flex items-center gap-4 overflow-hidden">
                  <img src={track.cover} className="w-12 h-12 rounded-xl shadow-lg border border-white/5" alt="" />
                  <div className="min-w-0">
                    <h4 className={`font-bold truncate ${isPlaying ? 'text-primary' : 'text-white'}`}>{track.title}</h4>
                    <p className="text-xs text-gray-400 truncate">{track.artist}</p>
                  </div>
                </div>

                <span className="hidden md:block text-sm text-gray-500 truncate group-hover:text-gray-300 transition-colors">
                  {track.album}
                </span>

                <span className="text-sm text-gray-500 font-mono text-center">
                  {track.duration}
                </span>

                <button
                  className="flex justify-center text-primary"
                  aria-label={`Remove ${track.title} from favorites`}
                  onClick={async (event) => {
                    event.stopPropagation();
                    try {
                      await updateStarred(track.id, false);
                      setLikedSongs((songs) => songs.filter((song) => song.id !== track.id));
                    } catch (starError) {
                      setError(starError.message || 'Unable to remove favorite.');
                    }
                  }}
                >
                  <Heart size={18} fill="currentColor" />
                </button>
              </motion.div>
            );
          }) : <p className="p-6 text-gray-400">{error || (loading ? 'Loading favorites from Navidrome…' : 'No tracks are starred in Navidrome.')}</p>}
        </div>
      </div>
    </motion.div>
  );
};

export default Favorites;