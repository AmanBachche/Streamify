import { motion } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Heart, Clock, ArrowLeft } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { albums } from './Albums';

const trackList = [
  { id: 1, title: 'Alone Again', duration: '4:10' },
  { id: 2, title: 'Too Late', duration: '3:59' },
  { id: 3, title: 'Hardest To Love', duration: '3:31' },
  { id: 4, title: 'Scared To Live', duration: '3:11' },
];

const AlbumDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { playTrack } = usePlayer();

  const album = albums.find((item) => item.id === id);

  if (!album) {
    return (
      <div className="space-y-6 pb-20 text-white">
        <button onClick={() => navigate('/albums')} className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white">
          <ArrowLeft size={20} /> Back to albums
        </button>
        <h1 className="text-4xl font-black tracking-tight">Album not found</h1>
        <p className="text-gray-400">This album is no longer available.</p>
      </div>
    );
  }

  const tracks = trackList.map((track) => ({ ...track, artist: album.artist, cover: album.cover }));

  return (
    <div className="space-y-8 pb-20">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
        <ArrowLeft size={20} /> Back
      </button>

      <header className="flex flex-col md:flex-row items-end gap-8">
        <motion.img 
          layoutId={`album-cover-${id}`}
          src={album.cover} 
          className="w-64 h-64 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
        />
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">Album</p>
          <h1 className="text-7xl font-black tracking-tighter text-white mb-6 italic">{album.title}</h1>
          <div className="flex items-center gap-2 text-sm font-bold">
            <span>{album.artist}</span>
            <span className="w-1 h-1 rounded-full bg-gray-500" />
            <span className="text-gray-400">{album.year}</span>
            <span className="w-1 h-1 rounded-full bg-gray-500" />
            <span className="text-gray-400">{tracks.length} songs</span>
          </div>
        </div>
      </header>

      <div className="flex gap-4">
        <button 
          onClick={() => playTrack(tracks[0])}
          className="px-10 py-4 bg-primary text-white font-black rounded-full shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
        >
          <Play fill="white" size={20} /> PLAY
        </button>
        <button className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
          <Heart size={24} />
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto] gap-4 px-8 py-4 border-b border-white/5 text-gray-500 text-xs font-black uppercase tracking-widest">
          <span className="w-8">#</span>
          <span>Title</span>
          <Clock size={16} />
        </div>
        <div className="p-4">
          {tracks.map((track, index) => (
            <div 
              key={track.id}
              onClick={() => playTrack(track)}
              className="grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-4 rounded-2xl hover:bg-white/10 group cursor-pointer transition-all"
            >
              <span className="w-8 text-gray-500 group-hover:text-primary font-mono">{index + 1}</span>
              <span className="text-white font-bold">{track.title}</span>
              <span className="text-gray-500 font-mono">{track.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumDetail;