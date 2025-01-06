import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");

  const [task, setTask] = useState([]);

  const [dateTime, setDateTime] = useState("");

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!inputValue) {
      return;
    }

    if (task.includes(inputValue)) {
      setInputValue("");
      return;
    }

    setTask((prevTask) => [...prevTask, inputValue]);

    setInputValue("");
  };

  //Todo Date and Time

  

  


  useEffect(() => {
    const interval = setInterval (() => {

      const now = new Date();
      const formatedDate = now.toLocaleDateString();
       const formatedTime = now.toLocaleTimeString();
  
      setDateTime(`${formatedDate}-${formatedTime}`)
    },1000);

    return () => clearInterval(interval);
  }, []);

  //delete todo function
  const handleDeleteTodo = (value) => {
   
    const updateTask = task.filter((currEle) => currEle != value);
    setTask(updateTask);
  }

//clear all function
  const handleClearAll = () => {
    setTask([]);
  }

 

  return (
    <>
      <section>
        <header className="inline text-center text-4xl font-bold ">
          <h1 className="text-fuchsia-100">Todo List</h1>

          <h2 className="text-fuchsia-100 font-normal p-6 text-lg">{dateTime}</h2>
        </header>

 
        <section>
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
        </section>

        <section>
          <ul>
            {task.map((currTask, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center space-x-4 my-2 justify-center font-medium text-xl"
                >
                  <li
                    key={index}
                    className="flex items-center space-x-2 my-2 bg-slate-300 rounded-lg w-96 h-8  justify-center"
                  >
                    <span>{currTask}</span>
                  </li>
                  <button className="text-green-500 hover:text-green-700" >
                    <FaCheck />
                  </button>
                  <button className="text-red-500 hover:text-red-700"  onClick={() => handleDeleteTodo(currTask)}>
                    <MdDelete />
                  </button>
                </div>
              );
            })}
          </ul>
        </section>

        <div className="flex justify-center items-center text-white px-4 py-2 rounded">
          <button className="rounded-2xl border-red-800 bg-red-400 w-28 h-10 hover:bg-red-700 my-9 " onClick={handleClearAll}>Clear All</button>
        </div>
      </section>
    </>
  );
};

export default Todo;
