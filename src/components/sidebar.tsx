import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SidebarItem from './sidebar-item'
import { CiLogout } from 'react-icons/ci'
import { IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline } from 'react-icons/io5'

const menuItem = [
  {
    icon: <IoCalendarOutline/>,
    title: 'Dashboard',
    pathNaame: '/dashboard'
  },
  {
    icon: <IoCheckboxOutline/>,
    title: 'Rest Todos',
    pathNaame: '/dashboard/rest-todos'
  },
  {
    icon: <IoListOutline/>,
    title: 'Server Actions',
    pathNaame: '/dashboard/server-todos'
  },
  {
    icon: <IoCodeWorkingOutline/>,
    title: 'Cookies',
    pathNaame: '/dashboard/cookies'
  },
]
export default function Sidebar() {
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
            <div>
              <div className="-mx-6 px-6 py-4 rounded-2xl ">
                <Link
                    href={'/dashboard'}
                >
                  <Image width={100}
                  height={100}
                    src="/Horizontal_logo.png"
                    alt='Imagen verga'
                  />
                </Link>
              </div>
    
              <div className="mt-8 text-center ">
                <Image
                    height={10}
                    width={10}
                    src="/yo.jpg" 
                    alt="" className="w-10 border-2 h-10 text-blue-700 m-auto rounded-full object-cover lg:w-28 lg:h-28"
                />
                  <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">Juan Lizarraga</h5>
                  <span className="hidden text-gray-400 lg:block">Admin</span>
              </div>
              
              <ul className="space-y-2 tracking-wide mt-8">
                {menuItem.map(item => (
                  <SidebarItem
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  pathName={item.pathNaame}
                />
                ))}
              </ul>
              
            </div>
    
            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
              <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                <CiLogout />
                <span className="group-hover:text-gray-700">Logout</span>
              </button>
            </div>
          </aside>
  )
}
