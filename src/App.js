import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import "./App.css"
import Register from './pages/Register'
import Login from "./pages/Login";
import Home from './pages/Home';

const App = () => {
  console.log("app js",process.env.REACT_APP_SOURCE);
  return (
    <div className='App'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
