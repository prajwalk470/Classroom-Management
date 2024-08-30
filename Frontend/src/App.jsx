import {React, useState} from 'react'
import {Routes,Route, Navigate} from 'react-router-dom';
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
import Eceb from './Pages/ECE/ECb';
import CreateTable from './TimeTable/CreateTable';
import ShowTable from './TimeTable/ShowTable';
// import Ecec from './Pages/ECE/ECc';
// import Ecea from './Pages/ECE/ECa';
import Eced from './Pages/ECE/ECd';
// import ProtectedRoute from './Auth/AuthProvider'; 
const AuthenticatedRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" replace={true} state={{ from: window.location.pathname }} />
  );
};
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
  <Routes>
  <Route path='/' element={<LandPage />} />
  {/* <Route path='/login' element={<Login/>}/> */}
    <Route path='home' element={<Cse3 />} />
    {/* <Route path='/timetable' element={<Cse3 />} /> */}
    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
    <Route
          path="/ttcreate"
          element={<AuthenticatedRoute element={<CreateTable />} isAuthenticated={isAuthenticated} />}
    />
    <Route path='tt/CSE/A' element={<CSa />} />
    <Route path='tt/CSE/B' element={<CSb />} />
    <Route path='tt/CSE/C' element={<CSc />} />
    <Route path='tt/CSE/D' element={<CSd />} />
    {/* <Route path='tt/ECE/A' element={<Ecea />} /> */}
    <Route path='tt/ECE/B' element={<Eceb />} />
    {/* <Route path='tt/ECE/C' element={<Ecec />} /> */}
    <Route path='tt/ECE/D' element={<Eced />} />
    {/* <Route path='rooms/create' element={<CreateRoom />} /> */}
    {/* <Route path='rooms/details/:id' element={<ShowRoom />} />
    <Route path='rooms/delete/:id' element={<DeleteRoom />} />
    <Route path='rooms/edit/:id' element={<EditRoom />} /> */}
    {/* <Route path='/tt' element={<Timetable/>}/> */}
    <Route path='/ttshow' element={<ShowTable/>}/>
    {/* <Route path='/ttcreate' element={<CreateTable/>}/> */}
  <Route path='/register' element={<SignUp />} />
</Routes>

  )
}

export default App
