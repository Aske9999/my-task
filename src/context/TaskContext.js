import React, {createContext, useReducer} from 'react';
import {nanoid} from "nanoid";
export const TaskContext = createContext()

const saveLS = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

const taskReducer = (state, action) => {
  let newState

  switch (action.type) {

    case "ADD_TASK":
      const newTask = {
        id: nanoid(),
        createdAt: Date.now(),
        text: action.text.trim(),
        isChecked: false,
        category: action.category
      }
      newState = action.order > 0 ? [...state, newTask] : [newTask, ...state]
      saveLS(newState)
      return newState

    case "SORT_TASK":
      newState = [...state].sort((a, b) => {
        return action.order > 0 ? b.createdAt - a.createdAt : a.createdAt - b.createdAt
      })
      saveLS(newState)
      return newState

    case "DELETE_TASK":
      newState = state.filter(task => task.id !== action.id)
      saveLS(newState)
      return newState

    case "UPDATE_TASK":
      newState = state.map(item => item.id === action.id ? {...item, text: action.text} : item)
      saveLS(newState)
      return newState

    case "DELETE_ALL":
      saveLS([])
      return []

    case "CHECKED":
      newState = state.map(item => item.id === action.id ? {...item, isChecked: action.isChecked} : item)
      saveLS(newState)
      return newState

    case "DELETE_CHECKED":
      newState = state.filter(item => !item.isChecked)
      saveLS(newState)
      return newState

    default:
      return state
  }
}

const TaskProvider = ({children}) => {
  const [tasks, dispatch] = useReducer(taskReducer, JSON.parse(localStorage.getItem('tasks')) || [])

  return (
    <TaskContext.Provider value={{tasks, dispatch}}>
      {children}
    </TaskContext.Provider>
  )
}

export default TaskProvider