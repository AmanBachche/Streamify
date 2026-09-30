import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchArtists } from '../services/navidromeData';

const Artists = () => {
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const data = await fetchArtists();
        if (isMounted) setArtists(data);
      } catch (error) {
        console.error('Failed to load artists from Navidrome:', error);
        if (isMounted) setError(error.message || 'Unable to load artists.');
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
    <div className="space-y-10">
      <header>
        <h1 className="text-5xl font-black tracking-tighter text-white italic">Artists</h1>
        <p className="text-gray-400 mt-2">Your favorite creators, all in one place.</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
        {artists.length ? artists.map((artist) => (
          <motion.div
            key={artist.id}
            whileHover={{ y: -10 }}
            onClick={() => navigate(`/artist/${artist.id}`)}
            className="group cursor-pointer flex flex-col items-center text-center"
          >
            <div className="relative w-full aspect-square mb-4">
              <img 
                src={artist.image} 
                className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white/5 group-hover:border-primary/50 transition-all duration-500" 
                alt={artist.name} 
              />
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{artist.name}</h3>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">{artist.playCount} plays</p>
          </motion.div>
        )) : <p className="text-gray-400">{error || (loading ? 'Loading artists from Navidrome…' : 'No artists found in Navidrome.')}</p>}
      </div>
    </div>
  );
};

export default Artists;