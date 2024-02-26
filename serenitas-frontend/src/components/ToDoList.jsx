import { useState } from "react";

export const ToDoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const [item, setItem] = useState([]);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (inputValue.trim() !== "") {
      setList([...list, inputValue]); // Append new item to the list
      setInputValue(""); // Clear the input field after adding the item
    }
  };

  const handleDelete = (index) => {
    // Filter out the item with the specified index
    const updatedList = list.filter((_, i) => i !== index);
    setList(updatedList);
  };

  return (
    <>
      <div className="todo-list-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Your tasks..."
          />
          <button type="submit">Add</button> {/* Add a submit button */}
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
