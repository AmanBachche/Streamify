import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Play, Heart, Clock3 } from 'lucide-react';

export const albums = [
  { id: 'f1', title: 'Neon Nights', artist: 'Luna Echo', year: '2024', songs: 12, cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800' },
  { id: 'f2', title: 'Midnight Echo', artist: 'Nova Bloom', year: '2023', songs: 10, cover: 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=800' },
  { id: 'f3', title: 'Solar Drift', artist: 'Astra Lane', year: '2025', songs: 9, cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800' },
  { id: 'f4', title: 'Velvet Skyline', artist: 'Iris', year: '2022', songs: 14, cover: 'https://images.unsplash.com/photo-1514525253344-99a42d74081c?w=800' },
  { id: 'f5', title: 'Afterglow', artist: 'Rhea', year: '2024', songs: 11, cover: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?w=800' },
  { id: 'f6', title: 'Moonlit Circuit', artist: 'The Vanta', year: '2021', songs: 8, cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800' },
];

const Albums = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-300">Library</p>
        <h1 className="mt-3 text-5xl font-black tracking-tighter text-white italic">Albums</h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {albums.map((album) => (
          <motion.article
            key={album.id}
            whileHover={{ y: -6 }}
            onClick={() => navigate(`/album/${album.id}`)}
            className="group cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-4 shadow-xl"
          >
            <div className="relative overflow-hidden rounded-[1.25rem]">
              <img src={album.cover} alt={album.title} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/album/${album.id}`);
                }}
                className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30"
              >
                <Play size={18} fill="currentColor" className="ml-0.5" />
              </button>
            </div>

            <div className="mt-4 flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-xl font-black text-white">{album.title}</h2>
                <p className="mt-1 text-sm text-gray-400">{album.artist}</p>
              </div>
              <button className="rounded-full border border-white/10 bg-white/5 p-2 text-gray-300 transition hover:bg-white/10 hover:text-white">
                <Heart size={16} />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
              <span>{album.year}</span>
              <span className="inline-flex items-center gap-1">
                <Clock3 size={12} /> {album.songs} songs
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default Albums;
