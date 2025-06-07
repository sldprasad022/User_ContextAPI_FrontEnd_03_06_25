import React from 'react'
import AddUser from './components/User/AddUser'
import { Route, Routes } from 'react-router-dom'
import TotalUsers from './components/User/TotalUsers'
// import TotalUsersPagination from './components/User/TotalUsersPagination'
import TotalUsersPagination_2 from './components/pagination/TotalUsersPagination_2'
import TotalUsersPagination_1 from './components/pagination/TotalUsersPagination_1'
import TotalProductsImagesSkeleton from './components/pagination/TotalProductsImagesSkeleton'

const MainRoute = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<AddUser/>}/>
        <Route path='/allUsers' element={<TotalUsers/>}/>


        {/* <Route path='/totaluserspagination' element={<TotalUsersPagination/>} /> */}
        <Route path='/totaluserspagination1' element={<TotalUsersPagination_1/>} />
        <Route path='/totaluserspagination2' element={<TotalUsersPagination_2/>} />

        <Route path='/totalproductsskeleton' element={<TotalProductsImagesSkeleton/>} />
    </Routes>
    </>
  )
}

export default MainRoute