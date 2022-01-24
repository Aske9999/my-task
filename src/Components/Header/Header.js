import React, {useContext} from 'react';
import {TaskContext} from "../../context/TaskContext";

const Header = () => {
  const {tasks} = useContext(TaskContext)
  return (
    <div className="bg-slate-700">
<div className="container mx-auto px-10 py-6 flex justify-between items-center">
  <div className="text-fuchsia-400 font-bold text-3xl">MY task</div>
  <div className="text-indigo-400 text-xl">Total tasks ( <span className="text-white">{tasks.length}</span> )</div>
</div>
    </div>
  );
};

export default Header;