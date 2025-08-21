import React, { useEffect, useState, useContext } from "react";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
import { ThemeContext } from '../App';
import { Element } from "react-scroll";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  // Auto-scroll effect for overflowing projects
  useEffect(() => {
    const container = document.getElementById('projects-scroll');
    if (!container) return;
    let scrollAmount = 0;
    let interval = null;
    function autoScroll() {
      if (container.scrollWidth > container.clientWidth) {
        scrollAmount += 1;
        container.parentElement.scrollLeft = scrollAmount;
        // When reaching the end, reset for seamless loop
        if (scrollAmount >= container.scrollWidth / 2) {
          scrollAmount = 0;
          container.parentElement.scrollLeft = 0;
        }
      }
    }
    interval = setInterval(autoScroll, 20);
    return () => clearInterval(interval);
  }, [projects]);

  useEffect(() => {
  fetch(`${API_URL}/api/admin/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const { darkMode } = useContext(ThemeContext);
  return (
    <Element name="projects">
      <section id="projects" className={`py-12 ${darkMode ? 'bg-neutral-900' : 'bg-white'} relative`}>
        <h2 className={`text-3xl font-bold text-center mb-8 mt-10 ${darkMode ? 'text-white' : ''}`}>My Projects</h2>

        {/* Left Fade */}
        <div className={`absolute top-0 left-0 w-16 h-full z-10 pointer-events-none ${darkMode ? 'bg-gradient-to-r from-neutral-900 to-transparent' : 'bg-gradient-to-r from-white to-transparent'}`}></div>
        {/* Right Fade */}
        <div className={`absolute top-0 right-0 w-16 h-full z-10 pointer-events-none ${darkMode ? 'bg-gradient-to-l from-neutral-900 to-transparent' : 'bg-gradient-to-l from-white to-transparent'}`}></div>

        {/* Responsive Horizontal Scroll Container with hidden scrollbar */}
        <div
          className="overflow-x-auto overflow-y-hidden select-none px-4"
          style={{
            WebkitOverflowScrolling: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            position: 'relative',
            pointerEvents: 'none',
          }}
        >
          <style>{`
            #projects-scroll::-webkit-scrollbar { display: none; }
          `}</style>
          <div
            id="projects-scroll"
            className="flex gap-6 min-w-full py-2"
            style={{ minWidth: '100%' }}
          >
            {loading ? (
              <div className="text-center w-full" style={{ background: 'transparent' }}>Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="text-center w-full text-gray-500" style={{ background: 'transparent' }}>No projects .</div>
            ) : (
              // Duplicate projects for seamless round loop
              [...projects, ...projects].map((project, index) => (
                <div
                  key={project._id ? `${project._id}-${index}` : index}
                  className={`min-w-[250px] sm:min-w-[280px] md:min-w-[300px] max-w-xs rounded-lg overflow-hidden flex-shrink-0 ${darkMode ? 'bg-neutral-800 shadow-[0_4px_24px_0_rgba(0,0,0,0.7)]' : 'shadow-lg'}`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className={`p-4 ${darkMode ? 'text-neutral-100' : 'text-gray-900'}`}
                    style={!darkMode ? { background: 'transparent' } : {}}>
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`}>{project.description}</p>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className={`text-blue-400 text-sm ${darkMode ? 'hover:text-blue-300' : 'hover:text-blue-600'}`}>View</a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Projects;
