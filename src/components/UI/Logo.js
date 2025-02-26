import React from "react";

const Logo = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-1">
      <div className="flex items-center gap-x-1">
        <span
          className="text-black text-2xl font-bold"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Λtplace
        </span>
      </div>
      <p
        className="text-black text-xs"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Mark your attendance with ease
      </p>
    </div>
  );
};

export default Logo;
