import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const SpinningDartLoader = () => {
  const dartRef = useRef(null);

  useEffect(() => {
    if (dartRef.current) {
      gsap.to(dartRef.current, {
        rotate: 360,
        repeat: -1,
        duration: 1,
        ease: "linear"
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-12 h-12 mb-2">
        <span ref={dartRef} className="block absolute left-1/2 top-1/2 w-8 h-8" style={{transform:'translate(-50%,-50%)'}}>
          <span className="block w-8 h-8 border-4 border-indigo-400 border-t-transparent rounded-full"></span>
          <span className="block absolute left-1/2 top-0 w-2 h-6 bg-indigo-500 rounded-full" style={{transform:'translateX(-50%)'}}></span>
        </span>
      </div>
      <div className="text-lg animate-pulse text-gray-500">Loading...</div>
    </div>
  );
};

export default SpinningDartLoader;
