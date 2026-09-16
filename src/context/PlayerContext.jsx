import { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  // Global state for the whole app
  const [currentTrack, setCurrentTrack] = useState({
    id: 1,
    title: "Skyline Dreams",
    artist: "Asteria",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300",
    duration: "3:22"
  });
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <PlayerContext.Provider value={{ currentTrack, isPlaying, setIsPlaying, playTrack }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);