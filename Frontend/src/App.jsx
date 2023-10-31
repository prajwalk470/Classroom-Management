import React from 'react'
import {Routes,Route} from 'react-router-dom';
import CreateRoom from './Pages/Rooms/CreateRom';
import DeleteRoom from './Pages/Rooms/DeleteRom';
import EditRoom from './Pages/Rooms/EditRom';
import ShowRoom from './Pages/Rooms/ShowRoom';
import Home from './Pages/Hom';
import SignUp from './Auth/signUp';
import Login from './Auth/login';
import LandPage from './Pages/LandPage';
import Cse3 from './Pages/CSE/cse3';
import CSa from './Pages/CSE/CSa';
import CSb from './Pages/CSE/CSb';
import CSc from './Pages/CSE/CSc';
import CSd from './Pages/CSE/CSd';


const App = () => {
  return (
    <Routes>
  <Route path='/' element={<LandPage />} />
  <Route path='/login' element={<Login />}/>
    <Route path='rooms' element={<Home />} /> 
    <Route path='rooms/cse/3' element={<Cse3 />} />
    <Route path='rooms/cse/3/A' element={<CSa />} />
    <Route path='rooms/classrooms/cse/3/B' element={<CSb />} />
    <Route path='rooms/classrooms/cse/3/C' element={<CSc />} />
    <Route path='rooms/classrooms/cse/3/D' element={<CSd />} />
    <Route path='rooms/create' element={<CreateRoom />} />
    <Route path='rooms/details/:id' element={<ShowRoom />} />
    <Route path='rooms/delete/:id' element={<DeleteRoom />} />
    <Route path='rooms/edit/:id' element={<EditRoom />} />
  <Route path='/register' element={<SignUp />} />
</Routes>

  )
}

export default App
