import { Play, TrendingUp, Headphones, Sparkles, ArrowRight, Clock3, Heart } from 'lucide-react';

const featuredCards = [
  { title: 'Neon Nights', artist: 'Luna Echo', duration: '3:42', accent: 'from-violet-500 to-purple-500' },
  { title: 'Midnight Echo', artist: 'Nova Bloom', duration: '4:18', accent: 'from-cyan-500 to-sky-500' },
  { title: 'Solar Drift', artist: 'Astra Lane', duration: '2:56', accent: 'from-pink-500 to-rose-500' },
];

const chartItems = [
  { rank: '01', title: 'Electric Pulse', artist: 'Kairo', time: '3:24' },
  { rank: '02', title: 'Velvet Skyline', artist: 'Iris', time: '4:01' },
  { rank: '03', title: 'Afterglow', artist: 'Rhea', time: '2:49' },
  { rank: '04', title: 'Moonlit Circuit', artist: 'The Vanta', time: '3:12' },
];

const moodTiles = ['Chill', 'Focus', 'Workout', 'Road Trip', 'Night Drive', 'Mood Boost'];

function Home() {
  return (
    <div className="space-y-8 text-white">
      <header className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-violet-300">Good evening</p>
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">Welcome back, Aman</h1>
        </div>
        <button className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/30 transition hover:scale-[1.02]">
          <Play size={16} fill="currentColor" />
          Resume listening
        </button>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {featuredCards.map((card) => (
          <article key={card.title} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20 shadow-2xl">
            <div className={`h-40 bg-gradient-to-br ${card.accent}`} />
            <div className="flex items-center justify-between gap-3 p-4">
              <div>
                <p className="text-lg font-bold">{card.title}</p>
                <p className="text-sm text-gray-400">{card.artist}</p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-300">{card.duration}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Trending now</p>
              <h2 className="mt-2 text-2xl font-black">Top charts</h2>
            </div>
            <button className="inline-flex items-center gap-2 text-sm font-semibold text-violet-300">
              View all <ArrowRight size={16} />
            </button>
          </div>

          <div className="space-y-3">
            {chartItems.map((track) => (
              <div key={track.rank} className="flex items-center gap-4 rounded-2xl border border-white/5 bg-black/10 px-4 py-3 transition hover:bg-white/5">
                <span className="w-8 text-lg font-black text-violet-300">{track.rank}</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/80 to-cyan-500/80 text-sm font-bold">
                  <Headphones size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold">{track.title}</p>
                  <p className="text-sm text-gray-400">{track.artist}</p>
                </div>
                <span className="text-sm text-gray-400">{track.time}</span>
                <button className="rounded-full border border-white/10 bg-white/5 p-2 text-white hover:border-violet-400">
                  <Play size={14} fill="currentColor" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-300">Your vibe</p>
              <h2 className="mt-2 text-2xl font-black">Mood mix</h2>
            </div>
            <Sparkles className="text-violet-300" size={18} />
          </div>

          <div className="flex flex-wrap gap-3">
            {moodTiles.map((item) => (
              <span key={item} className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-2 text-sm font-medium text-violet-100">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] bg-gradient-to-br from-violet-500/20 to-cyan-500/10 p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-bold text-violet-200">Now playing</span>
              <Heart size={18} className="text-pink-300" />
            </div>
            <p className="text-xl font-black">Skyline Dreams</p>
            <p className="text-sm text-gray-300">Asteria</p>
            <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
              <span>2:14</span>
              <span>3:22</span>
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
            12 new tracks
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500">
                  <Clock3 size={18} />
                </div>
                <button className="rounded-full bg-white/5 p-2 text-white hover:bg-violet-500/20">
                  <Play size={14} fill="currentColor" />
                </button>
              </div>
              <p className="text-lg font-bold">Night Signal</p>
              <p className="text-sm text-gray-400">Synthwave dreams</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
