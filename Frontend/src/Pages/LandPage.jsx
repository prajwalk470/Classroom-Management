// import React from 'react'
// import { Link } from 'react-router-dom'
// import Sidebar from '../Components/Sdebar'
// import Navbar from '../Land/nav'
// import tae from '../assets/bg.jpg'
const FeatureCard = ({ title, description, image }) => {
  return (
    <div className="p-4 border rounded-lg flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 mb-4 md:mb-0">
        <img src={image} alt={title} className="w-full h-auto rounded-lg" />
      </div>
      <div className="md:w-1/2 md:pl-4">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
const LandPage = () => {
  return (
    // className="bg-cover bg-center h-screen" style={{ backgroundImage: "url(./src/assets/bg.jpg)" }}
    <div >
        <nav className="bg-white p-4 flex">
      <div className="container mx-auto flex items-center justify-between">
      <div className='pr-20'>
          <img src="./src/assets/log.png" alt="Logo" className="h-[5rem] ml-10 rounded-lg" />
        </div>
      <div>
     
      </div>
        <ul className="flex space-x-4">
        <div className="flex items-center space-x-4">
  {/* Search Bar */}
  <input
    type="text"
    placeholder="Search..."
    className="border p-2 rounded-md focus:outline-none focus:border-blue-500"
  />

  {/* Login Button */}
  <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
    Get Started
  </button>
</div>
        </ul>
      </div>
    </nav>
    {/* <Navbar/> */}
    <div>
      <header id="home" className="bg-200 p-8">
      <div className="grid grid-cols-2 gap-4 p-8 bg-gray-900 text-white rounded-lg">
      {/* Right Column (Heading) */}
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl font-light mb-4">Nitte Classrooms Management</h1>
        <p className="text-lg mb-8">Enjoy Live class tracker & get the timetables ..</p>
        <div>
        <a href="/home" className="mx-10 bg-blue-500 text-white py-2 px-4 rounded-full mt-4 inline-block p-8 hover:bg-blue-700">Get Started</a>
        </div>
      </div>

      {/* Left Column (Image) */}
      <div
        className="bg-cover bg-center h-96 transition-transform duration-300 transform scale-100 hover:scale-110 hover:shadow-green"
        style={{ backgroundImage: "url('./src/assets/bg.jpg')" }}
      ></div>
    </div>
      </header>

      <section id="features" className="container mx-auto p-8">
      <h2 className="text-4xl text-center font-lg mb-8 text-gray-800 hover:text-gray-500 transition duration-300   ">
  Key Features
</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <FeatureCard
        title="Live Class Tracker"
        description={
          <>
            <p>Gives the accurate ongoing live class and the remaining time.</p>
            <p>Also has the set of upcoming classes.</p>
          </>
        }
        image="./src/assets/img1.jpg" // Replace with the actual image path
      />
      <FeatureCard
        title="Free Classrooms Tracker"
        description={<p>Classes are assigned to which branch get to know now.</p>}
        image="./src/assets/img2.jpg" // Replace with the actual image path
      />
      <FeatureCard
        title="Get all TimeTables"
        description={<p>Timetable of any branch can be accessed from this</p>}
        image="./src/assets/img3.jpg" // Replace with the actual image path
      />
    </div>
        
      </section>
      <div className='flex flex-row justify-center items-center mb-10'>
      <a href="/home" className="mx-10 bg-blue-500 text-white py-2 px-4 rounded-full mt-4 inline-block p-8 hover:bg-blue-700">Get Started</a>
      </div>
      
    </div>
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo on the left */}
        <div className='pr-20'>
          <img src="./src/assets/log.png" alt="Logo" className="h-20 ml-10 rounded-lg" />
        </div>

        <div className='flex flex-col'>
        
        <div className="flex space-x-4 pr-20">
          <h1 className='text-xl'>Made By : </h1>
        </div>
        <div className="flex space-x-4 pr-20">
          <p>@Neeraj</p>
          <p>@Prajwal</p>
        </div>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default LandPage
