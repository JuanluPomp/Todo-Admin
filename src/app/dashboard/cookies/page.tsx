
import { TabBar } from '@/app/features/TabBar/components/TabBar'
import { cookies } from 'next/headers'
import React from 'react'

export const metadata = {
  title: "Cookies page",
  description: "Dynamic Tabs With cookies"
}

export default async function CookiesPage() {
  const cookiesStore = await cookies()
  const selectedTab = cookiesStore.get('tab')?.value ?? '1'
  console.log(selectedTab)
  return (
    
      <div className=' grid grid-cols-1 sm:grid-cols-2 bg-white p-5 w-full mb-5 shadow-xl rounded-md'>
        <div className=' flex flex-col'>
          <h1 className='text-3xl'>Tabs</h1>
          <TabBar
            currentTab={Number(selectedTab)}
            tabs={[1,2,3,4,5]}
          />
        </div>
      </div>
  )
}
