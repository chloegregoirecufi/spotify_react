import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'

const App = () => {
  return (
    <div className='relative flex'>
      <Sidebar />
      <div className='flex-1 flex flex-col bg-gradient-to-b from-black to-[rgba(18,18,18,1)]'>
        <Topbar />
        <div className='h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse'>
            <div className='flex-1 h-fit pb-40 text-white'>
              <Outlet />
            </div>
          </div>
      </div>
      {/*TODO: ici le player */}
    </div>
    )
}

export default App