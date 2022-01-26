import React, {useState, useContext, useRef} from 'react';
import './Main.css'
import {TaskContext} from "../../context/TaskContext";
import TaskItem from "../../Components/TaskItem/TaskItem";

const Main = () => {
  const inputRef = useRef(null)
  const [taskText, setTaskText] = useState("")
  const [order, setOrder] = useState(1)
  const {tasks, dispatch} = useContext(TaskContext)
  const [taskSelect, setTaskSelect] = useState("")
  const [sortCategory, setSortCategory] = useState("All")

  const changeTask = (e) => {
    setTaskText(e.target.value)
  }

  const changeSelect = (e) => {
    setTaskSelect(e.target.value)
  }

  const addTask = () => {
    setSortCategory(taskSelect)
    if (taskText.trim()) {
      dispatch({type: "ADD_TASK", text: taskText, order, category: taskSelect})
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
    if (window.confirm("Are you sure?")) {
      dispatch({type: "DELETE_ALL"})
    }
  }

  const deleteChecked = () => {
    if (window.confirm("Are you sure?")) {
      dispatch({type: "DELETE_CHECKED"})
    }
  }

  const sortTasks = () => {
    dispatch({type: "SORT_TASK", order})
    setOrder(order * -1)
  }

  const sortByCategoryName = (e) => {
    setSortCategory(e.target.value)
  }

  return (

    <div className="container mx-auto bg-slate-500 mt-10 py-4 px-6 border flex flex-wrap justify-center">
      <div className="text-indigo-400 text-xl py-4">
        Tasks List ( <span className="text-white">{tasks.length}</span> )
        <select value={sortCategory} onChange={sortByCategoryName} className="rounded-lg py-2 px-2 ml-4">
          <option value="All">All</option>
          {
            tasks
              .map(task => task.category)
              .filter((item, idx, arr) => arr.indexOf(item) === idx)
              .map(item => {
                return <option value={item}>{item}</option>
              })
          }
        </select>
      </div>
      <div className="container mx-auto py-4 px-6 flex justify-center">
        <input onChange={changeSelect} className="rounded-lg py-2 px-4 mr-4"
               placeholder="Categories"
               type="text"
               list="categories"
        />
        <datalist id="categories">
          <option value="Jobs"/>
          <option value="Meeting"/>
          <option value="Shopping"/>
          <option value="Lessons"/>
        </datalist>
        <input ref={inputRef} value={taskText} onKeyDown={handleKey} onChange={changeTask}
               className="w-2/4 border rounded-l-lg py-2 px-4"
               type="text"
               placeholder="Enter your task"/>
        <button disabled={!taskText} onClick={addTask}
                className="bg-green-500 hover:bg-green-900 text-white rounded-r-lg py-2 px-20">ADD
        </button>
      </div>
      {
        tasks
          .filter(item => item.category === sortCategory || sortCategory === 'All')
          .map(task => {
            return (
              <TaskItem key={task.id} task={task}/>
            )
          })
      }
      <div className="mt-4 flex-grow text-right">
        <button onClick={sortTasks} className="bg-yellow-700 hover:bg-yellow-900 text-white rounded-lg py-2 px-4 mr-2">
          Sort by date {order > 0 ? <>&#9660;</> : <>&#9650;</>}
        </button>
        {/*<select className="bg-yellow-700 hover:bg-yellow-900 text-white rounded-lg py-2 px-4 mr-2">*/}
        {/*  <option onClick={sortTasks} value="">Sort by date</option>*/}
        {/*  <option value="">Sort by name</option>*/}
        {/*</select>*/}
        <button onClick={deleteChecked}
                className="bg-green-700 hover:bg-green-900 text-white rounded-lg py-2 px-4 mr-2">Delete checked
        </button>
        <button onClick={deleteAll} className="bg-red-600 hover:bg-red-900 text-white rounded-lg py-2 px-4">Delete all
        </button>
      </div>
    </div>
  );
};

export default Main;