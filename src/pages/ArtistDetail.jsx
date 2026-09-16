import { motion } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Heart, Check, MoreHorizontal, Clock } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

const ArtistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playTrack } = usePlayer();

  // Mock data for a specific artist
  const artist = {
    name: "The Weeknd",
    headerImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=1200",
    monthlyListeners: "108,452,110",
    topTracks: [
      { id: '1', title: 'Blinding Lights', plays: '3.2B', duration: '3:22', cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100' },
      { id: '2', title: 'Starboy', plays: '2.8B', duration: '3:50', cover: 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=100' },
      { id: '3', title: 'Save Your Tears', plays: '1.5B', duration: '3:35', cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=100' },
    ]
  };

  return (
    <div className="pb-20">
      {/* Cinematic Header */}
      <div className="relative h-[40vh] -mt-10 -mx-10 mb-10 overflow-hidden">
        <img src={artist.headerImage} className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        <div className="absolute bottom-10 left-10 z-10">
          <div className="flex items-center gap-2 mb-3">
             <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Check size={14} className="text-white" />
             </div>
             <span className="text-xs font-bold uppercase tracking-widest text-white">Verified Artist</span>
          </div>
          <h1 className="text-8xl font-black tracking-tighter text-white italic mb-4">{artist.name}</h1>
          <p className="text-white font-bold">{artist.monthlyListeners} monthly listeners</p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center gap-6 mb-12">
        <button 
          onClick={() => playTrack({...artist.topTracks[0], artist: artist.name})}
          className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all"
        >
          <Play fill="white" size={32} className="ml-1" />
        </button>
        <button className="px-8 py-2 border-2 border-white/20 rounded-full font-bold hover:bg-white/10 transition-colors uppercase tracking-widest text-sm">Following</button>
        <MoreHorizontal className="text-gray-400 cursor-pointer hover:text-white" />
      </div>

      {/* Popular Tracks */}
      <section className="max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Popular</h2>
        <div className="space-y-1">
          {artist.topTracks.map((track, index) => (
            <div 
              key={track.id}
              onClick={() => playTrack({...track, artist: artist.name})}
              className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer"
            >
              <span className="w-6 text-center text-gray-500 font-mono group-hover:text-primary">{index + 1}</span>
              <img src={track.cover} className="w-12 h-12 rounded-lg" alt="" />
              <div className="flex-1">
                <h4 className="font-bold text-white group-hover:text-primary">{track.title}</h4>
                <p className="text-xs text-gray-500">{track.plays} plays</p>
              </div>
              <span className="text-sm text-gray-500 font-mono mr-4">{track.duration}</span>
              <Heart size={16} className="text-gray-600 hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArtistDetail;