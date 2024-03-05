import { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import axios from "axios";

export const ToDoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const { isLoggedIn, projects, setProjects } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:3000/projects", {
          // Add headers containing the JWT token for authentication
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Extract projects from the response data
        const { projects } = response.data;
        setProjects(projects);
        console.log(projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    if (isLoggedIn) {
      fetchProjects();
    }
  }, [isLoggedIn, setProjects]);

  // Inside your component

  const handleSave = async (projectId, newStatus) => {
    try {
      // Send a PUT request to update the project's status
      await axios.put(`http://localhost:3000/projects/${projectId}`, {
        status: newStatus,
      });
      console.log("Project updated successfully");
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleInputChange = (e) => setInputValue(e.target.value);

  /* const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setList([...list, inputValue]);
      setInputValue("");
    }
  };

  const handleDelete = (index) => {
    const updatedList = list.filter((_, i) => i !== index);
    setList(updatedList);
  };
*/

  return (
    <>
      <div className="todo-list-container">
        <form className="todo-form">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Your tasks..."
          />
          <button type="submit">Add</button>
        </form>
        {isLoggedIn && projects.length > 0 && (
          <table className="todo-list">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr className="todo-item" key={index}>
                  <td>{project.name}</td>
                  <td contentEditable>{project.status}</td>
                  <td>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!isLoggedIn && (
          <table className="todo-list">
            <thead>
              <tr>
                <th>Your Tasks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((task, index) => (
                <tr className="todo-item" key={index}>
                  <td>{task}</td>
                  <td>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
