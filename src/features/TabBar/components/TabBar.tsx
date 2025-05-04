"use client"

import { setCookie } from "cookies-next"
import { useState } from "react"

const tabs = [1,2,3,4,5]

type TabBarProps = {
  currentTab: number,
  tabs: number[]
}
export const TabBar = ({currentTab, tabs}: TabBarProps) => {

    const [selected, setSelected] = useState(currentTab)

    const handleSelectedTab = (tab: number) => {
      setSelected(tab)
      setCookie('tab', tab.toString())
      console.log(tab)
    }

    return (
      <div className={`grid w-full grid-cols-${tabs.length} space-x-2 rounded-xl bg-gray-200 p-2`}
      style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
      >
        {tabs.map(tab => (
          <div key={tab}>
          <input 
            checked={tab === selected}
            type="radio" id={tab.toString()}
            className="peer hidden"
            onChange={() => handleSelectedTab(tab)}  
          />
            <label
              htmlFor={tab.toString()} 
              className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                {tab}
            </label>
          </div>
        ))}
        
      </div>
    )
  }