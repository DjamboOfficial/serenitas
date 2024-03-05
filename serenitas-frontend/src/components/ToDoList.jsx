import { useState, useEffect } from "react";
import axios from "axios";

export const ToDoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const [token, setToken] = useState(""); // State to store the JWT token
  const [projects, setProjects] = useState(null);

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
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSubmit = (e) => {
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

  return (
    <>
      <div className="todo-list-container">
        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Your tasks..."
          />
          <button type="submit">Add</button>
        </form>
        {list.length > 0 && (
          <table className="todo-list">
            <thead>
              <tr>
                <th>Todo</th>
                <th>Item</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => (
                <tr className="todo-item" key={index}>
                  <td>{item}</td>
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
