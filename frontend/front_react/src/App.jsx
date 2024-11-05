import { useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "test1",
      completed: true,
    },
    {
      id: 2,
      text: "test2",
      completed: false,
    },
  ]);

  const [text, setText] = useState("");
  function addTask(text) {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
    setText("");
  }
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }
  function toggleCompleted(id) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      })
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        To-Do List
      </h1>
      <div className="todo-list max-w-md mx-auto bg-gray-50 p-6 rounded-lg shadow-lg space-y-4">
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
          />
        ))}
        <div className="flex items-center space-x-2 ">
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ajouter une tâche "
          />
          <button
            type="button"
            className="text-white bg-black  focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={() => addTask(text)}
          >
            Ajouter
          </button>
        </div>
      </div>
    </>
  );
}
export default App;
