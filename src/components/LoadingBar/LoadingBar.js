import React from "react";
import "./loadingBar.css";

const LoadingBar = () => {
  return (
    <div className="bg-gray-800 h-screen w-full absolute top-0 left-0 bg-opacity-50 flex justify-center items-center">
      <LoadingDot />
    </div>
  );
};

export default LoadingBar;

export const LoadingDot = () => {
  return <span className="loader"></span>;
};
