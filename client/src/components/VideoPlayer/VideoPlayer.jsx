import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import './VideoPlayer.css'; // Import your CSS file
import url from './vid1.mp4'
const CustomVideoPlayer = () => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const player = playerRef.current;
    let isForward = true;

    const handleDoubleClick = (e) => {
      const playerRect = player.getInternalPlayer().getBoundingClientRect();
      const relativeX = e.clientX - playerRect.left;

      if (relativeX > playerRect.width / 2 && relativeX <= playerRect.width) {
        // Double tap on right to move 10 seconds forward
        player.seekTo(player.getCurrentTime() + 10);
      } else if(relativeX <= playerRect.width / 2 && relativeX >= 0) {
        // Double tap on left to move 5 seconds backward
        player.seekTo(player.getCurrentTime() - 5);
      }

      e.preventDefault();
    };

    const handleSingleClick = () => {
      // Single click in the middle to play/pause the video
      if (isPlaying) {
        player.pause();
      } else {
        player.play();
      }

      setIsPlaying(!isPlaying);
    };

    const handleMouseDown = (e) => {
      const playerRect = player.getInternalPlayer().getBoundingClientRect();
      const startX = e.clientX - playerRect.left;

      if (startX > playerRect.width / 2) {
        // Press and hold on right side to go forward at 2x speed
        isForward = true;
      } else {
        // Press and hold on left side to go back at 1x speed
        isForward = false;
      }

      const handleMouseMove = (e) => {
        const currentX = e.clientX - playerRect.left;
        const diffX = currentX - startX;

        const speed = isForward ? 2 : -1;
        player.setPlaybackRate(isForward ? 2 : 0.5);
        player.seekTo(player.getCurrentTime() + speed * Math.abs(diffX) / 100);
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);

        // Reset playback rate to 1x when mouse is released
        player.setPlaybackRate(1);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const playerWrapper = document.getElementById('playerWrapper');
    playerWrapper.addEventListener('dblclick', handleDoubleClick);
    playerWrapper.addEventListener('click', handleSingleClick);
    playerWrapper.addEventListener('mousedown', handleMouseDown);

    // Use the Fullscreen API to prevent fullscreen on double-click
    const fullscreenChangeHandler = () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };

    document.addEventListener('fullscreenchange', fullscreenChangeHandler);

    return () => {
      playerWrapper.removeEventListener('dblclick', handleDoubleClick);
      playerWrapper.removeEventListener('click', handleSingleClick);
      playerWrapper.removeEventListener('mousedown', handleMouseDown);

      document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
    };
  }, [isPlaying]);

  return (
    <div id="playerWrapper" className="custom-video-player">
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="50%"
        height="50%"
        controls
      />
    </div>
  );
};

export default CustomVideoPlayer;
