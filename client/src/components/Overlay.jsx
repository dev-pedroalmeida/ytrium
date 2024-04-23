import React from "react";

const Overlay = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute overflow-hidden overflow-y-auto z-50 top-0 right-0 left-0 bottom-0 backdrop-blur-sm flex flex-col items-center pt-24"
    >
      {children}
    </div>
  );
};

export default Overlay;
