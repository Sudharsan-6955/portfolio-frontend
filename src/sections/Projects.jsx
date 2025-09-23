import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from '../App';
import { Element } from "react-scroll";

const Projects = () => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const types = ['All', 'Front-end', 'web Design', 'Clones'];
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.type === filter);
  const scrollProjects = () => {
    const el = document.getElementById('projects-scroll');
    if (el) {
      el.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  // Left arrow scroll
  const scrollProjectsLeft = () => {
    const el = document.getElementById('projects-scroll');
    if (el) {
      el.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };
  useEffect(() => {
    fetch("https://portfolio-backend-pgcv.onrender.com/api/admin/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // Check for overflow whenever projects or filter changes
  useEffect(() => {
    const checkOverflow = () => {
      const el = document.getElementById('projects-scroll');
      if (el) {
        setIsOverflowing(el.scrollWidth > el.clientWidth);
      }
    };
    // Delay to ensure DOM updates
    setTimeout(checkOverflow, 100);
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [filteredProjects.length, loading, filter]);
  const { darkMode } = useContext(ThemeContext);

  return (
    <Element name="projects">
      <section
        id="projects"
        className={`py-10 px-4 sm:px-8 md:px-16 relative min-h-[70vh]`}
        style={{
          background: darkMode
            ? "radial-gradient(circle, #18181b 60%, #27272a 100%)"
            : "radial-gradient(circle, white 60%, #c7c7f7 100%)",
        }}
      >
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8 mt-6 ${darkMode ? 'text-white' : ''}`}>My Projects</h2>

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

        {/* Arrow controls at top right below filter types */}
        {filteredProjects.length > 1 && isOverflowing && (
          <div className="flex justify-end items-center w-full mb-2">
            <div className="hidden md:flex gap-2">
              <button
                type="button"
                onClick={scrollProjectsLeft}
                className={`flex items-center justify-center rounded-full shadow-lg w-10 h-10 transition-all duration-200 text-white ${darkMode ? 'bg-gradient-to-r from-indigo-900 via-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-400' : 'bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 hover:from-blue-500 hover:to-indigo-600'}`}
                aria-label="Scroll left"
                style={{ boxShadow: darkMode ? '0 2px 12px rgba(59,130,246,0.28)' : '0 2px 12px rgba(59,130,246,0.18)' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
              <button
                type="button"
                onClick={scrollProjects}
                className={`flex items-center justify-center rounded-full shadow-lg w-10 h-10 transition-all duration-200 text-white ${darkMode ? 'bg-gradient-to-r from-indigo-900 via-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-400' : 'bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 hover:from-blue-500 hover:to-indigo-600'}`}
                aria-label="Scroll right"
                style={{ boxShadow: darkMode ? '0 2px 12px rgba(59,130,246,0.28)' : '0 2px 12px rgba(59,130,246,0.18)' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Responsive Horizontal Scroll Container with hidden scrollbar */}
        <div className="relative">
          <div
            id="projects-scroll"
            className={`overflow-x-auto overflow-y-hidden px-1 sm:px-4 flex gap-4 sm:gap-6 md:gap-8 py-2${!isOverflowing ? ' justify-center' : ''}`}
            style={{
              touchAction: 'pan-x',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              minWidth: '100%',
            }}
          >
            {loading ? (
              <div className="text-center w-full" style={{ background: 'transparent' }}>Loading projects...</div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center w-full text-gray-500" style={{ background: 'transparent' }}>No projects found.</div>
            ) : (
              filteredProjects.map((project, index) => (
                <div
                  key={project._id ? `${project._id}-${index}` : index}
                  className={`relative min-w-[220px] sm:min-w-[260px] md:min-w-[300px] max-w-xs rounded-lg overflow-hidden flex-shrink-0 ${darkMode ? 'bg-neutral-800 shadow-[0_4px_24px_0_rgba(0,0,0,0.7)] text-neutral-100' : 'bg-white shadow-lg text-gray-900'}`}
                  style={{ minHeight: '320px', height: '320px' }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    style={{ filter: 'brightness(0.65) blur(0px)' }}
                  />
                  <div className="absolute inset-0 z-10" style={{ background: darkMode ? 'rgba(24,24,27,0.45)' : 'rgba(255,255,255,0.25)' }}></div>
                  <div
                    className={`relative z-20 p-4 flex flex-col items-center justify-end h-full ${darkMode ? 'text-neutral-100' : 'text-gray-900'}`}
                    style={darkMode ? { background: 'transparent' } : { background: 'transparent' }}
                  >
                    <div className="w-full flex flex-col items-center justify-end">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 drop-shadow-lg text-center">{project.title}</h3>
                      <p className={`text-xs sm:text-sm md:text-base mb-4 drop-shadow-lg text-center ${darkMode ? 'text-neutral-300' : 'text-gray-700'}`}>{project.description}</p>
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
              ))
            )}
          </div>         
        </div>
      </section>
    </Element>
  );
};

export default Projects;
