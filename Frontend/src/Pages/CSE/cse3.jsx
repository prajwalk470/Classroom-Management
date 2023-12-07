import React from 'react';
import Sidebar from '../../Components/Sdebar';
import { Link } from 'react-router-dom';

const BranchCard = ({ branch, sections }) => {
  return (
    <div className="max-w-sm mx-2 my-4 bg-white border rounded p-4 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-100  ">
      <h2 className="text-xl font-semibold mb-2">{branch} Branch</h2>
      <div className="flex flex-wrap">
        {sections.map((section) => (
          <Link
            key={section}
            to={`/tt/${branch}/${section}`}
            className="bg-blue-500 text-white py-1 px-3 mx-4 my-2 rounded-lg"
          >
            Section {section}
          </Link>
        ))}
      </div>
    </div>
  );
};

const Cse3 = () => {
  const branches = ['CSE', 'ISE', 'ECE', 'EEE', 'Civil','Bio-tech'];
  const sections = ['A', 'B', 'C', 'D'];

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex flex-col '>
   
      <h1 className="text-3xl font-semibold text-center my-4">3rd Year Students</h1>
      <div className="flex flex-wrap justify-center ">
        {branches.map((branch) => (
          <BranchCard key={branch} branch={branch} sections={sections} />
        ))}
      </div>
           
      </div>
    </div>
  );
};

export default Cse3;
