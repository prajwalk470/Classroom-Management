import React from 'react'
import {Routes,Route} from 'react-router-dom';
import CreateRoom from './Pages/CreateRom';
import DeleteRoom from './Pages/DeleteRom';
import EditRoom from './Pages/EditRom';
import ShowRoom from './Pages/ShowRoom';
import Home from './Pages/Hom';
import SignUp from './Auth/signUp';
import Login from './Auth/login';
import LandPage from './Pages/LandPage';
import Classrooms from './Pages/Classrooms';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LandPage/>} />
      <Route path='/login/rooms' element={<Home/>} />
      <Route path='/login/rooms/classrooms' element={<Classrooms/>} />
      <Route path='/register' element={<SignUp/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/rooms/create' element={<CreateRoom/>} />
      <Route path='/rooms/details/:id' element={<ShowRoom/>} />
      <Route path='/rooms/delete/:id' element={<DeleteRoom/>} />
      <Route path='/rooms/edit/:id' element={<EditRoom/>} />
    </Routes>
  )
}

export default App
