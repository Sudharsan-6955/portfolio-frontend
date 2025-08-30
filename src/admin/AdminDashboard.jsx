import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  // State for project form
  const [project, setProject] = useState({ title: "", description: "", image: "", link: "", type: "Front-end" });
  // State for all projects
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  // State for editing
  const [editingId, setEditingId] = useState(null);
  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
  const res = await fetch("http://localhost:5000/api/admin/projects");
      const data = await res.json();
      setProjects(data);
    } catch {
      setStatus("Failed to fetch projects.");
    }
  };
  // State for admin image
  const [adminImage, setAdminImage] = useState("");
  // State for skills
  const [skills, setSkills] = useState("");
  // Status messages
  const [status, setStatus] = useState("");

  // Handle project form change
  const handleProjectChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  // Handle admin image change
  const handleImageChange = (e) => {
    setAdminImage(e.target.value);
  };

  // Handle skills change
  const handleSkillsChange = (e) => {
    setSkills(e.target.value);
  };

  // Submit project

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
  ? `http://localhost:5000/api/admin/projects/${editingId}`
  : "http://localhost:5000/api/admin/projects";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      if (res.ok) {
        setStatus(editingId ? "Project updated!" : "Project uploaded!");
        setProject({ title: "", description: "", image: "", link: "" });
        setEditingId(null);
        fetchProjects();
      } else {
        setStatus("Failed to save project.");
      }
    } catch {
      setStatus("Network error. Try again.");
    }
  };

  // Edit project
  const handleEditProject = (proj) => {
    setProject({
      title: proj.title,
      description: proj.description,
      image: proj.image,
      link: proj.link,
      type: proj.type || 'Front-end',
    });
    setEditingId(proj._id);
  };

  // Delete project
  const handleDeleteProject = async (id) => {
    setStatus("");
    try {
  const res = await fetch(`http://localhost:5000/api/admin/projects/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setStatus("Project deleted!");
        fetchProjects();
      } else {
        setStatus("Failed to delete project.");
      }
    } catch {
      setStatus("Network error. Try again.");
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
  const res = await fetch("http://localhost:5000/api/admin/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: adminImage }),
      });
      if (res.ok) {
        setStatus("Admin image updated successfully!");
        setAdminImage("");
      } else {
        setStatus("Failed to update image.");
      }
    } catch {
      setStatus("Network error. Try again.");
    }
  };

  const handleSkillsSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
  const res = await fetch("http://localhost:5000/api/admin/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills }),
      });
      if (res.ok) {
        setStatus("Skills updated successfully!");
        setSkills("");
      } else {
        setStatus("Failed to update skills.");
      }
    } catch {
      setStatus("Network error. Try again.");
    }
  };

  // Dark mode detection
  const darkMode = window.localStorage.getItem('darkMode') === 'true';
  return (
    <div className={`max-w-3xl mx-auto p-8 mt-10 rounded-lg shadow ${darkMode ? 'bg-neutral-900 text-neutral-100' : 'bg-white text-gray-900'}`}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-blue-400' : ''}`}>Admin Dashboard</h2>
      {/* Project Upload/Edit Form */}
      <form onSubmit={handleProjectSubmit} className="mb-8">
        <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-blue-300' : ''}`}>{editingId ? "Edit Project" : "Upload New Project"}</h3>
        <input name="title" value={project.title} onChange={handleProjectChange} placeholder="Title" className={`block w-full mb-2 p-2 border rounded ${darkMode ? 'bg-neutral-800 text-neutral-100 border-neutral-700 placeholder-neutral-400' : ''}`} required />
        <input name="description" value={project.description} onChange={handleProjectChange} placeholder="Description" className={`block w-full mb-2 p-2 border rounded ${darkMode ? 'bg-neutral-800 text-neutral-100 border-neutral-700 placeholder-neutral-400' : ''}`} required />
        <input name="image" value={project.image} onChange={handleProjectChange} placeholder="Image URL" className={`block w-full mb-2 p-2 border rounded ${darkMode ? 'bg-neutral-800 text-neutral-100 border-neutral-700 placeholder-neutral-400' : ''}`} required />
        <input name="link" value={project.link} onChange={handleProjectChange} placeholder="Project Link" className={`block w-full mb-2 p-2 border rounded ${darkMode ? 'bg-neutral-800 text-neutral-100 border-neutral-700 placeholder-neutral-400' : ''}`} required />
        <select name="type" value={project.type} onChange={handleProjectChange} className={`block w-full mb-2 p-2 border rounded ${darkMode ? 'bg-neutral-800 text-neutral-100 border-neutral-700' : ''}`} required>
          <option value="Front-end">Front-end</option>
          <option value="web Design">web Design</option>
          <option value="Clones">Clones</option>
        </select>
        <button type="submit" className={`px-4 py-2 rounded ${darkMode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white'}`}>{editingId ? "Update Project" : "Upload Project"}</button>
        {editingId && (
          <button type="button" className={`ml-4 px-4 py-2 rounded ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-400 text-white'}`} onClick={() => { setEditingId(null); setProject({ title: "", description: "", image: "", link: "", type: "Front-end" }); }}>Cancel</button>
        )}
      </form>

      {/* Project List with Filter Buttons */}
      <div className="mb-8">
        <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-blue-300' : ''}`}>Projects</h3>
        <div className="flex justify-center gap-4 mb-4">
          {['All', 'Front-end', 'web Design', 'Clones'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-8 py-3 rounded-full font-semibold text-lg transition-all border-2 border-blue-500 focus:outline-none shadow-md ${filter === type ? (darkMode ? 'bg-blue-700 text-white' : 'bg-blue-600 text-white') : (darkMode ? 'bg-neutral-800 text-blue-400' : 'bg-white text-blue-600')}`}
              style={{ minWidth: '160px' }}
            >
              {type}
            </button>
          ))}
        </div>
        {(filter === 'All' ? projects : projects.filter(p => p.type === filter)).length === 0 ? (
          <p className={`${darkMode ? 'text-neutral-400' : 'text-gray-500'}`}>No projects found.</p>
        ) : (
          <ul>
            {(filter === 'All' ? projects : projects.filter(p => p.type === filter)).map((proj) => (
              <li key={proj._id} className={`mb-4 p-4 border rounded flex flex-col md:flex-row md:items-center justify-between ${darkMode ? 'bg-neutral-800 border-neutral-700 text-neutral-100' : 'bg-white border-gray-300 text-gray-900'}`}>
                <div>
                  <div className={`font-bold ${darkMode ? 'text-blue-300' : ''}`}>{proj.title}</div>
                  <div className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`}>{proj.description}</div>
                  <div className={`text-xs font-semibold mb-1 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>{proj.type}</div>
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>View</a>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button className={`px-3 py-1 rounded ${darkMode ? 'bg-yellow-600 text-white' : 'bg-yellow-500 text-white'}`} onClick={() => handleEditProject(proj)}>Edit</button>
                  <button className={`px-3 py-1 rounded ${darkMode ? 'bg-red-700 text-white' : 'bg-red-600 text-white'}`} onClick={() => handleDeleteProject(proj._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Admin Image Upload */}
      <form onSubmit={handleImageSubmit} className="mb-8">
        <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-green-300' : ''}`}>Update Admin Image</h3>
        <input type="text" value={adminImage} onChange={handleImageChange} placeholder="Image URL" className={`block w-full mb-2 p-2 border rounded ${darkMode ? 'bg-neutral-800 text-neutral-100 border-neutral-700 placeholder-neutral-400' : ''}`} required />
        {adminImage && (
          <div className="flex justify-center my-4">
            <img src={adminImage} alt="Admin Preview" style={{ width: '180px', height: '180px', objectFit: 'cover', borderRadius: '16px', border: darkMode ? '2px solid #22c55e' : '2px solid #22c55e' }} />
          </div>
        )}
        <button type="submit" className={`px-4 py-2 rounded ${darkMode ? 'bg-green-700 text-white' : 'bg-green-600 text-white'}`}>Update Image</button>
      </form>
      {/* Skills Update */}
      <form onSubmit={handleSkillsSubmit} className="mb-8">
        <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-purple-300' : ''}`}>Update Skills</h3>
        <input type="text" value={skills} onChange={handleSkillsChange} placeholder="Skills (comma separated)" className={`block w-full mb-2 p-2 border rounded ${darkMode ? 'bg-neutral-800 text-neutral-100 border-neutral-700 placeholder-neutral-400' : ''}`} required />
        <button type="submit" className={`px-4 py-2 rounded ${darkMode ? 'bg-purple-700 text-white' : 'bg-purple-600 text-white'}`}>Update Skills</button>
      </form>
  {status && <p className={`text-center mt-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{status}</p>}
    </div>
  );
};

export default AdminDashboard;
