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
        "https://serenitas.onrender.com/protected/projects",
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

  const handleAddProject = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!newProjectName || !newProjectStatus) {
      setError("Project name and status are required.");
      return;
    }
    if (!newProjectName || !newProjectStatus) {
      setError("Project name and status are required.");
      return;
    }

    try {
      const response = await axios.post(
        "https://serenitas.onrender.com/protected/projects/new",
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
      setProjects(projects); // Update the projects state with the new data
      fetchProjects();
      setNewProjectName("");
      setNewProjectStatus("");

      console.log(projects);
    } catch (error) {
      console.error("Error adding project:", error);
      setError("Failed to add project. Please try again later.");
    }
  };

  const handleInputChange = (e) => setNewProjectName(e.target.value);

  const handleDeleteProject = async (projectId) => {
    try {
      const response = await axios.delete(
        `https://serenitas.onrender.com/protected/project/${projectId}`,
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
        `https://serenitas.onrender.com/protected/projects/update/${projectId}`,
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

/*


            <div className="auth-table-project-container">
              {projects.map((project, index) => (
                <div className="auth-table-row-and-edit">
                  <div className="auth-project-row">
                    <li className="auth-project-table-row" key={index}>
                      <h1>Name:</h1> <p>{project.name}</p> <h1>Status:</h1>{" "}
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
                    
                  <div className="auth-table-project-container">

                  
            </div>
          

*/
