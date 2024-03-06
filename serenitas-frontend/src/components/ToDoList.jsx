import { useState, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import axios from "axios";

export const ToDoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const { isLoggedIn, projects, setProjects, userId, setUserId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user's projects
        const response = await axios.get(
          "http://localhost:3000/user/projects",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const userId = response.data._id; // Convert ObjectID to string
        const userProjects = response.data.projects; // Extract projects from the response
        console.log(response.data);
        setUserId(userId); // Update userId state with the fetched value
        setProjects(userProjects); // Update projects state with the fetched value
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, setProjects, setUserId]);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleDelete = async (projectName) => {
    try {
      // Send DELETE request to delete the project
      await axios.delete(
        `http://localhost:3000/user/projects/65e7362c7fc066db469d5c77/projects/New`
      );
      // Update projects state after deletion
      setProjects(projects.filter((project) => project.name !== projectName));
      console.log("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

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
                  <td>{project.status}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleSave(project._id, newStatus || project.status)
                      }
                    >
                      Save
                    </button>
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
