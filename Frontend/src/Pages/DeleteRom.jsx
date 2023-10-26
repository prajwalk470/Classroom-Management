import React, {useState} from 'react'
import BackButton from '../Components/BackButton';
import Spinner from '../Components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteRoom= ()=>{
  const [loading, setLoading] = useState(false);
  const navigate= useNavigate();
  const {id}= useParams();
  const handleDeleteRoom= ()=>{
    setLoading(true);
    axios.delete(`http://localhost:5555/rooms/${id}`)
    .then(()=>{
      setLoading(false);
      navigate('/');
    })
    .catch((error)=>{
      setLoading(false);
      alert('An error has occured');
      console.log(error);
    });
  };
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>
        Delete Room
      </h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'> Sure to delete the room?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteRoom}>
          Delete Room
        </button>
      </div>
    </div>
  )
}

export default DeleteRoom
