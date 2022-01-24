import React from 'react';
import Header from "./Components/Header/Header";
import {Route, Routes} from "react-router-dom";
import Main from "./pages/Main/Main";
import TaskProvider from "./context/TaskContext";
import Footer from "./Components/Footer/Footer";

const App = () => {

  return (
    <div className="bg-slate-600 min-h-screen flex flex-col" >
    <main className="flex-grow">
      <TaskProvider>
        <Header/>
        <Routes>
          <Route path="/" element={<Main/>}/>
        </Routes>
      </TaskProvider>
    </main>
      <Footer/>
    </div>
  );
};

export default App;
