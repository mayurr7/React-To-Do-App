import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import TodoForm from "./TodoForm";

const Todo = () => {
  const [task, setTask] = useState(() => {
    const savedTasks = localStorage.getItem("reactTodo");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    localStorage.setItem("reactTodo", JSON.stringify(task));
  }, [task]);

  const handleFormSubmit = (inputValue) => {
    const { id, content, checked } = inputValue;
    if (!content) return;

    const ifTodoContentMatched = task.find(
      (currTask) => currTask.content === content
    );

    if (ifTodoContentMatched) return;

    setTask((prevTask) => [...prevTask, { id, content, checked }]);
  };
  

 

 
  // Delete todo function
  const handleDeleteTodo = (id) => {
    const updatedTask = task.filter((currTask) => currTask.id !== id);
    setTask(updatedTask);
  };

  // Clear all function
  const handleClearAll = () => {
    setTask([]);
  };

   // Todo Date and Time
   useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formatedDate = now.toLocaleDateString();
      const formatedTime = now.toLocaleTimeString();

      setDateTime(`${formatedDate} - ${formatedTime}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  // Toggle checked status and color
  const handleToggleChecked = (id) => {
    setTask((prevTask) =>
      prevTask.map((currTask) =>
        currTask.id === id
          ? {
              ...currTask,
              checked: !currTask.checked, // Toggle checked status
            }
          : currTask
      )
    );
  };

  return (
    <>
      <section>
        <header className="inline text-center text-4xl font-bold ">
          <h1 className="text-fuchsia-100">Todo List</h1>
          <h2 className="text-fuchsia-100 font-normal p-6 text-lg">
            {dateTime}
          </h2>
        </header>

        <section>
          <TodoForm onAddTodo={handleFormSubmit} />
        </section>

        <section>
          <ul>
            {task.map((currTask) => {
              return (
                <div
                  key={currTask.id} // Use unique id as key
                  className="flex items-center space-x-4 my-2 justify-center font-medium text-xl"
                >
                  <li
                    className={`flex items-center space-x-2 my-2 bg-slate-300 rounded-lg w-96 h-8 justify-center ${
                      currTask.checked
                        ? "line-through text-red-600" // Apply strikethrough and red color when checked
                        : "text-black"
                    }`} // Default text color if not checked
                  >
                    <span>{currTask.content}</span> {/* Render content */}
                  </li>
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={() => handleToggleChecked(currTask.id)} // Toggle checked status
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteTodo(currTask.id)} // Delete task by id
                  >
                    <MdDelete />
                  </button>
                </div>
              );
            })}
          </ul>
        </section>

        <div className="flex justify-center items-center text-white px-4 py-2 rounded">
          <button
            className="rounded-2xl border-red-800 bg-red-400 w-28 h-10 hover:bg-red-700 my-9 "
            onClick={handleClearAll}
          >
            Clear All
          </button>
        </div>
      </section>
    </>
  );
};

export default Todo;
