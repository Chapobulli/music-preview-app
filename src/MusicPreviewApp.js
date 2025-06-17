import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { SkipBack, SkipForward, Play, Pause, X, Minimize2 } from "lucide-react";

// Struttura: array di album, ognuno con nome, copertina, video e tracce
 const albums =  [
  {
    "name": "Chansons - Cherié",
    "cover": "/music/Chansons - Cherié/cover.jpg",
    "video": "/music/Chansons - Cherié/video.mp4",
    "tracks": [
      {
        "name": "Aurevoir",
        "url": "/music/Chansons - Cherié/Aurevoir.mp3",
        "cover": "/music/Chansons - Cherié/cover.jpg"
      },
      {
        "name": "Carmen",
        "url": "/music/Chansons - Cherié/Carmen.mp3",
        "cover": "/music/Chansons - Cherié/cover.jpg"
      },
      {
        "name": "Chanson d'amour",
        "url": "/music/Chansons - Cherié/Chanson d'amour.mp3",
        "cover": "/music/Chansons - Cherié/cover.jpg"
      },
      {
        "name": "Chanson",
        "url": "/music/Chansons - Cherié/Chanson.mp3",
        "cover": "/music/Chansons - Cherié/cover.jpg"
      },
      {
        "name": "Diddle",
        "url": "/music/Chansons - Cherié/Diddle.mp3",
        "cover": "/music/Chansons - Cherié/cover.jpg"
      },
      {
        "name": "Ethereal Sun",
        "url": "/music/Chansons - Cherié/Ethereal Sun.mp3",
        "cover": "/music/Chansons - Cherié/cover.jpg"
      },
      {
        "name": "La vie est une boîte de nuit",
        "url": "/music/Chansons - Cherié/La vie est une boîte de nuit.mp3",
        "cover": "/music/Chansons - Cherié/cover.jpg"
      },
      {
        "name": "Lover",
        "url": "/music/Chansons - Cherié/Lover.mp3",
        "cover": "/music/Chansons - Cherié/cover.jpg"
      },
      {
        "name": "Mon coeur",
        "url": "/music/Chansons - Cherié/Mon coeur.mp3",
        "cover": "/music/Chansons - Cherié/cover.jpg"
      },
      {
        "name": "Moon - interlude",
        "url": "/music/Chansons - Cherié/Moon - interlude.mp3",
        "cover": "/music/Chansons - Cherié/cover.jpg"
      },
      {
        "name": "Tous les jours",
        "url": "/music/Chansons - Cherié/Tous les jours.mp3",
        "cover": "/music/Chansons - Cherié/cover.jpg"
      }
    ]
  },
  {
    "name": "Chansons 2",
    "cover": "/music/Chansons 2/cover.jpg",
    "video": "/music/Chansons 2/video.mp4",
    "tracks": [
      {
        "name": "Ain't It Beautiful",
        "url": "/music/Chansons 2/Ain't It Beautiful.mp3",
        "cover": "/music/Chansons 2/cover.jpg"
      },
      {
        "name": "Be myself ",
        "url": "/music/Chansons 2/Be myself .mp3",
        "cover": "/music/Chansons 2/cover.jpg"
      },
      {
        "name": "Can't complain",
        "url": "/music/Chansons 2/Can't complain.mp3",
        "cover": "/music/Chansons 2/cover.jpg"
      },
      {
        "name": "Chanson triste",
        "url": "/music/Chansons 2/Chanson triste.mp3",
        "cover": "/music/Chansons 2/cover.jpg"
      },
      {
        "name": "Flowers",
        "url": "/music/Chansons 2/Flowers.mp3",
        "cover": "/music/Chansons 2/cover.jpg"
      },
      {
        "name": "I Wish You Knew",
        "url": "/music/Chansons 2/I Wish You Knew.mp3",
        "cover": "/music/Chansons 2/cover.jpg"
      },
      {
        "name": "No way",
        "url": "/music/Chansons 2/No way.mp3",
        "cover": "/music/Chansons 2/cover.jpg"
      },
      {
        "name": "Songbird",
        "url": "/music/Chansons 2/Songbird.mp3",
        "cover": "/music/Chansons 2/cover.jpg"
      },
      {
        "name": "Take you home",
        "url": "/music/Chansons 2/Take you home.mp3",
        "cover": "/music/Chansons 2/cover.jpg"
      },
      {
        "name": "Technolove",
        "url": "/music/Chansons 2/Technolove.mp3",
        "cover": "/music/Chansons 2/cover.jpg"
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
  const [playerBar, setPlayerBar] = useState(false);
  const audioRef = useRef(null);

  const album = albums[selectedAlbumIdx];
  const tracks = album.tracks;

  const playTrack = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setPlayerBar(false);
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

  // Barra compatta
  const renderPlayerBar = () => {
    if (currentTrackIndex === null) return null;
    const track = tracks[currentTrackIndex];
    return (
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#181818",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        padding: "8px 16px",
        zIndex: 9999,
        boxShadow: "0 -2px 8px #000a"
      }}>
        <img src={track.cover} alt="" style={{ width: 40, height: 40, borderRadius: 8, marginRight: 12 }} />
        <span style={{ flex: 1 }}>{track.name}</span>
        <Button onClick={prevTrack} disabled={currentTrackIndex === 0} style={{ background: "none", color: "#fff" }}>
          <SkipBack />
        </Button>
        <Button onClick={togglePlayPause} style={{ background: "#1db954", color: "#fff" }}>
          {isPlaying ? <Pause /> : <Play />}
        </Button>
        <Button onClick={nextTrack} disabled={currentTrackIndex === tracks.length - 1} style={{ background: "none", color: "#fff" }}>
          <SkipForward />
        </Button>
        <Button onClick={() => setPlayerBar(false)} style={{ background: "none", color: "#fff" }}>
          <Minimize2 />
        </Button>
      </div>
    );
  };

  // Player completo sopra la lista
  const renderFullPlayer = () => {
    if (currentTrackIndex === null) return null;
    const track = tracks[currentTrackIndex];
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          background: "#181818",
          boxShadow: "0 2px 16px #000a",
          paddingBottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {/* Video responsive */}
        {album.video && (
          <div
            style={{
              width: "100vw",
              maxWidth: "100%",
              position: "relative",
              background: "#000"
            }}
          >
            <video
              src={album.video}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100vw",
                height: "56vw", // 16:9 ratio
                maxHeight: "60vh",
                objectFit: "cover",
                opacity: 0.25,
                background: "#000",
                display: "block"
              }}
            />
          </div>
        )}
        {/* Player sotto il video */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: 600,
            margin: "0 auto",
            marginTop: 0,
            background: "rgba(24,24,24,0.95)",
            borderRadius: 16,
            boxShadow: "0 2px 16px #000a"
          }}
        >
          <Card className="card" style={{ margin: 0, borderRadius: 16, background: "transparent" }}>
            <CardContent>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <img
                  src={track.cover}
                  alt=""
                  className="track-cover"
                  style={{ width: 64, height: 64 }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>{track.name}</div>
                  <div style={{ fontSize: 14, color: "#aaa" }}>{album.name}</div>
                </div>
                <Button
                  style={{
                    background: "transparent",
                    color: "#fff",
                    marginLeft: "auto",
                    border: "none",
                    boxShadow: "none",
                    fontSize: 20,
                    padding: 0,
                  }}
                  onClick={() => setPlayerBar(true)}
                  title="Minimizza player"
                >
                  <Minimize2 />
                </Button>
                <Button
                  style={{
                    background: "transparent",
                    color: "#fff",
                    border: "none",
                    boxShadow: "none",
                    fontSize: 20,
                    padding: 0,
                  }}
                  onClick={() => {
                    setCurrentTrackIndex(null);
                    setIsPlaying(false);
                  }}
                  title="Chiudi player"
                >
                  <X />
                </Button>
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
                src={track.url}
                autoPlay={isPlaying}
                controls={false}
                style={{ width: "100%", marginTop: 8 }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div
      className="app-container"
      style={{
        paddingTop: currentTrackIndex !== null && !playerBar ? "70vw" : 0,
        minHeight: "100vh"
      }}
    >
      {/* Player sopra la lista */}
      {currentTrackIndex !== null && !playerBar && renderFullPlayer()}
      {/* Player barra */}
      {currentTrackIndex !== null && playerBar && renderPlayerBar()}

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
          <h2 style={{ color: "#fff", fontSize: 20, marginBottom: 12 }}>{album.name}</h2>
          <div className="track-list">
            {tracks.map((track, idx) => (
              <div
                key={track.name}
                className="track-item"
                style={{
                  background: idx === currentTrackIndex ? "#282828" : "transparent",
                  borderRadius: idx === currentTrackIndex ? 8 : 0,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer"
                }}
                onClick={() => playTrack(idx)}
              >
                {/* Icona cover brano */}
                <img src={track.cover} alt="" className="track-cover" style={{ width: 40, height: 40, borderRadius: 8, marginRight: 12 }} />
                <div className="track-info">
                  <div style={{ fontWeight: 600 }}>{track.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}