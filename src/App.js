import React, { useCallback, useState } from "react";
import ReactPlayer from "react-player";
import "./App.scss";
import SongList from "./components/songList";

const reactPlayerConfig = {
  file: { forceAudio: true },
};

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(null);

  const switchPlaying = useCallback(() => setPlaying(!playing), [
    setPlaying,
    playing,
  ]);
  const handleSongListStopClick = useCallback(() => setPlaying(false), [
    setPlaying,
  ]);
  const handleSongListPlayClick = useCallback(
    (song) => {
      setCurrentSong(song);
      setPlaying(true);
    },
    [setPlaying, setCurrentSong]
  );
  const handleProgressChange = useCallback(
    ({ played }) => {
      setProgress(played);
    },
    [setProgress]
  );

  const progressInPercentage = !currentSong ? 100 : Math.round(progress * 100);

  return (
    <div className="App">
      {currentSong && (
        <ReactPlayer
          playing={playing}
          url={`/songs/${currentSong.file}`}
          config={reactPlayerConfig}
          onProgress={handleProgressChange}
        />
      )}
      <div class="player">
        <div class="cover"></div>
        <nav>
          <div class="left">
            <i class="material-icons">menu</i>
            <h6>Playlist</h6>
          </div>
          <div class="right">
            <i class="material-icons search">search</i>
            <i class="material-icons">queue_music</i>
          </div>
        </nav>
        <div class="player-ui">
          <div class="title">
            <h3>{currentSong && currentSong.title}</h3>
          </div>
          <div class="small">
            <i class="material-icons">replay</i>
            <p>Adele</p>
            <i class="material-icons">volume_up</i>
          </div>
          <div class="progress">
            <div
              class="played"
              style={{ width: `${progressInPercentage}%` }}
            ></div>

            <div
              class="circle"
              style={{ left: `${progressInPercentage}%` }}
            ></div>
          </div>
          <div class="controls">
            <i class="material-icons">skip_previous</i>
            <i class="material-icons" onClick={switchPlaying}>
              {playing ? "stop_arrow" : "play_arrow"}
            </i>{" "}
            :<i class="material-icons">skip_next</i>
          </div>
        </div>
        <div class="btn">
          <i class="material-icons">shuffle</i>
        </div>
        <SongList
          playing={playing}
          currentSong={currentSong}
          onSongPlayClick={handleSongListPlayClick}
          onSongStopClick={handleSongListStopClick}
        />
      </div>
    </div>
  );
}

export default App;
