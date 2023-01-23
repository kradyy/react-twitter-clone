import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon'
import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

function Widgets() {
  return (
    <aside className="col-span-2 hidden lg:block">
        <div className="px-2 mt-2">
            <div className="flex group items-center space-x-2 bg-gray-100 p-3 rounded-full">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 group-hover:text-black"/>
                <input 
                    type="text"
                    placeholder="Search twitter"
                    className="bg-transparent flex-1 outline-none" 
                />
            </div>
        </div>

        <TwitterTimelineEmbed
            sourceType="profile"
            screenName="elonmusk"
            options={{height: 1000, borderColor: 'transparent'}}
        />
    </aside>
  )
}

export default Widgets