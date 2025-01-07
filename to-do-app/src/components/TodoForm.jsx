import React, { useState } from "react";

const TodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onAddTodo(inputValue);
    setInputValue("");
  };
  return (
    <>
      <form action="" onSubmit={handleFormSubmit}>
        <div className="flex justify-center items-center m-11">
          <input
            type="text"
            className="border border-gray-800 p-3 rounded-lg w-96 text-black  font-semibold placeholder-gray-500 focus:ring-offset-emerald-200 focus:ring-gray-800"
            autoComplete="off"
            placeholder="Add task..."
            value={inputValue}
            onChange={(event) => handleInputChange(event.target.value)}
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
