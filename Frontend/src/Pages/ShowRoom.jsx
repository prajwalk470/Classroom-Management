import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import Spinner from '../Components/Spinner';

const ShowRoom = () => {
  const [room , setRoom]= useState([]);
  const [loading, setLoading]= useState(false);
  const { id }= useParams();
  
  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:5555/rooms/${id}`)
    .then((response)=>{
      setRoom(response.data);
      setLoading(false);
    })
    .catch((error)=>{
      console.log(error);
      setLoading(false);
    })
  },[])
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Show Room</h1>
      {loading ?(
        <Spinner/>
      ):(
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
              <span className='text-xl mr-4 text-grey-500'>Room Number</span>
              <span>{room.roomnumber}</span>
          </div>
          <div className='my-4'>
              <span className='text-xl mr-4 text-grey-500'>Block</span>
              <span>{room.block}</span>
          </div>
          <div className='my-4'>
              <span className='text-xl mr-4 text-grey-500'>Floor</span>
              <span>{room.floor}</span>
          </div>
          <div className='my-4'>
              <span className='text-xl mr-4 text-grey-500'>Branch</span>
              <span>{room.branch}</span>
          </div>
          <div className='my-4'>
              <span className='text-xl mr-4 text-grey-500'>Create Time</span>
              <span>{new Date(room.createdAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowRoom
