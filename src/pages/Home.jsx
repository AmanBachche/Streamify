import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Play, TrendingUp, Headphones, Sparkles, ArrowRight, Clock3, Heart } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext'; // Import the global brain

const featuredCards = [
  { id: 'f1', title: 'Neon Nights', artist: 'Luna Echo', duration: '3:42', accent: 'from-violet-500 to-purple-500', cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300" },
  { id: 'f2', title: 'Midnight Echo', artist: 'Nova Bloom', duration: '4:18', accent: 'from-cyan-500 to-sky-500', cover: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=300" },
  { id: 'f3', title: 'Solar Drift', artist: 'Astra Lane', duration: '2:56', accent: 'from-pink-500 to-rose-500', cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300" },
];

const chartItems = [
  { id: 'c1', rank: '01', title: 'Electric Pulse', artist: 'Kairo', time: '3:24', cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300" },
  { id: 'c2', rank: '02', title: 'Velvet Skyline', artist: 'Iris', time: '4:01', cover: "https://images.unsplash.com/photo-1514525253344-99a42d74081c?w=300" },
  { id: 'c3', rank: '03', title: 'Afterglow', artist: 'Rhea', time: '2:49', cover: "https://images.unsplash.com/photo-1459749411177-042180ce673c?w=300" },
  { id: 'c4', rank: '04', title: 'Moonlit Circuit', artist: 'The Vanta', time: '3:12', cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300" },
];

const moodTiles = ['Chill', 'Focus', 'Workout', 'Road Trip', 'Night Drive', 'Mood Boost'];

function Home() {
  const navigate = useNavigate();
  const { playTrack, currentTrack, isPlaying } = usePlayer(); // Connect to the player context

  return (
    <div className="space-y-8 text-white">
      {/* Welcome Header */}
      <header className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-violet-300">Good evening</p>
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">Welcome back, Aman</h1>
        </div>
        <button className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/30 transition hover:scale-[1.05] active:scale-95">
          <Play size={16} fill="currentColor" />
          Resume listening
        </button>
      </header>

      {/* Featured Grid */}
      <section className="grid gap-6 md:grid-cols-3">
        {featuredCards.map((card) => (
          <motion.article 
            key={card.title} 
            whileHover={{ y: -5 }}
            onClick={() => navigate(`/album/${card.id}`)}
            className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20 shadow-2xl cursor-pointer group"
          >
            <div className={`h-40 bg-gradient-to-br ${card.accent} relative`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => { e.stopPropagation(); playTrack(card); }}
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
        ))}
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.4fr_0.8fr]">
        {/* Top Charts */}
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Trending now</p>
              <h2 className="mt-2 text-2xl font-black">Top charts</h2>
            </div>
            <button className="inline-flex items-center gap-2 text-sm font-semibold text-violet-300 hover:underline" onClick={() => navigate('/search')}>
              View all <ArrowRight size={16} />
            </button>
          </div>

          <div className="space-y-3">
            {chartItems.map((track) => (
              <div 
                key={track.rank} 
                className={`flex items-center gap-4 rounded-2xl border border-white/5 bg-black/10 px-4 py-3 transition hover:bg-white/5 group ${currentTrack.id === track.id ? 'border-primary/50' : ''}`}
              >
                <span className="w-8 text-lg font-black text-violet-300">{track.rank}</span>
                <div className="relative group/cover">
                   <img src={track.cover} className="h-12 w-12 rounded-xl object-cover" alt="" />
                   <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/cover:opacity-100 transition-opacity">
                      <Headphones size={18} />
                   </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`truncate font-bold ${currentTrack.id === track.id ? 'text-primary' : ''}`}>{track.title}</p>
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
            ))}
          </div>
        </div>

        {/* Right Sidebar Inside Home */}
        <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6 h-full flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-300">Your vibe</p>
              <h2 className="mt-2 text-2xl font-black">Mood mix</h2>
            </div>
            <Sparkles className="text-violet-300" size={18} />
          </div>

          <div className="flex flex-wrap gap-3 mb-auto">
            {moodTiles.map((item) => (
              <span key={item} className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-2 text-sm font-medium text-violet-100 hover:bg-primary transition-colors cursor-pointer">
                {item}
              </span>
            ))}
          </div>

          {/* Current Track Widget */}
          <div className="mt-8 rounded-[1.5rem] bg-gradient-to-br from-violet-500/20 to-cyan-500/10 p-4 border border-white/5 relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-[50px] rounded-full" />
            <div className="mb-4 flex items-center justify-between relative z-10">
              <span className="text-sm font-bold text-violet-200">Now playing</span>
              <Heart size={18} className="text-pink-300 fill-pink-300" />
            </div>
            <p className="text-xl font-black relative z-10">{currentTrack.title}</p>
            <p className="text-sm text-gray-300 relative z-10">{currentTrack.artist}</p>
            
            <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/10 relative z-10">
              <motion.div 
                className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" 
                animate={{ width: isPlaying ? '68%' : '0%' }}
                transition={{ duration: 1 }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] text-gray-400 font-mono relative z-10">
              <span>2:14</span>
              <span>{currentTrack.duration}</span>
            </div>
          </div>
        </aside>
      </section>

      {/* Fresh Picks */}
      <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Curated for you</p>
            <h2 className="mt-2 text-2xl font-black">Fresh picks</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-sm text-gray-300">
            <TrendingUp size={16} className="text-emerald-300" />
            12 new tracks
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => {
            const track = { id: `fp-${item}`, title: 'Night Signal', artist: 'Synthwave dreams', cover: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=300', duration: '4:15' };
            return (
              <div key={item} className="rounded-[1.5rem] border border-white/10 bg-black/10 p-4 hover:bg-white/5 transition-colors group">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg shadow-primary/20">
                    <Clock3 size={18} />
                  </div>
                  <button 
                    onClick={() => playTrack(track)}
                    className="rounded-full bg-white/5 p-2 text-white hover:bg-primary transition-all active:scale-90"
                  >
                    <Play size={14} fill="currentColor" />
                  </button>
                </div>
                <p className="text-lg font-bold">Night Signal</p>
                <p className="text-sm text-gray-400">Synthwave dreams</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Home;