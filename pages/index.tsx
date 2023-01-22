import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
import Feed from '../components/Feed'
import { fetchTweets } from '../utilities/fetchTweets'
import { Tweet } from '../typings'
import toast, { Toaster } from 'react-hot-toast';

interface Props {
  tweets: Tweet[]
}

const Home = ({tweets}: Props) => {
  return (
    <div className="main lg:max-w-6xl lg:mx-auto max-h-screen overflow-hidden">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster />

      <main className="grid grid-cols-9">
        <Sidebar />
        <Feed tweets={tweets} />
        <Widgets />
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: getServerSideProps = async (context) => {
   const tweets = await fetchTweets();
   
   return {
    props: {
      tweets: tweets
    }
   }
}