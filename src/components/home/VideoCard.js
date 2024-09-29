import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPlay } from "react-icons/fa";

const VideoCard = ({data}) => {
  const [hover, setHover] = useState(false);
  const { original_video_url, thumbnail_url, name, show } = data || {};
  
  return (
    <Link
      to={original_video_url}
      target="_blank"
      style={{ boxShadow: "0 2px 20px 5px rgba(0, 0, 0, 0.1)" }}
      className="h-80 relative overflow-hidden"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="border rounded-xl h-full"
        style={{
          background: `url(${thumbnail_url}) no-repeat center center`,
          backgroundSize: "cover",
        }}
      ></div>

      <div
        className={`bg-black bg-opacity-40 absolute transition-all duration-300 ${
          hover ? "top-0" : "top-full"
        } w-full h-full rounded-xl`}
      >
        <div className="w-10 h-10 bg-orange flex items-center justify-center rounded-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <FaPlay className="text-white" />
        </div>
        <div className={`grid justify-between w-full h-full p-6`}>
          <div className="self-end">
            <div className="text-white font-bold text-lg">{name}</div>
            <div className="text-slate-300 text-base">{show?.name}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard
