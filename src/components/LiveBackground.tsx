import React from "react";

interface ILiveBackground {
  fullHeight: boolean;
}

const LiveBackground: React.FC<ILiveBackground> = ({ fullHeight }) => {
  return (
    <ul
      className="circles"
      style={{
        height: fullHeight ? "100vh" : "auto",
        position: fullHeight ? "fixed" : "absolute",
      }}
    >
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  );
};

export default LiveBackground;
