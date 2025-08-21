import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const AdminDashboard = () => {
  // State for project form
  const [project, setProject] = useState({ title: "", description: "", image: "", link: "" });
  // State for all projects
  const [projects, setProjects] = useState([]);
  // State for editing
  const [editingId, setEditingId] = useState(null);
  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
  const res = await fetch(`${API_URL}/api/admin/projects`);
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
        ? `${API_URL}/api/admin/projects/${editingId}`
        : `${API_URL}/api/admin/projects`;
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
    });
    setEditingId(proj._id);
  };

  // Delete project
  const handleDeleteProject = async (id) => {
    setStatus("");
    try {
  const res = await fetch(`${API_URL}/api/admin/projects/${id}`, {
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
  const res = await fetch(`${API_URL}/api/admin/profile`, {
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
  const res = await fetch(`${API_URL}/api/admin/skills`, {
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

  return (
    <div className="max-w-3xl mx-auto p-8 mt-10 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h2>
      {/* Project Upload/Edit Form */}
      <form onSubmit={handleProjectSubmit} className="mb-8">
        <h3 className="text-lg font-semibold mb-2">{editingId ? "Edit Project" : "Upload New Project"}</h3>
        <input name="title" value={project.title} onChange={handleProjectChange} placeholder="Title" className="block w-full mb-2 p-2 border rounded" required />
        <input name="description" value={project.description} onChange={handleProjectChange} placeholder="Description" className="block w-full mb-2 p-2 border rounded" required />
        <input name="image" value={project.image} onChange={handleProjectChange} placeholder="Image URL" className="block w-full mb-2 p-2 border rounded" required />
        <input name="link" value={project.link} onChange={handleProjectChange} placeholder="Project Link" className="block w-full mb-2 p-2 border rounded" required />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{editingId ? "Update Project" : "Upload Project"}</button>
        {editingId && (
          <button type="button" className="ml-4 px-4 py-2 bg-gray-400 text-white rounded" onClick={() => { setEditingId(null); setProject({ title: "", description: "", image: "", link: "" }); }}>Cancel</button>
        )}
      </form>

      {/* Project List */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Projects</h3>
        {projects.length === 0 ? (
          <p className="text-gray-500">No projects found.</p>
        ) : (
          <ul>
            {projects.map((proj) => (
              <li key={proj._id} className="mb-4 p-4 border rounded flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <div className="font-bold">{proj.title}</div>
                  <div className="text-sm text-gray-600">{proj.description}</div>
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm">View</a>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button className="px-3 py-1 bg-yellow-500 text-white rounded" onClick={() => handleEditProject(proj)}>Edit</button>
                  <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => handleDeleteProject(proj._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Admin Image Upload */}
      <form onSubmit={handleImageSubmit} className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Update Admin Image</h3>
        <input type="text" value={adminImage} onChange={handleImageChange} placeholder="Image URL" className="block w-full mb-2 p-2 border rounded" required />
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Update Image</button>
      </form>
      {/* Skills Update */}
      <form onSubmit={handleSkillsSubmit} className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Update Skills</h3>
        <input type="text" value={skills} onChange={handleSkillsChange} placeholder="Skills (comma separated)" className="block w-full mb-2 p-2 border rounded" required />
        <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">Update Skills</button>
      </form>
      {status && <p className="text-center text-green-600 mt-4">{status}</p>}
    </div>
  );
};

export default AdminDashboard;
