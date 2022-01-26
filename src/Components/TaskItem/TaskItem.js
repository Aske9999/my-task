import React, {useContext, useState} from 'react';
import {TaskContext} from "../../context/TaskContext";

const TaskItem = ({task}) => {
  const {dispatch} = useContext(TaskContext)
  const [edit, setEdit] = useState(false)
  const [newText, setNewText] = useState(task.text)

  const saveTask = (id) => {
    dispatch({type: "UPDATE_TASK", id: task.id, text: newText})
    setEdit(false)
  }

  const deleteTask = (id) => {
    dispatch({type: "DELETE_TASK", id})
  }

  return (
    <div key={task.id}
         className="task container mx-auto flex justify-between py-4 px-6 mb-2 border-2 border-dashed border-yellow-500">
      <div className="flex items-center">
        <input onChange={(e) => dispatch({type: "CHECKED", id: task.id, isChecked: e.target.checked})} className="mr-2" type="checkbox"/>
        <div className="text-amber-200">
          {
            edit
              ? <input value={newText} onChange={(e) => setNewText(e.target.value)} className="text-black" type="text"/>
              : <div>{task.text} ({new Date(task.createdAt).toLocaleTimeString('ru-RU')})</div>
          }
        </div>
      </div>
      <div>
        {
          edit
          ? <button onClick={saveTask} className="bg-blue-500 hover:bg-blue-900 rounded-lg py-2 px-10 mr-2">Save</button>
            :         <button onClick={() => setEdit(true)} className="bg-blue-500 hover:bg-blue-900 rounded-lg py-2 px-10 mr-2">Edit</button>

        }
        <button onClick={() => deleteTask(task.id)} className="bg-red-500 hover:bg-red-900 rounded-lg py-2 px-10">Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;