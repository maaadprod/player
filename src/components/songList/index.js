import React, { useCallback } from "react";
import config from "../../config.json";

const { songs } = config;

const EqIcon = ({ onClick }) => (
  <div class="state playing" onClick={onClick}>
    <i class="material-icons">equalizer</i>
  </div>
);

const PlayIcon = ({ onClick }) => (
  <div class="state" onClick={onClick}>
    <i class="material-icons">play_arrow</i>
  </div>
);

const SongList = ({
  currentSong,
  onSongPlayClick,
  onSongStopClick,
  playing,
}) => {
  const handleOnSongPlayClick = useCallback(
    (file) => () => onSongPlayClick(file),
    [onSongPlayClick]
  );

  return (
    <div class="music">
      {songs.map((song) => {
        const { id, title, file } = song;
        return (
          <div key={id} class="song">
            <div class="info">
              <div class="img first"></div>
              <div class="titles">
                <h5>{title}</h5>
                <p>Adele</p>
              </div>
            </div>
            {currentSong && currentSong.file === file && playing ? (
              <EqIcon onClick={onSongStopClick} />
            ) : (
              <PlayIcon onClick={handleOnSongPlayClick(song)} />
            )}
          </div>
        );
      })}
    </div>
  );
};

SongList.defaultProps = {
  currentSong: null,
  playing: false,
};

export default SongList;
