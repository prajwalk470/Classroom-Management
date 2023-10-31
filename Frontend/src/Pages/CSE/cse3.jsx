import React from 'react';
import Sidebar from '../../Components/Sdebar';
import { Link } from 'react-router-dom';

const Cse3 = () => {
  return (
    <div>
      <Sidebar />
      <h1 className='text-2xl text-center my-4'>3rd Year CSE Students</h1>
      <div className="flex justify-center mt-4">
        <Link to="/rooms/cse/3/A" className="bg-green-500 text-white py-2 px-4 mx-2 rounded-lg">
          Section-A
        </Link>
        <Link to="/cse/B" className="bg-blue-500 text-white py-2 px-4 mx-2 rounded-lg">
          Section-B
        </Link>
      </div>
      <div className="flex justify-center mt-4">
        <Link to="/cse/C" className="bg-blue-500 text-white py-2 px-4 mx-2 rounded-lg">
          Section-C
        </Link>
        <Link to="/cse/D" className="bg-green-500 text-white py-2 px-4 mx-2 rounded-lg">
          Section-D
        </Link>
      </div>
    </div>
  );
}

export default Cse3;
