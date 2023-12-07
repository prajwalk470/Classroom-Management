import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Spinner from '../Components/Spinner';
import {Link } from 'react-router-dom';
import { AiOutlineEdit} from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Sidebar from '../Components/Sdebar.jsx';
import { FaChalkboard } from 'react-icons/fa';

function Home() {
  const [rooms, setRooms] =useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true);
    axios.get('http://localhost:5555/rooms')
    .then((response)=>{
      setRooms(response.data.data);
      setLoading(false);
    })
    .catch((error)=>{
      console.log(error);
      setLoading(false);
    });
  },[]);
  return (

    <div className="mx-auto  flex">
      <Sidebar/>
      <div className=' mx-auto mt-8p-4'>
      <div className='flex justify-between items-center px-5'>
        <h1 className='text-3xl my-8 flex flex-row justify-center items-center'><FaChalkboard size={25} color="#007BFF" /><div className='px-3'>Class-Rooms</div></h1>
        <Link to='/rooms/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl'/>
        </Link>
      </div>
      {loading ? (
        <Spinner/>
      ) : (
        
        <table className="w-full border-separate border-spacing-2 border-2 border-gray-300 rounded-lg p-4">
        <thead>
          <tr>
            <th className="w-1/6 py-3 border border-slate-600 rounded-md">Room No.</th>
            <th className="w-1/6 py-3 border border-slate-600 rounded-md">Block</th>
            <th className="w-1/6 py-3 border border-slate-600 rounded-md">Floor</th>
            <th className="w-1/6 py-3 border border-slate-600 rounded-md">Branch</th>
            <th className="w-1/6 py-3 border border-slate-600 rounded-md">Year & Sem</th>
            <th className="w-1/6 py-3 border border-slate-600 rounded-md">Get TimeTable</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room._id} className="h-12">
              <td className="w-1/6 py-3 border border-slate-700 rounded-md text-center">
                {room.roomnumber}
              </td>
              <td className="w-1/6 py-3 border border-slate-700 rounded-md text-center">
                {room.block}
              </td>
              <td className="w-1/6 py-3 border border-slate-700 rounded-md text-center">
                {room.floor}
              </td>
              <td className="w-1/6 py-3 border border-slate-700 rounded-md text-center ">
                {room.branch}
              </td>
              <td className="w-1/6 py-3 border border-slate-700 rounded-md text-center ">
                {room.year_sem}
              </td>
              <td className="w-1/6 py-3 border border-slate-700 rounded-md text-center">
                <div className="flex justify-center gap-x-4 p-3">
                  <Link to={`/rooms/cse/3/A`}>
                    <BsInfoCircle className="text-2xl text-green-800" />
                  </Link>
                  {/* <Link to={`/rooms/edit/${room._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                  </Link>
                  <Link to={`/rooms/delete/${room._id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600" />
                  </Link> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      )}
    </div>
  </div>
  )
}
export default Home
