// src/components/ParticlesBackground.jsx
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // ✅ smaller bundle

export default function ParticlesBackground({ className = "" }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // ✅ init with slim version
    }).then(() => setReady(true));
  }, []);

  const options = useMemo(
    () => ({
      background: { color: { value: "transparent" } },
      fpsLimit: 120,
      detectRetina: true,
      fullScreen: { enable: false },

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
        number: { value: 60, density: { enable: true, area: 1000 } },
        shape: { type: "circle" }, // ✅ only circles
        size: { value: { min: 2, max: 4 } }, // a bit bigger for visibility
        opacity: {
          value: 0.6,
          animation: { enable: true, speed: 0.5, minimumValue: 0.3 },
        },
        move: {
          enable: true,
          speed: 0.8,
          outModes: { default: "out" },
        },
        color: { value: "#3b82f6" }, // ✅ solid blue
        links: {
          enable: true,
          distance: 150,
          opacity: 0.4,
          width: 1,
          color: "#60a5fa", // lighter blue for links
        },
      },
    }),
    []
  );

  if (!ready) return null;

  return (
    <div className={`absolute inset-0 -z-10 w-full h-full ${className}`}>
      <Particles id="tsparticles" options={options} />
    </div>
  );
}
