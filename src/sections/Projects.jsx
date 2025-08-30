import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from '../App';
import { Element } from "react-scroll";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  // Project type filter buttons
  const types = ['All', 'Front-end', 'web Design', 'Clones'];
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.type === filter);

  // No JS scroll needed, use CSS animation for smooth infinite scroll

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/projects")
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
      <section
        id="projects"
        className={`py-1 relative`}
        style={{
          background: darkMode
            ? "radial-gradient(circle, #18181b 60%, #27272a 100%)"
            : "radial-gradient(circle, white 60%, #c7c7f7 100%)",
        }}
      >
        <h2 className={`text-3xl font-bold text-center mb-8 mt-10 ${darkMode ? 'text-white' : ''}`}>My Projects</h2>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-8">
          <style>{`
            .trendy-btn {
              transition: all 0.3s cubic-bezier(.25,.8,.25,1);
              box-shadow: 0 2px 8px rgba(0,0,0,0.10), 0 1.5px 6px rgba(0,0,0,0.08);
              position: relative;
              overflow: hidden;
              font-size: 1rem;
              padding: 0.5rem 1.2rem;
              min-width: 80px;
              background: ${darkMode ? '#222' : '#fff'};
              color: ${darkMode ? '#cbd5e1' : '#2563eb'};
              border: none;
            }
            .trendy-btn:before {
              content: '';
              position: absolute;
              left: 0; top: 0; right: 0; bottom: 0;
              background: linear-gradient(90deg, #3b82f6 0%, #6366f1 100%);
              opacity: 0;
              transition: opacity 0.3s;
              z-index: 0;
            }
            .trendy-btn:hover:before, .trendy-btn:focus:before {
              opacity: 0.15;
            }
            .trendy-btn:active {
              transform: scale(0.96);
              box-shadow: 0 4px 16px rgba(59,130,246,0.15);
            }
            .trendy-btn.selected {
              box-shadow: 0 6px 24px rgba(59,130,246,0.25);
              border-color: #6366f1;
              background: linear-gradient(90deg, #3b82f6 0%, #6366f1 100%);
              color: #fff;
            }
            @media (max-width: 640px) {
              .trendy-btn {
                font-size: 0.85rem;
                padding: 0.35rem 0.7rem;
                min-width: 60px;
              }
            }
          `}</style>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`trendy-btn rounded-lg font-semibold focus:outline-none ${filter === type ? 'selected' : ''} shadow-lg`}
              style={{ zIndex: 1 }}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Left Fade */}
        <div className={`absolute top-0 left-0 w-16 h-full z-10 pointer-events-none ${darkMode ? 'bg-gradient-to-r from-neutral-900 to-transparent' : 'bg-gradient-to-r radial-gradient(circle, #18181b 60%, #27272a 100%)'}`}></div>
        {/* Right Fade */}
        <div className={`absolute top-0 right-0 w-16 h-full z-10 pointer-events-none ${darkMode ? 'bg-gradient-to-l from-neutral-900 to-transparent' : 'bg-gradient-to-l radial-gradient(circle, #18181b 60%, #27272a 100%)'}`}></div>

        {/* Responsive Horizontal Scroll Container with hidden scrollbar */}
        <div
          className="overflow-x-hidden overflow-y-hidden px-4"
          style={{
            position: 'relative',
            touchAction: 'pan-x',
          }}
        >
          <style>{`
            #projects-scroll::-webkit-scrollbar { display: none; }
            @keyframes scrollInfinite {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .scroll-infinite {
              display: flex;
              gap: 1.5rem;
              min-width: 200%;
              animation: scrollInfinite 30s linear infinite;
            }
            .scroll-static {
              display: flex;
              gap: 1.5rem;
              justify-content: center;
              min-width: 100%;
            }
          `}</style>
          <div
            id="projects-scroll"
            className={(() => {
              // Estimate if projects overflow: 300px per project, 24px gap
              const totalWidth = filteredProjects.length * 300 + (filteredProjects.length - 1) * 24;
              if (typeof window !== 'undefined' && window.innerWidth && totalWidth > window.innerWidth) {
                // Enable finger scroll only on mobile/tablet
                if (window.innerWidth < 1024) {
                  return 'scroll-infinite py-2 cursor-grab';
                } else {
                  return 'scroll-infinite py-2 select-none';
                }
              } else {
                return 'scroll-static py-2';
              }
            })()}
            style={{ minWidth: filteredProjects.length > 0 ? (filteredProjects.length * 300 > window.innerWidth ? '200%' : '100%') : '100%', WebkitOverflowScrolling: 'touch' }}
          >
            {loading ? (
              <div className="text-center w-full" style={{ background: 'transparent' }}>Loading projects...</div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center w-full text-gray-500" style={{ background: 'transparent' }}>No projects found.</div>
            ) : (
              filteredProjects.length > 0 ?
                (filteredProjects.length * 300 + (filteredProjects.length - 1) * 24 > (typeof window !== 'undefined' ? window.innerWidth : 1200)
                  ? [...filteredProjects, ...filteredProjects]
                  : filteredProjects
                ).map((project, index) => {
                  // Detect link type
                  let linkType = '';
                  if (project.link) {
                    if (project.link.includes('github.com')) linkType = 'GitHub';
                    else if (project.link.includes('figma.com')) linkType = 'Figma';
                    else if (project.link.includes('vercel.app') || project.link.includes('netlify.app')) linkType = 'Live Demo';
                    else if (project.link.includes('codepen.io')) linkType = 'CodePen';
                    else if (project.link.includes('dribbble.com')) linkType = 'Dribbble';
                    else linkType = 'Link';
                  }
                  return (
                    <div
                      key={project._id ? `${project._id}-${index}` : index}
                      className={`relative min-w-[250px] sm:min-w-[280px] md:min-w-[300px] max-w-xs rounded-lg overflow-hidden flex-shrink-0 ${darkMode ? 'bg-neutral-800 shadow-[0_4px_24px_0_rgba(0,0,0,0.7)] text-neutral-100' : 'bg-white shadow-lg text-gray-900'}`}
                      style={{ minHeight: '340px', height: '340px' }}
                    >
                      {/* Full image background */}
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover z-0"
                        style={{ filter: 'brightness(0.65) blur(0px)' }}
                      />
                      {/* Overlay for better text visibility */}
                      <div className="absolute inset-0 z-10" style={{ background: darkMode ? 'rgba(24,24,27,0.45)' : 'rgba(255,255,255,0.25)' }}></div>
                      {/* Card content above image */}
                      <div
                        className={`relative z-20 p-4 flex flex-col items-center justify-end h-full ${darkMode ? 'text-neutral-100' : 'text-gray-900'}`}
                        style={darkMode ? { background: 'transparent' } : { background: 'transparent' }}
                      >
                        <div className="w-full flex flex-col items-center justify-end">
                          <h3 className="text-lg font-semibold mb-2 drop-shadow-lg text-center">{project.title}</h3>
                          <p className={`text-sm mb-4 drop-shadow-lg text-center ${darkMode ? 'text-neutral-300' : 'text-gray-700'}`}>{project.description}</p>
                        </div>
                        {project.link && (
                          <div className="w-full flex justify-center mb-2">
                            <style>{`
                              .view-btn {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                padding: 0.45rem 1.3rem;
                                border: none;
                                border-radius: 14px;
                                background: linear-gradient(90deg, #4f46e5 0%, #06b6d4 100%);
                                color: #fff;
                                font-weight: 600;
                                font-size: 0.97rem;
                                transition: background 0.4s cubic-bezier(.25,.8,.25,1),
                                            transform 0.25s cubic-bezier(.25,.8,.25,1),
                                            box-shadow 0.25s cubic-bezier(.25,.8,.25,1),
                                            width 0.35s cubic-bezier(.25,.8,.25,1);
                                box-shadow: 0 2px 8px rgba(59,130,246,0.13);
                                cursor: pointer;
                                min-width: 100px;
                                max-width: 180px;
                                width: 110px;
                                height: 38px;
                                text-align: center;
                                letter-spacing: 0.02em;
                                position: relative;
                                overflow: hidden;
                                margin: 0 auto;
                              }
                              .view-btn .view-text,
                              .view-btn .view-project-text {
                                position: absolute;
                                left: 0;
                                right: 0;
                                top: 0;
                                bottom: 0;
                                width: 100%;
                                height: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                transition: opacity 0.35s cubic-bezier(.25,.8,.25,1),
                                            transform 0.35s cubic-bezier(.25,.8,.25,1);
                              }
                              .view-btn .view-text {
                                opacity: 1;
                                transform: scale(1);
                              }
                              .view-btn .view-project-text {
                                opacity: 0;
                                transform: scale(0.8);
                              }
                              .view-btn:hover {
                                background: linear-gradient(90deg, #06b6d4 0%, #4f46e5 100%);
                                color: #fff;
                                box-shadow: 0 8px 24px rgba(6,182,212,0.18);
                                transform: scale(1.07);
                                width: 170px;
                              }
                              .view-btn:hover .view-text {
                                opacity: 0;
                                transform: scale(1.15);
                              }
                              .view-btn:hover .view-project-text {
                                opacity: 1;
                                transform: scale(1);
                              }
                              @media (max-width: 640px) {
                                .view-btn {
                                  font-size: 0.92rem;
                                  padding: 0.35rem 0.8rem;
                                  min-width: 70px;
                                  max-width: 100px;
                                  height: 32px;
                                }
                              }
                              .view-btn:active {
                                transform: scale(0.96);
                              }
                            `}</style>
                            <a
                              href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="view-btn"
                              style={{ background: darkMode ? 'linear-gradient(90deg, #18181b 0%, #6366f1 100%)' : 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)', color: '#fff', position: 'relative' }}
                            >
                              <span className="view-text">View</span>
                              <span className="view-project-text">View Project</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
                : null
            )}
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Projects;
