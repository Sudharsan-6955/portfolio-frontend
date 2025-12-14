// src/components/ParticlesBackground.jsx
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // ✅ smaller bundle

export default function ParticlesBackground({ className = "", id = "tsparticles" }) {
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // ✅ init with slim version
    }).then(() => setReady(true));
  }, []);

  // Don't show particles on mobile
  if (isMobile) return null;

  const options = useMemo(
    () => ({
      background: { color: { value: "transparent" } },
      fpsLimit: 120,
      detectRetina: true,
      fullScreen: { enable: false, zIndex: 0 },

      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
          onClick: { enable: true, mode: "push" },
        },
        modes: {
          grab: { distance: 160, links: { opacity: 0.6 } },
          push: { quantity: 2 },
        },
      },

      particles: {
        number: { value: 40, density: { enable: true, area: 600 } },
        shape: { type: "circle" },
        size: { value: { min: 2, max: 4 } },
        opacity: {
          value: 0.7,
          animation: { enable: true, speed: 0.5, minimumValue: 0.4 },
        },
        move: {
          enable: true,
          speed: 1.2,
          direction: "none",
          random: true,
          straight: false,
          outModes: { 
            default: "bounce",
            top: "bounce",
            bottom: "bounce",
            left: "bounce",
            right: "bounce"
          },
        },
        color: { value: "#3b82f6" },
        links: {
          enable: true,
          distance: 150,
          opacity: 0.5,
          width: 1.5,
          color: "#60a5fa",
        },
      },
    }),
    []
  );

  if (!ready) return null;

  return (
    <div className={`absolute inset-0 z-0 w-full h-full pointer-events-none ${className}`} style={{ minHeight: '100%' }}>
      <Particles id={id} options={options} />
    </div>
  );
}
