import React from "react";
import "./Iframe.css";

const Iframe = ({ video }) => {
  return (
    <div className="iframe">
      <iframe
        frameborder="0"
        src={`https://www.youtube.com/embed/${video._id}?rel=0&modestbranding=1`}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Iframe;
