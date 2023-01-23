// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client as sanityClient } from '../../../sanity'
import { groq } from 'next-sanity'
import { Comment } from '../../../typings'

type Data = Comment[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {id} = req.query

    if(!id) return res.status(400)
    
    const comments: Comment[] = await sanityClient.fetch(
        groq`
          *[_type == "comment" && references(*[_type == "tweet" && _id == "${id}"]._id)] {
            _id,
            ...,
            "author": *[_id == ^.author._ref && _type == "author"]{name,
            image{
              asset->{url}
            }} 
        } | order(_createdAt desc) 
      `
    )
    
     res.status(200).json(comments)
}
