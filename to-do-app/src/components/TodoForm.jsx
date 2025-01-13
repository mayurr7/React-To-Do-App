import React, { useState } from "react";

const TodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState({ content: "", checked: false });

  const handleInputChange = (event) => {
    setInputValue({
      ...inputValue,
      content: event.target.value, // Update only the content property
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Check if content is empty before adding the todo
    if (inputValue.content.trim()) {
      const newTodo = {
        id: Date.now(), // Unique ID
        content: inputValue.content,
        checked: inputValue.checked,
      };

      onAddTodo(newTodo); // Send the new todo to the parent component
      setInputValue({ content: "", checked: false }); // Reset the form
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="flex justify-center items-center m-11">
          <input
            type="text"
            className="border border-gray-800 p-3 rounded-lg w-96 text-black font-semibold placeholder-gray-500 focus:ring-offset-emerald-200 focus:ring-gray-800"
            autoComplete="off"
            placeholder="Add task..."
            value={inputValue.content} // Controlled value
            onChange={handleInputChange} // Update only content
          />
          <div>
            <button
              type="submit"
              className="w-24 h-10 bg-blue-500 text-white rounded-2xl hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
