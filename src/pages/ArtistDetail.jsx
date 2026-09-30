import { useEffect, useState } from 'react';
import { Play, Heart, Check, MoreHorizontal } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import { fetchArtistById, updateStarred } from '../services/navidromeData';

const ArtistDetail = () => {
  const { id } = useParams();
  const { playTrack } = usePlayer();
  const [artist, setArtist] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (!id) return;

      try {
        const data = await fetchArtistById(id);
        if (isMounted) setArtist(data);
      } catch (error) {
        console.error('Failed to load artist from Navidrome:', error);
        if (isMounted) setError(error.message || 'Unable to load this artist.');
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (!artist) {
    return <div className="text-gray-400">{error || 'Loading artist details from Navidrome…'}</div>;
  }

  return (
    <div className="pb-20">
      <div className="relative h-[40vh] -mt-10 -mx-10 mb-10 overflow-hidden">
        <img src={artist.headerImage || artist.image} className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        
        <div className="absolute bottom-10 left-10 z-10">
          <div className="flex items-center gap-2 mb-3">
             <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Check size={14} className="text-white" />
             </div>
            <span className="text-xs font-bold uppercase tracking-widest text-white">Artist</span>
          </div>
          <h1 className="text-8xl font-black tracking-tighter text-white italic mb-4">{artist.name}</h1>
          <p className="text-white font-bold">{artist.playCount} plays</p>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-12">
        <button 
          onClick={() => artist.topTracks[0] && playTrack(artist.topTracks[0])}
          className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all"
        >
          <Play fill="white" size={32} className="ml-1" />
        </button>
        <button
          onClick={async () => {
            const nextStarred = !artist.starred;
            try {
              await updateStarred(artist.id, nextStarred, 'artist');
              setArtist((current) => ({ ...current, starred: nextStarred }));
              setError('');
            } catch (starError) {
              setError(starError.message || 'Unable to update artist favorite.');
            }
          }}
          className="px-8 py-2 border-2 border-white/20 rounded-full font-bold hover:bg-white/10 transition-colors uppercase tracking-widest text-sm"
        >{artist.starred ? 'Starred' : 'Star artist'}</button>
        <MoreHorizontal className="text-gray-400 cursor-pointer hover:text-white" />
      </div>

      <section className="max-w-4xl">
        {error && <p role="status" className="mb-4 text-sm text-red-300">{error}</p>}
        <h2 className="text-2xl font-bold mb-6">Popular</h2>
        <div className="space-y-1">
          {artist.topTracks.map((track, index) => (
            <div 
              key={track.id}
              onClick={() => playTrack({ ...track, artist: artist.name })}
              className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer"
            >
              <span className="w-6 text-center text-gray-500 font-mono group-hover:text-primary">{index + 1}</span>
              <img src={track.cover} className="w-12 h-12 rounded-lg" alt="" />
              <div className="flex-1">
                <h4 className="font-bold text-white group-hover:text-primary">{track.title}</h4>
                <p className="text-xs text-gray-500">{track.album}</p>
              </div>
              <span className="text-sm text-gray-500 font-mono mr-4">{track.duration}</span>
              <Heart size={16} className="text-gray-600 hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />
            </div>
          ))}
          {!artist.topTracks.length && <p className="text-gray-400">No tracks are available for this artist.</p>}
        </div>
      </section>
    </div>
  );
};

export default ArtistDetail;