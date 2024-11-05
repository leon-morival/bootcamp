import React from "react";
export default function TodoItem({ task, deleteTask, toggleCompleted }) {
  function handleChange() {
    toggleCompleted(task.id);
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleChange}
          className="w-5 h-5 text-indigo-500 cursor-pointer"
        />
        <p
          className={`m-0 ${
            task.completed ? "text-gray-600" : "text-gray-800"
          }`}
        >
          {task.text}
        </p>
        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-600 px-5 text-lg cursor-pointer border-none bg-white font-bold"
        >
          X
        </button>
      </div>
      <hr className="flex-grow border-gray-300" />
    </>
  );
}
