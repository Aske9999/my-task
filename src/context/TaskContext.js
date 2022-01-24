import React, {createContext, useReducer} from 'react';
import {nanoid} from "nanoid";
export const TaskContext = createContext()

const taskReducer = (state, action) => {
  switch (action.type) {

    case "ADD_TASK":
      const newTask = {
        id: nanoid(),
        text: action.text.trim(),
        isChecked: false,
      }
      return [...state, newTask]

    case "DELETE_TASK":
      return state.filter(task => task.id !== action.id)

    case "UPDATE_TASK":
      return state.map(item => item.id === action.id ? {...item, text: action.text} : item)

    case "DELETE_ALL":
      return []

    case "CHECKED":
      return state.map(item => item.id === action.id ? {...item, isChecked: action.isChecked} : item)

    case "DELETE_CHECKED":
      return state.filter(item => !item.isChecked)

    default:
      return state
  }
}

const TaskProvider = ({children}) => {
  const [tasks, dispatch] = useReducer(taskReducer,[])

  return (
    <TaskContext.Provider value={{tasks, dispatch}}>
      {children}
    </TaskContext.Provider>
  )
}

export default TaskProvider