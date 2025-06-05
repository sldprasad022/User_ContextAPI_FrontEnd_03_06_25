import { useState } from 'react'
import './App.css'
import MainRoute from './MainRoute'
import { ToastContainer} from "react-toastify";

function App() {
  
  return (
    <>
      <ToastContainer position='top-right' autoClose={3000}/>
     <MainRoute/>
    </>
  )
}

export default App
