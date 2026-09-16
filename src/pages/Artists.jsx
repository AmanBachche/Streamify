import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const ARTISTS = [
  { id: '1', name: 'The Weeknd', followers: '85M', image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400' },
  { id: '2', name: 'Lorde', followers: '12M', image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400' },
  { id: '3', name: 'Tyler, The Creator', followers: '22M', image: 'https://images.unsplash.com/photo-1514525253344-99a42d74081c?w=400' },
  { id: '4', name: 'Tame Impala', followers: '18M', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400' },
  { id: '5', name: 'Dua Lipa', followers: '65M', image: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?w=400' },
  { id: '6', name: 'M83', followers: '5M', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400' },
];

const Artists = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-5xl font-black tracking-tighter text-white italic">Artists</h1>
        <p className="text-gray-400 mt-2">Your favorite creators, all in one place.</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
        {ARTISTS.map((artist) => (
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
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">{artist.followers} Followers</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Artists;