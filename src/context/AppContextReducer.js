import React, {useContext, useReducer} from 'react';
import showToast from '../utils/ToastUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageKey from '../constants/AsyncStorageKey';
// Context API oluşturuldu!

const initialState = {
  tasks: [],
  user: {
    firstName: 'Furkan',
    lastName: 'Türkyılmaz',
    linkedin: 'Furkan Türkyılmaz',
  },
};

// Store
const TaskContext = React.createContext(initialState);

const reducer = (state = {}, action) => {
  switch (action?.type) {
    case 'FETCH_TASK':
      return {...state, tasks: action?.payload};

    case 'ADD_TASK':
      const tasks = [...state?.tasks, action.payload];

      AsyncStorage.setItem(AsyncStorageKey.tasks, JSON.stringify(tasks));

      showToast('success', 'New task added!');

      return {...state, tasks};

    case 'DELETE_TASK':
      const tasksDelete = state?.task?.filter(
        task => task.id !== action.payload,
      );

      showToast('success', 'New task deleted!');

      AsyncStorage.setItem(AsyncStorageKey.tasks, JSON.stringify(tasksDelete));

      return {
        ...state,
        tasks: tasksDelete,
      };

    case 'UPDATE_TASK':
      const tasksUpdated = state?.tasks?.map(task =>
        task.id === action?.taskId ? {...task, ...action.payload} : task,
      );

      AsyncStorage.setItem(AsyncStorageKey.tasks, JSON.stringify(tasksUpdated));

      return {
        ...state,
        tasks: tasksUpdated,
      };

    case 'DELETE_ALL':
      AsyncStorage.setItem(JSON.stringify([]));

      return {
        ...state,
        tasks: [],
      };
    case 'UPDATE_USER':
      return {...state, user: action.payload};

    default:
      return state;
  }
};

const TaskProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TaskContext.Provider value={[state, dispatch]}>
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
