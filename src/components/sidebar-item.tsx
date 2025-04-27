"use client"
import { useParams, usePathname } from 'next/navigation'
import React from 'react'


interface SidebarItemProps {
  icon: React.ReactNode
  title: string
  pathName: string
}
export default function SidebarItem({ pathName, title, icon }: SidebarItemProps) {
  const path = usePathname()
  console.log(path, pathName)
  return (
    <li>
      <a href={pathName} 
        className={` relative px-4 py-3 flex items-center space-x-4 rounded-xl
          
          ${path === pathName ? 'text-white bg-gradient-to-r from-blue-600 to-sky-400'
            : 'text-white bg-gradient-to-r from-gray-600 to-slate-400'}
          `}>
        {icon}
        <span className="-mr-1 font-medium">{title}</span>
      </a>
    </li>
  )
}
