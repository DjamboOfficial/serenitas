import React, { useState } from "react";
import { useAuth } from "../contexts/authContext";

function AuthenticatedToDoList() {
  const { isLoggedIn } = useAuth();
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleAddProject = (e) => {
    e.preventDefault(); // Prevent form submission
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
      {!isLoggedIn && (
        <div className="todo-list-container">
          <form className="todo-form">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevent form submission
                  handleAddProject(e);
                }
              }}
              placeholder="Your tasks..."
            />
            <button type="button" onClick={handleAddProject}>
              Add
            </button>
          </form>
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
        </div>
      )}
      {isLoggedIn && <ToDoList />}
    </>
  );
}

export default AuthenticatedToDoList;
