import axios from "axios";
import API_URL from "../config";

export const fetchProjects = async (setProjects, setError) => {
  try {
    const response = await axios.get(`${API_URL}/protected/projects`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const { projects } = response.data;
    setProjects(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    setError("Failed to fetch projects. Please try again later.");
  }
};

export const addProject = async (
  newProjectName,
  newProjectStatus,
  setProjects,
  setError
) => {
  try {
    const response = await axios.post(
      `${API_URL}/protected/projects/new`,
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
    fetchProjects(setProjects, setError); // Fetch projects again to update the list
  } catch (error) {
    console.error("Error adding project:", error);
    setError("Failed to add project. Please try again later.");
  }
};

export const deleteProject = async (projectId, setProjects, setError) => {
  try {
    const response = await axios.delete(
      `${API_URL}/protected/project/${projectId}`,
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

export const updateProject = async (
  projectId,
  editProjectName,
  editProjectStatus,
  setProjects,
  setError
) => {
  try {
    const response = await axios.put(
      `${API_URL}/protected/projects/update/${projectId}`,
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
  } catch (error) {
    console.error("Error editing project:", error);
    setError("Failed to edit project. Please try again later.");
  }
};
