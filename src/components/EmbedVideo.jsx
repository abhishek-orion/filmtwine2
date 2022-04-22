import React from "react";
import "./EmbedVideo";
import "./EmbedVideo.css";

const EmbedVideo = ({ movieData }) => {
  if (movieData && !movieData.key) {
    return "Oops.. Video not found";
  }
  return (
    <div className="video-responsive">
      {movieData && movieData.key ? (
        <iframe
          style={{ width: "inherit" }}
          src={`https://www.youtube.com/embed/${movieData.key}?autoplay=1`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      ) : null}
    </div>
  );
};

export default EmbedVideo;
