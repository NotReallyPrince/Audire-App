import { Audio } from "expo-av";
import { createContext, useState, useEffect, useRef } from "react";

const Music = createContext();

const MusicContext = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [queue, setQueue] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    let timer;
    if (isPlaying && currentSound) {
      timer = setInterval(async () => {
        const status = await currentSound.getStatusAsync();
        if (status.isLoaded && status.isPlaying) {
          const progress = status.positionMillis / status.durationMillis;
          setProgress(progress);
          setCurrentTime(status.positionMillis);
          setTotalDuration(status.durationMillis);
        }
        if (status.positionMillis === status.durationMillis) {
          if (repeat) {
            await currentSound.replayAsync();
          } else {
            setCurrentSound(null);
            playNextTrack();
          }
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentSound, repeat]);

  const handlePlayPause = async () => {
    if (currentSound) {
      if (isPlaying) {
        await currentSound.pauseAsync();
      } else {
        await currentSound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const songUrl = (song) => {
    if (song.downloadUrl) {
      return song.downloadUrl[4].url;
    } else {
      return song.download_url[4].link;
    }
  };

  const play = async (song) => {
    const song_url = songUrl(song);
    if (currentSound) {
      await currentSound.stopAsync();
      setCurrentSound(null);
    }
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: false,
      });

      const { sound, status } = await Audio.Sound.createAsync(
        { uri: song_url },
        { shouldPlay: true, isLooping: false }
      );

      setCurrentSound(sound);
      setCurrentTrack(song);
      setIsPlaying(status.isLoaded);
      await sound.playAsync();

      setRecentlyPlayed((prev) => [song, ...prev.filter((item) => item.id !== song.id)].slice(0, 10));
    } catch (err) {
      console.log(err.message);
    }
  };

  const playNextTrack = async () => {
    if (currentSound) {
      const index = queue.findIndex((song) => song.id === currentTrack.id);
      if (index === queue.length - 1) {
        const playtrack = queue[0];
        await play(playtrack);
      } else {
        const playtrack = queue[index + 1];
        await play(playtrack);
      }
    }
  };

  const playPreviousTrack = async () => {
    if (currentSound) {
      const index = queue.findIndex((song) => song.id === currentTrack.id);
      if (index === 0) {
        const playtrack = queue[queue.length - 1];
        await play(playtrack);
      } else {
        const playtrack = queue[index - 1];
        await play(playtrack);
      }
    }
  };

  const seek = async (positionMillis) => {
    if (currentSound) {
      await currentSound.setPositionAsync(positionMillis);
      setCurrentTime(positionMillis);
    }
  };

  return (
    <Music.Provider
      value={{
        currentTrack,
        setCurrentTrack,
        isPlaying,
        setIsPlaying,
        currentSound,
        setCurrentSound,
        progress,
        setProgress,
        currentTime,
        setCurrentTime,
        totalDuration,
        setTotalDuration,
        handlePlayPause,
        play,
        playNextTrack,
        playPreviousTrack,
        seek,
        repeat,
        setRepeat,
        queue,
        setQueue,
        recentlyPlayed, // Make sure to add this to the context value
        setRecentlyPlayed, // Include the setter in case it's needed elsewhere
      }}
    >
      {children}
    </Music.Provider>
  );
};

export { MusicContext, Music };
