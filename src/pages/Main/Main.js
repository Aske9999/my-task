import React, {useState, useContext, useRef} from 'react';
import './Main.css'
import {TaskContext} from "../../context/TaskContext";
import TaskItem from "../../Components/TaskItem/TaskItem";

const Main = () => {
  const inputRef = useRef(null)
  const [taskText, setTaskText] = useState("")
  const {tasks, dispatch} = useContext(TaskContext)

  const changeTask = (e) => {
    setTaskText(e.target.value)
  }

  const addTask = () => {
    if (taskText.trim()){
      dispatch({type: "ADD_TASK", text: taskText})
    }
    setTaskText("")
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      addTask()
    } else if (e.key === 'Escape') {
      inputRef.current.blur()
      setTaskText("")
    }
  }

  const deleteAll = () => {
    if (window.confirm("Are you sure?")){
      dispatch({type: "DELETE_ALL"})
    }
  }

  const deleteChecked = () => {
    if (window.confirm("Are you sure?")){
      dispatch({type: "DELETE_CHECKED"})
    }
  }

  return (

    <div className="container mx-auto bg-slate-500 mt-10 py-4 px-6 border flex flex-wrap justify-center">
      <div className="text-indigo-400 text-xl py-4">Tasks ( <span className="text-white">{tasks.length}</span> )</div>
      <div className="container mx-auto py-4 px-6 flex justify-center">
        <input ref={inputRef} value={taskText} onKeyDown={handleKey} onChange={changeTask} className="w-2/4 border rounded-l-lg py-2 px-4"
               type="text"
               placeholder="Enter your task"/>
        <button disabled={!taskText} onClick={addTask} className="bg-green-400 rounded-r-lg py-2 px-10">ADD</button>
      </div>
      {
        tasks.map(task => {
          return (
       <TaskItem key={task.id} task={task}/>

          )
        })
      }
      <div className="mt-4 flex-grow text-right">
        <button onClick={deleteChecked} className="bg-red-500 rounded-lg py-2 px-4 mr-2">Delete checked</button>
        <button onClick={deleteAll} className="bg-red-500 rounded-lg py-2 px-4">Delete all</button>
      </div>
    </div>
  );
};

export default Main;