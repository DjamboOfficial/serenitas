import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthenticatedToDoList = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectStatus, setNewProjectStatus] = useState("");
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editProjectName, setEditProjectName] = useState("");
  const [editProjectStatus, setEditProjectStatus] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/protected/projects",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { projects } = response.data;
      setProjects(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to fetch projects. Please try again later.");
    }
  };

  const handleAddProject = async () => {
    if (!newProjectName || !newProjectStatus) {
      setError("Project name and status are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/protected/projects/new",
        {
          name: newProjectName,
          status: newProjectStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { message, projects } = response.data;
      console.log(message);
      console.log("Updated projects:", projects);
      setNewProjectName("");
      setNewProjectStatus("");
      setProjects(projects);
    } catch (error) {
      console.error("Error adding project:", error);
      setError("Failed to add project. Please try again later.");
    }
  };

  const handleInputChange = (e) => setNewProjectName(e.target.value);

  const handleDeleteProject = async (projectId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/protected/project/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { message, projects } = response.data;
      console.log(message);
      setProjects(projects); // Update the projects state after deletion
    } catch (error) {
      console.error("Error deleting project:", error);
      setError("Failed to delete project. Please try again later.");
    }
  };

  const handleEditClick = (projectId, name, status) => {
    setEditingProjectId(projectId);
    setEditProjectName(name);
    setEditProjectStatus(status);
  };

  const handleEditProject = async (projectId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/protected/projects/update/${projectId}`,
        {
          name: editProjectName,
          status: editProjectStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { message, project: updatedProject } = response.data;
      console.log(message);
      // Update the projects list to reflect the changes
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === updatedProject._id ? updatedProject : project
        )
      );
      // Reset editing state
      setEditingProjectId(null);
      setEditProjectName("");
      setEditProjectStatus("");
    } catch (error) {
      console.error("Error editing project:", error);
      setError("Failed to edit project. Please try again later.");
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "editProjectName") {
      setEditProjectName(value);
    } else if (name === "editProjectStatus") {
      setEditProjectStatus(value);
    }
  };

  const handleCancelEdit = () => {
    setEditingProjectId(null);
    setEditProjectName("");
    setEditProjectStatus("");
  };

  return (
    <>
      <h2>Your Projects:</h2>
      <input
        type="text"
        placeholder="Project Name"
        value={newProjectName}
        onChange={(e) => setNewProjectName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Project Status"
        value={newProjectStatus}
        onChange={(e) => setNewProjectStatus(e.target.value)}
      />
      <button onClick={handleAddProject}>Add Project</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <strong>Name:</strong> {project.name}, <strong>Status:</strong>{" "}
            {project.status},
            <button onClick={() => handleDeleteProject(project._id)}>
              Delete
            </button>
            <button
              onClick={() =>
                handleEditClick(project._id, project.name, project.status)
              }
            >
              Edit
            </button>
            {editingProjectId === project._id && (
              <div>
                <input
                  type="text"
                  name="editProjectName"
                  value={editProjectName}
                  onChange={handleEditInputChange}
                />
                <input
                  type="text"
                  name="editProjectStatus"
                  value={editProjectStatus}
                  onChange={handleEditInputChange}
                />
                <button onClick={() => handleEditProject(project._id)}>
                  Save
                </button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default AuthenticatedToDoList;
