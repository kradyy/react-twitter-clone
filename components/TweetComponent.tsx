import React, { useEffect } from "react";
import { Tweet } from "../typings";
import TimeAgo from "react-timeago";
import {
  ChatBubbleLeftRightIcon,
  ArrowUpOnSquareIcon,
  HeartIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { fetchComments } from "../utilities/fetchComments";
import { Comment } from "../typings";

interface Props {
  tweet: Tweet;
}

function TweetComponent({ tweet }: Props) {
  const author = tweet.author?.length ? tweet.author[0] : [];

  const authorImageUrl = author.image?.asset?.url;
  const authorName = author.name || "Anonymous";

  const [comments, setComments] = React.useState<Comment[]>([]);

  useEffect(() => {
     (async () => {
        let comments: Comment[] = await fetchComments(tweet._id);
        console.log("comments 2", comments)
        setComments(comments)
    })()
  }, []);

  return (
    <div className="tweetContainer p-5">
      <div className="flex space-x-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={authorImageUrl}
          alt="profile"
        />

        <div className="flex flex-col justify-start w-full">
          <div className="flex items-center space-x-2 ">
            <p className="font-bold">{authorName.toLowerCase()}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{authorName.toLowerCase()}
            </p>
            <TimeAgo
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>

          <p className="text-lg pt-1 !m-0">{tweet.text}</p>

          {tweet.image && (
            <img
              className="grow mt-5 max-h-60 rounded-lg object-cover shadow-sm"
              src={tweet.image}
              alt="tweet"
            />
          )}
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ChatBubbleLeftRightIcon className=" h-5 w-5" /> <p>{comments.length}</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ArrowUpOnSquareIcon className=" h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HeartIcon className=" h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <AdjustmentsHorizontalIcon className=" h-5 w-5" />
        </div>
      </div>

      {comments.length > 0 && (
        <div className="mt-5 mx-6 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
          {comments.map((comment) => (
              <div className="relative flex space-x-3" key={comment._id}>
                  <hr className="h-8 left-6 top-10 border-x border-primary/30 absolute" />

                  <img
                    className="h-7 w-7 mt-2 rounded-full object-cover"
                    src={comment.author.length && comment.author[0].image.asset.url}
                    alt="profile"
                  />
                  <div className="flex flex-col justify-start w-full">
                    <div className="flex items-center space-x-2 ">
                      <p className="font-bold">{comment.author.length && comment.author[0].name.toLowerCase()}</p>
                      <p className="hidden text-sm text-gray-500 sm:inline">
                        @{comment.author.length && comment.author[0].name.toLowerCase()}
                      </p>
                      <span className="text-gray-500">·</span>
                      <TimeAgo
                        className="text-sm text-gray-500"
                        date={comment._createdAt}
                      />
                    </div>

                    <p className="text-sm pt-1 !m-0">{comment.comment}</p>
                  </div>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TweetComponent;
