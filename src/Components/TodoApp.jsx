import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = async(e) => {
    e.preventDefault();
    if (task.trim()) {
      let response = await axios.post(`{process.env.REACT_APP_API_URL}/add`, { task: task }, { withCredentials: true });
      setTasks([...tasks, { id: response.data.TodoId, text: task, completed: false }]);
      setTask('');
    }
  };


  useEffect( () => {const fetchTodos = async () => {
    try {
      let response = await axios.get(`{process.env.REACT_APP_API_URL}/todos`, { withCredentials: true });
      setTasks(response.data.todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
  fetchTodos(); // Call the async function},[]);
  
  }, []);


  
  const handleToggleComplete = async (taskId,isChecked) => {
    await axios.put(`{process.env.REACT_APP_API_URL}/update`, { taskId, isChecked }, { withCredentials: true });
    setTasks(tasks.map(task => (task._id === taskId ? { ...task, isChecked: !task.isChecked } : task)));
  };

  const handleDeleteTask = async(taskId) => {
    await axios.delete(`{process.env.REACT_APP_API_URL}/delete`, {
      data: { taskId },
      withCredentials: true,
    });
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  const navigate = useNavigate();
  const handleLogout =async () => {
    // Handle logout logic here (e.g., clear tokens or navigate to login)
    let response = await axios.post(`{process.env.REACT_APP_API_URL}/logout`, {}, { withCredentials: true });
    if (response.status === 200) {
      console.log("User logged out");
      navigate('/login');
  }else{ 
    console.log("Logout failed");
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8 relative">
      {/* Logout Button at Top-Left */}
      <button
        onClick={handleLogout}
        className="absolute top-5 right-6 text-sm font-medium text-red-500 hover:text-red-400 border border-red-500 px-3 py-1 rounded-[5px]"
      >
        Logout
      </button>

      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
        {/* Header */}
        <div>
          <h2 className="text-center text-3xl font-bold text-white">
            Todo List
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Organize your tasks
          </p>
        </div>

        {/* Add Task Form */}
        <form className="space-y-6" onSubmit={handleAddTask}>
          <div className="space-y-4">
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 sm:text-sm"
                placeholder="Enter a new task"
              />
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-800"
          >
            Add Task
          </button>
        </form>

        {/* Task List */}
        <ul className="space-y-4 mt-6">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li
                key={task._id}
                className="flex justify-between items-center bg-gray-700 border border-gray-600 rounded-lg px-4 py-2"
              >
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={task.isChecked}
                    onChange={() => handleToggleComplete(task._id, task.isChecked)}
                    className="h-4 w-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                  />
                  <span className={`${task.isChecked ? 'line-through text-gray-500' : 'text-white'}`}>
                    {task.task}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="text-red-500 hover:text-red-400"
                >
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.707 4.707a1 1 0 00-1.414-1.414L4 4.586l-.707-.707A1 1 0 002.293 5.707l.707.707-.707.707a1 1 0 101.414 1.414L4 7.414l.707.707a1 1 0 001.414-1.414L5.414 6l.707-.707a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-400 text-center"><Link to="/login"/>No tasks added yet.<Link/></p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
