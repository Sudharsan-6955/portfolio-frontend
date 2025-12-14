import React, { useEffect, useState, useContext, useRef } from "react";
import { ThemeContext } from '../App';
import { Element } from "react-scroll";
import ParticleBackground from "../components/ParticleBackground";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [visibleProjects, setVisibleProjects] = useState({});
  const projectRefs = useRef({});
  
  const types = ['All', 'Front-end', 'web Design', 'Clones'];
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.type === filter);

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

  // Setup Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleProjects((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(projectRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [filteredProjects]);
  const { darkMode } = useContext(ThemeContext);

  return (
    <Element name="projects">
      <section
        id="projects"
        className={`py-16 px-4 sm:px-8 md:px-16 relative overflow-hidden ${darkMode ? "bg-neutral-900" : "bg-white"}`}
        style={{
          background: darkMode ? "#18181b" : "#ffffff",
          minHeight: '100vh',
        }}
      >
        {/* Particle background as a background layer */}
        <ParticleBackground id="particles-projects" />
        
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-8 mt-6 relative z-10 ${darkMode ? 'text-white' : ''}`}>My Projects</h2>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-8 relative z-10">
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

        {/* Projects Grid with Left-Right Alternating Layout */}
        <div className="max-w-5xl mx-auto relative z-10">
          {loading ? (
            <div className={`text-center py-12 text-lg ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`}>
              Loading projects...
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className={`text-center py-12 text-lg ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`}>
              No projects found.
            </div>
          ) : (
            <div className="space-y-10 md:space-y-16">
              {filteredProjects.map((project, index) => {
                const projectId = `project-${project._id}-${index}`;
                const isVisible = visibleProjects[projectId];
                const isLeftLayout = index % 2 === 0;

                return (
                  <div
                    key={projectId}
                    id={projectId}
                    ref={(el) => {
                      if (el) projectRefs.current[projectId] = el;
                    }}
                    className={`flex flex-col ${isLeftLayout ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 md:gap-8 transform transition-all duration-700 ${
                      isVisible
                        ? 'opacity-100 translate-x-0'
                        : isLeftLayout
                        ? 'opacity-0 -translate-x-16'
                        : 'opacity-0 translate-x-16'
                    }`}
                  >
                    {/* Image Side */}
                    <div className="w-full md:w-2/5 flex justify-center">
                      <style>{`
                        .project-img-container {
                          position: relative;
                          width: 100%;
                          max-width: 300px;
                          aspect-ratio: 4 / 3;
                          border-radius: 10px;
                          overflow: hidden;
                          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
                          transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
                          cursor: pointer;
                        }
                        .project-img-container:hover {
                          transform: translateY(-8px) scale(1.03);
                          box-shadow: 0 20px 48px rgba(59, 130, 246, 0.35);
                        }
                        .project-img {
                          width: 100%;
                          height: 100%;
                          object-fit: cover;
                          transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
                        }
                        .project-img-container:hover .project-img {
                          transform: scale(1.08);
                        }
                      `}</style>
                      <div className="project-img-container">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="project-img"
                        />
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full md:w-3/5 text-center md:text-left">
                      <style>{`
                        .project-title {
                          font-size: clamp(1.25rem, 4vw, 2rem);
                          font-weight: 700;
                          margin-bottom: 0.75rem;
                          background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
                          -webkit-background-clip: text;
                          -webkit-text-fill-color: transparent;
                          background-clip: text;
                          transition: transform 0.4s ease;
                        }
                        .project-title:hover {
                          transform: translateX(6px);
                        }
                        .project-description {
                          font-size: clamp(0.9rem, 1.8vw, 1rem);
                          line-height: 1.6;
                          margin-bottom: 1rem;
                          transition: all 0.4s ease;
                        }
                      `}</style>
                      <h3 className={`project-title`}>
                        {project.title}
                      </h3>
                      <p className={`project-description ${darkMode ? 'text-neutral-300' : 'text-gray-700'}`}>
                        {project.description}
                      </p>

                      {/* Project Type Badge */}
                      <div className="flex gap-2 mb-4 justify-center md:justify-start flex-wrap">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${darkMode ? 'bg-gradient-to-r from-blue-900 to-indigo-900 text-blue-300' : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700'}`}>
                          {project.type}
                        </span>
                      </div>

                      {/* View Button */}
                      {project.link && (
                        <a
                          href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center justify-center px-6 py-2 rounded-full font-semibold text-white text-sm sm:text-base transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl`}
                          style={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                            boxShadow: darkMode ? '0 6px 24px rgba(59, 130, 246, 0.25)' : '0 6px 24px rgba(59, 130, 246, 0.15)',
                          }}
                        >
                          View Project
                          <svg
                            className="w-4 h-4 ml-1.5 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Element>
  );
};

export default Projects;
