import { useState } from 'react'
// import ae from ''
export default () => {

  const [state, setState] = useState(false)

  // Replace javascript:void(0) path with your path
  const navigation = [
      { title: "Customers", path: "#" },
      { title: "Careers", path: "#" },
      { title: "Guides", path: "#" },
      { title: "Partners", path: "#" }
  ]

  return (
      <nav className="bg-white-full border-b md:border-0 md:static">
          <div className="items-center max-w-screen-xl mx-auto md:flex  ">
              <div className="flex items-center justify-between py-3 md:py-5 md:block">
                <div className='border-lg '>
                <img src = "/log.png" width={150}
                            alt="Float UI logo"
                        />
                </div>
                    
              </div>
              <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${ state ? 'block' : 'hidden'}`}>
                  <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                      {
                          navigation.map((item, idx) => {
                              return (
                                <li key={idx} className="text-gray-600 hover:text-black-600 text-xl">
                                    <a href={item.path}>
                                        { item.title }
                                    </a>
                                </li>
                              )
                          })
                      }
                  </ul>
              </div>
              <div className="hidden md:inline-block">
                <a href="javascript:void(0)" className="py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow">
                    Get Started
                </a>
              </div>
          </div>
      </nav>
  )
}