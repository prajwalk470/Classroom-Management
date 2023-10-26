import React from 'react'
import { Link } from 'react-router-dom'
const LandPage = () => {
  return (
    <div>
        <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl text-white font-bold">Classroom Management</h1>
        <ul className="flex space-x-4">
        <ul className="flex space-x-4">
  <li>
    <Link to="/" className={location.pathname === '/' ? 'active' : ''} >
      Home
    </Link>
  </li>
  <li>
    <Link to="/features" className={location.pathname === '/features' ? 'active' : ''}>
      Features
    </Link>
  </li>
  <li>
    <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
      Contact
    </Link>
  </li>
  <li>
    <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>
      Login
    </Link>
  </li>
</ul>

        </ul>
      </div>
    </nav>
    <div>
      <header id="home" className="bg-200 p-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Welcome to Classroom Management</h1>
          <p className="text-gray-600 mt-4">Streamline your classroom operations and enhance the learning experience.</p>
          <a href="/register" className="bg-blue-500 text-white py-2 px-4 rounded-full mt-4 inline-block hover:bg-blue-700">Get Started</a>
        </div>
      </header>

      <section id="features" className="container mx-auto py-12 p-8">
        <h2 className="text-2xl font-bold mb-8">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-semibold">Feature 1</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-semibold">Feature 2</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-xl font-semibold">Feature 3</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </section>

    </div>
    </div>
  )
}

export default LandPage
