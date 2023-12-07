import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Components/Sdebar'
const LandPage = () => {
  return (
    <div >
        <nav className="bg-blue-500 p-4 flex">
        {/* <Sidebar/> */}
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl text-white font-bold mr-5">Classroom Management</h1>
        <ul className="flex space-x-4">
        </ul>
      </div>
    </nav>
    <div>
      <header id="home" className="bg-200 p-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Welcome to Classroom Management</h1>
          <p className="text-gray-600 mt-4">Streamline your classroom operations and enhance the learning experience.</p>
          {/* <a href="/register" className="bg-blue-500 text-white py-2 px-4 rounded-full mt-4 inline-block hover:bg-blue-700">Get Started</a> */}
          {/* as of now lets forget the login  */}
        </div>
      </header>

      <section id="features" className="container mx-auto p-8">
        <h2 className="text-2xl font-bold mb-8">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-semibold">Live Class Tracker</h3>
            <p className='py-3'>
              <li>Gives the accurate ongoing live class and the remaining time.</li>
              <li>Also has the set of upcoming classes..</li>
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-semibold">Free Classrooms Tracker</h3>
            <p className='py-3'><li>There are many classrooms in our college. So if a student want an empty classroom for any purpose he can login to the app and check the availaibility of classroom nearby..</li></p>
          </div>
          <div className="p-4 border rounded-lg ">
            <h3 className="text-xl font-semibold">Feature 3</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
        
      </section>
      <div className='flex flex-row justify-center items-center'>
      <a href="/home" className="mx-10 bg-blue-500 text-white py-2 px-4 rounded-full mt-4 inline-block p-8 hover:bg-blue-700">Get Started</a>
      </div>
      
    </div>
    </div>
  )
}

export default LandPage
