import React from 'react'
import AddUser from './components/User/AddUser'
import { Route, Routes } from 'react-router-dom'
import TotalUsers from './components/User/TotalUsers'

const MainRoute = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<AddUser/>}/>
        <Route path='/allUsers' element={<TotalUsers/>}/>
    </Routes>
    </>
  )
}

export default MainRoute