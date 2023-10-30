import React, { useState } from 'react';
import {Link } from 'react-router-dom';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi'; 

const Sidebar = () => {
  const [isOpen, setisOpen]= useState(false);
  const [under, setUnder]= useState(false);

  return (
    <>
    {!isOpen ? 
        (
          <button  className='fixed z-30 flex items-center cursor-pointer left-10 top-6'onClick={ ()=> setisOpen(!isOpen)}>
            <svg 
            fill="#2563EB" 
            viewBox='0 0 100 80'
            width="40"
            height="40"
            >
              <rect width="100" height="10"></rect>
              <rect y="30" width="100" height="10"></rect>
              <rect y="60" width="100" height="10"></rect>
            </svg>
          </button>
        ):
        (
          <button className='rounded-lg px-2 hover:bg-green-600 text-xl text-white fixed top-5 left-10 z-10' onClick={()=> setisOpen(!isOpen)}>
              X
            </button>
        )
    }
     <div className={`top-0 left-0 fixed bg-blue-500 w-[20vw] h-full p-10 transform ${isOpen ? 'translate-x-0' : '-translate-x-[35vw]'} ease-in-out duration-300`}>
           
     <div className="p-4">
        <h2 className="text-2xl text-white mb-4">Classroom Management </h2>
        <ul>
          <li className=" rounded-full py-2 text-xl text-white text-center hover:bg-sky-400">
            <Link to="/login/rooms">Home</Link>
          </li>
          <li className=" rounded-full py-2 text-xl text-white text-center hover:bg-sky-400">
            <Link to="/login/rooms/classrooms">Classrooms</Link>
          </li>
          <li className="py-2 text-xl text-white ">
            <div
              onClick={() => setUnder(!under)}
              className="cursor-pointer flex items-center"
            >
              Branches
              {!under ? (<FiChevronRight className="ml-2" />): (<FiChevronDown className="ml-2" />) }
            </div>
            <ul className={`pl-4 ${under ? '' : 'hidden'}`}>
            <li className=" rounded-full py-2 w-60 text-xl text-white text-center hover:bg-sky-400">
                <Link to="/login/rooms/classrooms/cse">Computers Science</Link>
              </li>
              <li className=" rounded-full py-2 w-60 text-xl text-white text-center hover:bg-sky-400">
                <Link to="/login/rooms/classrooms/ise">Information Science</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      </div>
    </>
  );
};

export default Sidebar;
