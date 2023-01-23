// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client as sanityClient } from '../../sanity'
import { Tweet } from '../../typings'
import { groq } from 'next-sanity'

type Data = {
  tweets: Tweet[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const tweets: Tweet[] = await sanityClient.fetch(
        groq`
        *[_type == "tweet" && !blockTweet] {
          _id,
          ...,
          "author": *[_id == ^.author._ref && _type == "author"]{name,
          image{
            asset->{url}
          }} 
      } | order(_createdAt desc) 
      `
    )

     res.status(200).json({tweets})
}
