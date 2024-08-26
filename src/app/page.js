'use client';
import { useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const addTask = () => {
    if (!newTask.trim()) return;

    if (isEditing) {
      setTasks(
        tasks.map((task) =>
          task.id === currentTask.id ? { ...task, text: newTask } : task
        )
      );
      setIsEditing(false);
    } else {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
    }
    setNewTask('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (task) => {
    setIsEditing(true);
    setNewTask(task.text);
    setCurrentTask(task);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>
        <div className="mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a new task"
          />
          <button
            onClick={addTask}
            className="w-full mt-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600:border-solid"
          >
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
        </div>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-200 px-3 py-2 rounded"
            >
              <span>{task.text}</span>
              <div>
                <button
                  onClick={() => editTask(task)}
                  className="text-blue-500 hover:text-blue-700 mx-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <span></span>
      </div>
    </div>
  );
}
