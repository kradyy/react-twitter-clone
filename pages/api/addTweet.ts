// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { TweetBody } from "../../typings";
import { client as sanityClient } from '../../sanity'
import { groq } from "next-sanity";

type Data = {
  message: string;
};

const sanityAPIEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v${process.env.NEXT_PUBLIC_SANITY_API_VERSION}/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: TweetBody = JSON.parse(req.body);

  // Get the author ID from the Sanity API
  // Not really a viable solution for a production app since we only get name and not username
  const getAuthorId: any = await sanityClient.fetch(
      groq`*[_type=="author" && name=="${data.author}"]{_id}`
  );

  const authorId = getAuthorId[0]?._id || null;

  // Set up the mutation to create a new tweet
  const mutations = {
    mutations: [
        {
          create: {
            _type: "tweet",
            text: data.text,
            author: {_ref: authorId},
            image: data.image,
            blockTweet: false,
          }
       }
    ],
  };

  // Send the mutation to the Sanity API
  const result = await fetch(sanityAPIEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_TOKEN}`,
    },
    body: JSON.stringify(mutations),
  })

  const json = await result.json();

  res.status(200).json({ message: json  } );
}
