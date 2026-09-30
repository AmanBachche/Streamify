/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { getStreamUrl } from '../services/navidromeApi';
import { formatDuration } from '../services/navidromeData';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackError, setPlaybackError] = useState('');
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setProgress(audio.currentTime);
    const handleDurationChange = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      setIsPlaying(false);
      setPlaybackError('Unable to play this track. Check the Navidrome server connection and permissions.');
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audioRef.current = null;
    };
  }, []);

  const playTrack = async (track) => {
    if (!track?.id) {
      setPlaybackError('This item does not have a playable track ID.');
      return;
    }
    const streamUrl = track.streamUrl || getStreamUrl(track.id);
    if (!streamUrl || !audioRef.current) {
      setPlaybackError('Sign in to Navidrome before playing music.');
      return;
    }

    setPlaybackError('');
    setCurrentTrack(track);
    setProgress(0);
    setDuration(0);
    audioRef.current.src = streamUrl;
    try {
      await audioRef.current.play();
    } catch (error) {
      setIsPlaying(false);
      setPlaybackError(error.message || 'The browser could not start playback.');
    }
  };

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        setPlaybackError(error.message || 'The browser could not resume playback.');
      }
    } else {
      audio.pause();
    }
  };

  const seek = (seconds) => {
    if (audioRef.current && Number.isFinite(seconds)) {
      audioRef.current.currentTime = seconds;
      setProgress(seconds);
    }
  };

  return (
    <PlayerContext.Provider value={{
      currentTrack,
      isPlaying,
      setIsPlaying,
      playTrack,
      togglePlayback,
      playbackError,
      progress,
      duration,
      seek,
      formatDuration,
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);