import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { SkipBack, SkipForward, Play, Pause } from "lucide-react";

// Struttura: array di album, ognuno con nome, copertina e tracce
const albums = [
  {
    name: "Hip-Hop",
    cover: process.env.PUBLIC_URL + "/covers/cover1.jpg",
    tracks: [
      {
        name: "Dumb",
        url: process.env.PUBLIC_URL + "/music/dumb.mp3",
        cover: process.env.PUBLIC_URL + "/covers/cover1.jpg"
      },
      {
        name: "I love it",
        url: process.env.PUBLIC_URL + "/music/I love it.mp3",
        cover: process.env.PUBLIC_URL + "/covers/cover1.jpg"
      }
    ]
  },
  {
    name: "Techno Ambient",
    cover: process.env.PUBLIC_URL + "/covers/cover2.png",
    tracks: [
      {
        name: "I love it",
        url: process.env.PUBLIC_URL + "/music/I love it.mp3",
        cover: process.env.PUBLIC_URL + "/covers/cover2.png"
      }
    ]
  }
  // ...aggiungi altri album qui...
];

export default function MusicPreviewApp() {
  const [selectedAlbumIdx, setSelectedAlbumIdx] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const tracks = albums[selectedAlbumIdx].tracks;

  const playTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const nextTrack = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
      setIsPlaying(true);
    }
  };

  const prevTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const duration = audioRef.current.duration;
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    audioRef.current.currentTime = duration * percent;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => nextTrack();

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    if (isPlaying) {
      audio.play().catch(() => {});
    }

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
    // eslint-disable-next-line
  }, [currentTrackIndex, isPlaying, selectedAlbumIdx]);

  // Cambia album: resetta player
  const handleSelectAlbum = (idx) => {
    setSelectedAlbumIdx(idx);
    setCurrentTrackIndex(null);
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div className="app-container">
      <h1 style={{ color: "#1db954", textAlign: "center", marginBottom: 24 }}>Music Preview</h1>
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        <div style={{ minWidth: 200 }}>
          <h2 style={{ color: "#fff", fontSize: 20, marginBottom: 12 }}>Album</h2>
          <div>
            {albums.map((album, idx) => (
              <div
                key={album.name}
                onClick={() => handleSelectAlbum(idx)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: idx === selectedAlbumIdx ? "#282828" : "transparent",
                  borderRadius: 8,
                  padding: 8,
                  cursor: "pointer",
                  marginBottom: 8,
                  border: idx === selectedAlbumIdx ? "2px solid #1db954" : "2px solid transparent"
                }}
              >
                <img src={album.cover} alt="" style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover" }} />
                <span style={{ color: "#fff", fontWeight: 600 }}>{album.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ color: "#fff", fontSize: 20, marginBottom: 12 }}>{albums[selectedAlbumIdx].name}</h2>
          <div className="track-list">
            {tracks.map((track, idx) => (
              <div
                key={track.name}
                className="track-item"
                style={{
                  background: idx === currentTrackIndex ? "#282828" : "transparent",
                  borderRadius: idx === currentTrackIndex ? 8 : 0,
                }}
                onClick={() => playTrack(idx)}
              >
                <img src={track.cover} alt="" className="track-cover" />
                <div className="track-info">
                  <div style={{ fontWeight: 600 }}>{track.name}</div>
                </div>
              </div>
            ))}
          </div>
          {currentTrackIndex !== null && tracks[currentTrackIndex] && (
            <Card className="card" style={{ marginTop: 32 }}>
              <CardContent>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <img
                    src={tracks[currentTrackIndex].cover}
                    alt=""
                    className="track-cover"
                    style={{ width: 64, height: 64 }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 18 }}>{tracks[currentTrackIndex].name}</div>
                  </div>
                </div>
                <div
                  className="progress-bar"
                  onClick={handleSeek}
                  style={{ margin: "24px 0" }}
                >
                  <div className="progress" style={{ width: `${progress}%` }} />
                </div>
                <div className="player-controls">
                  <Button onClick={prevTrack} disabled={currentTrackIndex === 0} style={{ background: "none", color: "#fff" }}>
                    <SkipBack />
                  </Button>
                  <Button onClick={togglePlayPause} style={{ background: "#1db954", color: "#fff" }}>
                    {isPlaying ? <Pause /> : <Play />}
                  </Button>
                  <Button onClick={nextTrack} disabled={currentTrackIndex === tracks.length - 1} style={{ background: "none", color: "#fff" }}>
                    <SkipForward />
                  </Button>
                </div>
                <audio
                  ref={audioRef}
                  src={tracks[currentTrackIndex].url}
                  autoPlay={isPlaying}
                  controls={false}
                  style={{ width: "100%", marginTop: 8 }}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}