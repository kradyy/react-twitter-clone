import React from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import TweetBox from './TweetBox'

function Feed() {
  return (
    <div className="col-span-7 lg:col-span-5 border-x">
      <div className="flex items-center justify-between">
          <h1 className="p-5 pb-0 text-xl font-bold">Feed</h1>
          <ArrowPathIcon className="h-8 w-8 cursor-pointer text-primary transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
      </div>


      <TweetBox />
      
      { /* Post */ }
    </div>
  )
}

export default Feed