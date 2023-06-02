"use client";
import { useState, useEffect } from "react";

const isWindowAvailable = typeof window !== "undefined";

const useScreen = () => {
  const [screenSize, setScreenSize] = useState(
    isWindowAvailable
      ? {
          width: window.innerWidth,
          height: window.innerHeight,
        }
      : { width: 0, height: 0 }
  );

  const handleResize = () => {
    setScreenSize({
      width: isWindowAvailable ? window.innerWidth : 0,
      height: isWindowAvailable ? window.innerHeight : 0,
    });
  };

  useEffect(() => {
    if (isWindowAvailable) {
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return screenSize;
};

export default useScreen;
