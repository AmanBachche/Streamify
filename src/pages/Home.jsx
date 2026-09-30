import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Play, TrendingUp, Headphones, Sparkles, ArrowRight, Clock3, Heart, Pause } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { fetchAlbumById, fetchAlbums, fetchFavorites } from '../services/navidromeData';
import { getAuth } from '../services/navidromeAuth';

function Home() {
  const navigate = useNavigate();
  const { playTrack, currentTrack, isPlaying, togglePlayback, progress, duration } = usePlayer();
  const username = getAuth()?.username || 'listener';
  const [albums, setAlbums] = useState([]);
  const [favoriteTracks, setFavoriteTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const [albumData, favoritesData] = await Promise.all([
          fetchAlbums(),
          fetchFavorites(),
        ]);

        if (!isMounted) return;

        setAlbums(albumData.slice(0, 3));
        setFavoriteTracks(favoritesData.slice(0, 3));
      } catch (error) {
        console.error('Failed to load Navidrome home data:', error);
        if (isMounted) setLoadError(error.message || 'Unable to load your Navidrome library.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredCards = useMemo(
    () => albums.map((album, index) => ({
      id: album.id,
      title: album.title,
      artist: album.artist,
      duration: album.duration,
      accent: ['from-violet-500 to-purple-500', 'from-cyan-500 to-sky-500', 'from-pink-500 to-rose-500'][index % 3],
      cover: album.cover,
    })),
    [albums]
  );

  const playAlbum = async (albumId) => {
    try {
      const album = await fetchAlbumById(albumId);
      if (album.tracks.length) await playTrack(album.tracks[0]);
    } catch (error) {
      setLoadError(error.message || 'Unable to load album tracks.');
    }
  };

  const chartItems = useMemo(
    () => favoriteTracks.map((track, index) => ({
      id: track.id,
      rank: String(index + 1).padStart(2, '0'),
      title: track.title,
      artist: track.artist,
      time: track.duration,
      cover: track.cover || albums[0]?.cover,
    })),
    [albums, favoriteTracks]
  );

  return (
    <div className="space-y-8 text-white">
      <header className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-violet-300">Your Navidrome library</p>
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">Welcome back, {username}</h1>
        </div>
        <button onClick={togglePlayback} disabled={!currentTrack} className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/30 transition hover:scale-[1.05] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
          {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
          {isPlaying ? 'Pause listening' : 'Resume listening'}
        </button>
      </header>

      {loadError && <p role="status" className="rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">{loadError}</p>}

      <section className="grid gap-6 md:grid-cols-3">
        {featuredCards.length ? featuredCards.map((card) => (
          <motion.article 
            key={card.id} 
            whileHover={{ y: -5 }}
            onClick={() => navigate(`/album/${card.id}`)}
            className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20 shadow-2xl cursor-pointer group"
          >
            <div className={`h-40 bg-gradient-to-br ${card.accent} relative`}>
              <img src={card.cover} alt={card.title} className="h-full w-full object-cover opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={(e) => { e.stopPropagation(); playAlbum(card.id); }}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-xl"
                >
                  <Play fill="black" size={20} className="ml-1" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 p-4">
              <div>
                <p className="text-lg font-bold truncate">{card.title}</p>
                <p className="text-sm text-gray-400 truncate">{card.artist}</p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-300">{card.duration}</span>
            </div>
          </motion.article>
        )) : <p className="text-gray-400">{loading ? 'Loading Navidrome library…' : 'No albums found in this library.'}</p>}
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">From your library</p>
                <h2 className="mt-2 text-2xl font-black">Favorite tracks</h2>
            </div>
            <button className="inline-flex items-center gap-2 text-sm font-semibold text-violet-300 hover:underline" onClick={() => navigate('/search')}>
              View all <ArrowRight size={16} />
            </button>
          </div>

          <div className="space-y-3">
            {chartItems.length ? chartItems.map((track) => (
              <div 
                key={track.id} 
                className={`flex items-center gap-4 rounded-2xl border border-white/5 bg-black/10 px-4 py-3 transition hover:bg-white/5 group ${currentTrack?.id === track.id ? 'border-primary/50' : ''}`}
              >
                <span className="w-8 text-lg font-black text-violet-300">{track.rank}</span>
                <div className="relative group/cover">
                  <img src={track.cover} className="h-12 w-12 rounded-xl object-cover" alt="" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/cover:opacity-100 transition-opacity">
                    <Headphones size={18} />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`truncate font-bold ${currentTrack?.id === track.id ? 'text-primary' : ''}`}>{track.title}</p>
                  <p className="text-sm text-gray-400">{track.artist}</p>
                </div>
                <span className="text-sm text-gray-400 mr-4 font-mono">{track.time}</span>
                <button 
                  onClick={() => playTrack(track)}
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-white hover:border-violet-400 hover:bg-primary transition-all active:scale-90"
                >
                  <Play size={14} fill="currentColor" />
                </button>
              </div>
            )) : <p className="text-gray-400">{loading ? 'Loading tracks...' : 'No favorite tracks are starred in Navidrome.'}</p>}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6 h-full flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-300">Now playing</p>
              <h2 className="mt-2 text-2xl font-black">Playback</h2>
            </div>
            <Sparkles className="text-violet-300" size={18} />
          </div>

          <p className="mb-auto text-sm text-gray-400">Playback streams directly from your connected Navidrome server.</p>

          <div className="mt-8 rounded-[1.5rem] bg-gradient-to-br from-violet-500/20 to-cyan-500/10 p-4 border border-white/5 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-[50px] rounded-full" />
            <div className="mb-4 flex items-center justify-between relative z-10">
              <span className="text-sm font-bold text-violet-200">{isPlaying ? 'Playing' : 'Paused'}</span>
              <Heart size={18} className="text-pink-300 fill-pink-300" />
            </div>
            <p className="text-xl font-black relative z-10">{currentTrack?.title || 'Nothing playing'}</p>
            <p className="text-sm text-gray-300 relative z-10">{currentTrack?.artist || 'Navidrome'}</p>
            
            <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/10 relative z-10">
              <motion.div 
                className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" 
                animate={{ width: duration ? `${Math.min(100, (progress / duration) * 100)}%` : '0%' }}
                transition={{ duration: 1 }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] text-gray-400 font-mono relative z-10">
              <span>{currentTrack?.duration ? `${Math.floor(progress / 60)}:${String(Math.floor(progress % 60)).padStart(2, '0')}` : '0:00'}</span>
              <span>{currentTrack?.duration || '0:00'}</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Curated for you</p>
            <h2 className="mt-2 text-2xl font-black">Fresh picks</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-sm text-gray-300">
            <TrendingUp size={16} className="text-emerald-300" />
            {albums.length} albums from Navidrome
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {albums.length ? albums.map((album) => {
            return (
              <div key={album.id} className="rounded-[1.5rem] border border-white/10 bg-black/10 p-4 hover:bg-white/5 transition-colors group">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-primary/20">
                    <Clock3 size={18} />
                  </div>
                  <button 
                    onClick={() => playAlbum(album.id)}
                    className="rounded-full bg-white/5 p-2 text-white hover:bg-primary transition-all active:scale-90"
                  >
                    <Play size={14} fill="currentColor" />
                  </button>
                </div>
                <p className="text-lg font-bold">{album.title}</p>
                <p className="text-sm text-gray-400">{album.artist}</p>
              </div>
            );
          }) : <p className="text-gray-400">{loading ? 'Loading albums from Navidrome…' : 'No albums available.'}</p>}
        </div>
      </section>
    </div>
  );
}

export default Home;