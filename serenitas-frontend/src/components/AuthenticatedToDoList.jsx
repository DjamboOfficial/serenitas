import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../config";

import {
  fetchProjects,
  addProject,
  deleteProject,
  updateProject,
} from "../utils/projectAPI";

const AuthenticatedToDoList = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectStatus, setNewProjectStatus] = useState("");
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editProjectName, setEditProjectName] = useState("");
  const [editProjectStatus, setEditProjectStatus] = useState("");
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetchProjects(setProjects, setError);
    setUsername(username);
  }, []);

  const handleAddProject = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!newProjectName || !newProjectStatus) {
      setError("Project name and status are required.");
      return;
    }

    try {
      await addProject(newProjectName, newProjectStatus, setProjects, setError);
      setNewProjectName("");
      setNewProjectStatus("");
    } catch (error) {
      console.error("Error adding project:", error);
      setError("Failed to add project. Please try again later.");
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId, setProjects, setError);
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
      await updateProject(
        projectId,
        editProjectName,
        editProjectStatus,
        setProjects,
        setError
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

  const handleCancelEdit = () => {
    setEditingProjectId(null);
    setEditProjectName("");
    setEditProjectStatus("");
  };

  const handleInputChange = (e) => setNewProjectName(e.target.value);

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "editProjectName") {
      setEditProjectName(value);
    } else if (name === "editProjectStatus") {
      setEditProjectStatus(value);
    }
  };

  return (
    <>
      <div className="auth-todo-list-container">
        <h2>Your Projects:</h2>
        <form className="auth-todo-form">
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
          <button className="auth-button" onClick={handleAddProject}>
            Add
          </button>
        </form>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <table className="auth-project-table">
          <tbody>
            {projects &&
              projects.length > 0 &&
              projects.map((project, index) => (
                <div className="auth-table-project-and-edit" key={index}>
                  <div className="auth-project-table-row">
                    <li className="auth-project-row">
                      <h1>Name</h1>
                      <p>{project.name}</p>
                      <h1>Status</h1>
                      <p>{project.status}</p>
                      <button
                        className="auth-button"
                        onClick={() => handleDeleteProject(project._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="auth-button"
                        onClick={() =>
                          handleEditClick(
                            project._id,
                            project.name,
                            project.status
                          )
                        }
                      >
                        Edit
                      </button>
                    </li>
                  </div>
                  {editingProjectId === project._id && (
                    <div className="auth-table-edit">
                      <input
                        type="text"
                        name="editProjectName"
                        value={editProjectName}
                        onChange={handleEditInputChange}
                        placeholder="Edit name..."
                      />
                      <input
                        type="text"
                        name="editProjectStatus"
                        value={editProjectStatus}
                        onChange={handleEditInputChange}
                        placeholder="Edit status..."
                      />
                      <button
                        className="auth-little-button"
                        onClick={() => handleEditProject(project._id)}
                      >
                        Save
                      </button>
                      <button
                        className="auth-little-button"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AuthenticatedToDoList;
