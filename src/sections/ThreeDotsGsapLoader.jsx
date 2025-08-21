import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const ThreeDotsGsapLoader = () => {
  const dotRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    dotRefs.forEach((ref, i) => {
      gsap.to(ref.current, {
        y: 12,
        scale: 1.2,
        duration: 0.7,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.3,
        repeatDelay: 0.2
      });
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex space-x-2 mb-2 h-6">
        <span ref={dotRefs[0]} className="block w-3 h-3 bg-indigo-500 rounded-full"></span>
        <span ref={dotRefs[1]} className="block w-3 h-3 bg-indigo-500 rounded-full"></span>
        <span ref={dotRefs[2]} className="block w-3 h-3 bg-indigo-500 rounded-full"></span>
      </div>
      <div className="text-lg animate-pulse text-gray-500">Loading...</div>
    </div>
  );
};

export default ThreeDotsGsapLoader;
