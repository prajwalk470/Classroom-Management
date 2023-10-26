import React, { useEffect, useState } from 'react'
import BackButton from '../Components/BackButton';
import Spinner from '../Components/Spinner';
import axios from 'axios';
import mongoose from 'mongoose';
import { useNavigate, useParams } from 'react-router-dom';
// import { useSnackbar } from 'notistack';

const EditRoom = ()=> {
  const [roomnumber, setRoomnumber]= useState('');
  const [block, setBlock]= useState('');
  const [floor, setFloor]= useState('');
  const [branch, setBranch]= useState('');
  const [loading, setLoading]= useState(false);
  const navigate= useNavigate();
  const {id} = useParams();
  // const { enqueueSnackbar } = useSnackbar();

  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:5555/rooms/${id}`)
    .then((response)=>{
      if (response.data) {
        setRoomnumber(response.data.roomnumber);
        setBlock(response.data.block);
        setFloor(response.data.floor);
        setBranch(response.data.branch);
        setLoading(false);
      } else {
        // Handle the case where res.data is null or undefined
        console.error('No data received from the server.');
        setLoading(false);
      }
    })
    .catch((error)=>{
      setLoading(false);
      alert('An alert happened. Please check console..');
      console.log(error);
    });
  }, [])
  // const objectId = mongoose.Types.ObjectId(id);
  // const {_id} = useParams();                                                
  const handleEditRoom= ()=>{
    const data= {
      roomnumber,
      block,
      floor,
      branch,
    };
    setLoading(true);
    axios
    .put(`http://localhost:5555/rooms/${id}`, data)
    .then(()=>{
      setLoading(false);
      navigate('/');
    })
    .catch((error)=>{
      setLoading(false);
      alert('An error has occured..');
      console.log(error);
    })
  }
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Edit Room</h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-grey-500'>Room Number</label>
          <input type="text" 
          value={roomnumber}
          onChange={(e)=> setRoomnumber(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
           />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-grey-500'>Block</label>
          <input type="text" 
          value={block}
          onChange={(e)=> setBlock(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
           />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-grey-500'>Floor</label>
          <input type="text" 
          value={floor}
          onChange={(e)=> setFloor(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
           />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-grey-500'>Branch</label>
          <input type="text" 
          value={branch}
          onChange={(e)=> setBranch(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
           />
           </div>
           <button className='p-2 bg-sky-300 m-8' onClick={handleEditRoom}>
            Save Room
           </button>
      </div>
    </div>
  )
}

export default EditRoom
