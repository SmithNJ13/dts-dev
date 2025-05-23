import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [update, setUpdate] = useState({
    title: '',
    description: '',
    status: '',
    due_date: '',
  });
  const [confirm, setConfirm] = useState(false);
  const [taskID, setTaskID] = useState(null);

  async function updateTask(task_id) {
    try {
      const updatedData = {
        id: task_id,
        title: update.title,
        description: update.description,
        status: update.status,
        due_date: update.due_date ? update.due_date : tasks.find(task => task.id === task_id).due_date
      }
  
      const response = await axios.patch(`http://localhost:5433/`, updatedData);
      console.log("Task updated successfully", response.data);
      setUpdate({
        title: '',
        description: '',
        status: '',
        due_date: '01-01-00',
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(selection) {
    if (selection === 'yes' && taskID) {
      try {
        await axios.delete(`http://localhost:5433/${taskID}`);
        console.log('Task deleted');
        setConfirm(false);
        setTaskID(null);
      } catch (error) {
        console.log({ error: error });
      }
    } else {
      setConfirm(false);
    }
  }

  useEffect(() => {
    async function getTasks() {
      try {
        const response = await axios.get('http://localhost:5433/');
        const data = response.data;
        if (data) {
          setTasks(data.Task);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
    getTasks();
  }, [confirm, update]);

  const handleUpdateClick = (task) => {
    setTaskID(task.id);
    setUpdate({
      title: task.title,
      description: task.description,
      status: task.status,
      due_date: task.due_date,
    });
  };

  return (
    <div className="flex flex-col h-screen">
      {!update.title && !confirm && (
        <div className="flex flex-wrap gap-8 justify-evenly h-screen p-8 pb-[20%] overflow-y-scroll">
          {tasks.map((task) => (
            <div
              key={task.id}
              id={task.id}
              className="flex flex-col gap-4 bg-gray-300 rounded p-4 w-72 h-92 border-black border-2"
            >
              <div className="flex flex-row justify-between">
                <h1 className="text-2xl text-center">{task.title}</h1>
                <button
                  className="bg-red-400 rounded-full flex h-6 w-6 text-sm font-bold items-center text-center justify-center p-2 border-transparent border-1 hover:border-black hover:cursor-pointer"
                  onClick={() => {
                    setTaskID(task.id);
                    setConfirm(true);
                  }}
                >
                  X
                </button>
              </div>
              <p
                className={`text-center font-bold ${
                  task.status === 'incomplete'
                    ? 'text-red-600'
                    : task.status === 'in progress'
                    ? 'text-yellow-600'
                    : 'text-green-600'
                }`}
              >
                {task.status}
              </p>
              <p>Posted: {task.postDate}</p>
              <p className="text-end">Due: {task.due_date}</p>
              <div className="bg-white flex-1 w-full text-start p-2 overflow-y-scroll max-h-32">
                <p>{task.description}</p>
              </div>
              <button
                className="hover:cursor-pointer hover:font-bold hover:text-white w-32 h-8 bg-green-600 rounded-full p-1 self-center"
                onClick={() => handleUpdateClick(task)}
              >
                Update
              </button>
            </div>
          ))}
        </div>
      )}

      {update.title && (
        <div className="flex flex-col items-center">
          <div className="bg-white w-[400px] h-max p-8 rounded">
            <h1 className="text-black text-4xl underline text-center m-8">Update Task</h1>
            <form
              className="max-w-sm mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                updateTask(taskID);
              }}
            >
              <div className="mb-5">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Title:
                </label>
                <input
                  id="title"
                  type="text"
                  value={update.title}
                  onChange={(e) => setUpdate({ ...update, title: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description:
                </label>
                <textarea
                  id="description"
                  value={update.description}
                  onChange={(e) => setUpdate({ ...update, description: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-[150px] p-2.5 resize-none"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Status:
                </label>
                <select
                  id="status"
                  value={update.status}
                  onChange={(e) => setUpdate({ ...update, status: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="in progress">In Progress</option>
                  <option value="complete">Complete</option>
                </select>
              </div>
              <div className="mb-5">
                <label htmlFor="due_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Due Date:
                </label>
                <input
                  id="due_date"
                  type="date"
                  value={update.due_date.split('T')[0]}
                  onChange={(e) => setUpdate({ ...update, due_date: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <button
                type="submit"
                className="text-white bg-green-700 hover:bg-green-600 hover:cursor-pointer focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      )}

      {confirm && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center w-96">
            <h2 className="text-xl font-bold">Are you sure you want to delete?</h2>
            <p>Do you want to delete the task?</p>
            <div className="mt-4 flex justify-around">
              <button
                onClick={() => handleDelete('yes')}
                className="bg-red-500 text-white px-4 py-2 rounded border-transparent border-1 hover:border-black hover:cursor-pointer"
              >
                Yes
              </button>
              <button
                onClick={() => handleDelete('no')}
                className="bg-gray-500 text-white px-4 py-2 rounded border-transparent border-1 hover:border-black hover:cursor-pointer"
              > No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;
