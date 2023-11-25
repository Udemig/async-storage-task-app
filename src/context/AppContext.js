import React, {useContext, useState, useEffect} from 'react';
import showToast from '../utils/ToastUtils';

// Context API oluşturuldu!

const TaskContext = React.createContext();

const TaskProvider = ({children}) => {
  const [tasks, setTask] = useState([]);

  const addTask = newTask => {
    console.warn('addTask', newTask);
    showToast('success', 'New task added!');
    setTask([...tasks, newTask]);
  };

  const deleteTask = taskId => {
    showToast('success', 'New task deleted!');
    setTask(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const deleteAllTask = () => {
    setTask([]);
  };

  const updateTask = (taskId, data) => {
    setTask(prevTasks =>
      prevTasks.map(task => (task.id === taskId ? {...task, ...data} : task)),
    );
  };

  const contextValues = {
    tasks,
    addTask,
    deleteTask,
    updateTask,
    deleteAllTask,
  };

  useEffect(() => {}, []);

  return (
    <TaskContext.Provider value={contextValues}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useContext must be used with a TaskContext');
  }
  return context;
};

export default TaskProvider;
