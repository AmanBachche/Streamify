import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Heart, Clock3 } from 'lucide-react';
import { fetchAlbums as fetchNavidromeAlbums, updateStarred } from '../services/navidromeData';

const Albums = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const data = await fetchNavidromeAlbums();
        if (isMounted) setAlbums(data);
      } catch (error) {
        console.error('Failed to load albums from Navidrome:', error);
        if (isMounted) setError(error.message || 'Unable to load albums.');
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
    <div className="space-y-8 pb-12">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-300">Library</p>
        <h1 className="mt-3 text-5xl font-black tracking-tighter text-white italic">Albums</h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {albums.length ? albums.map((album) => (
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
              <button
                aria-label={`${album.starred ? 'Remove' : 'Add'} ${album.title} ${album.starred ? 'from' : 'to'} favorites`}
                onClick={async (event) => {
                    event.stopPropagation();
                    const nextStarred = !album.starred;
                    try {
                      await updateStarred(album.id, nextStarred, 'album');
                      setAlbums((items) => items.map((item) => item.id === album.id ? { ...item, starred: nextStarred } : item));
                    } catch (starError) {
                      setError(starError.message || 'Unable to update album favorite.');
                    }
                  }}
                className="rounded-full border border-white/10 bg-white/5 p-2 text-gray-300 transition hover:bg-white/10 hover:text-white"
              >
                <Heart size={16} fill={album.starred ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
              <span>{album.year}</span>
              <span className="inline-flex items-center gap-1">
                <Clock3 size={12} /> {album.songs} songs
              </span>
            </div>
          </motion.article>
        )) : <p className="text-gray-400">{error || (loading ? 'Loading albums from Navidrome…' : 'No albums found in Navidrome.')}</p>}
      </div>
    </div>
  );
};

export default Albums;
