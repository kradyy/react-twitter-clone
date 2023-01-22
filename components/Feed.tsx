import React from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import TweetBox from './TweetBox'
import TweetComponent from './TweetComponent'
import { Tweet } from '../typings'
import { fetchTweets } from '../utilities/fetchTweets'
import toast from 'react-hot-toast'

interface Props {
  tweets: Tweet[]
}

function Feed({tweets: TweetProps}: Props) {
  const [tweets, setTweets] = React.useState<Tweet[]>(() => TweetProps)

  const handleRefresh = async () => {
    const twitterToast = toast.loading('Fetching tweets .. ', { duration: 1000, id: 'fetchingTweets' } )

    try {
      const getTweets = await fetchTweets();
      setTweets(getTweets)
      toast.success('Tweets fetched', { id: 'fetchingTweets' })
    } catch (error) {
      toast.error('Error fetching tweets')
    }
  }

  return (
    <div className="col-span-7 lg:col-span-5 border-x">
      <div className="flex p-5 items-center justify-between">
          <h1 className="pb-0 text-xl font-bold">Feed</h1>
          <ArrowPathIcon onClick={handleRefresh} className="h-8 w-8 cursor-pointer text-primary transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
      </div>

      <div>
        <TweetBox />
      </div>
      
      
      <div>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  )
}

export default Feed