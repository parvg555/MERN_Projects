import React, { useRef, useState } from "react";
import "./css/Video.css";
import VideoFooter from "./VideoFooter";
import VideoSidebar from "./VideoSidebar";

function Video({ ...video }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleVideoPress = () => {
    if (playing === false) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="video">
      <video
        onClick={handleVideoPress}
        className="video__player"
        loop
        ref={videoRef}
        src={video.url}
      ></video>
      <VideoFooter
        channel={video.channel}
        description={video.description}
        song={video.song}
      />
      <VideoSidebar
        likes={video.likes}
        shares={video.shares}
        messages={video.messages}
      />
    </div>
  );
}

export default Video;
