import { Comment, TweetBody } from '../typings'

export const postTweet = async (tweetBody: TweetBody) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/addTweet`, {
        body: JSON.stringify(tweetBody),
        method: 'POST',
    })

    const data = await res.json()
    return data
}