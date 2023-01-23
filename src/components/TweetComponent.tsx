import React, { useEffect } from "react";
import { CommentBody, Tweet } from "../typings";
import TimeAgo from "react-timeago";
import {
  ChatBubbleLeftRightIcon,
  ArrowUpOnSquareIcon,
  HeartIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { fetchComments } from "../utilities/fetchComments";
import { Comment } from "../typings";
import { postComment } from "../utilities/postComment";
import FadeIn from 'react-fade-in';
import { useSession } from "next-auth/react";

interface Props {
  tweet: Tweet;
}

function TweetComponent({ tweet }: Props) {
  const author = tweet.author?.length ? tweet.author[0] : [];

  const authorImageUrl = author.image?.asset?.url;
  const authorName = author.name || "Anonymous";

  const commentRef = React.useRef<HTMLTextAreaElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const [comments, setComments] = React.useState<Comment[]>([]);
  const [displayComments, setDisplayComments] = React.useState<Boolean>(false);

  const [isPosting, setIsPosting] = React.useState<Boolean>(false);

  const { data: session } = useSession()

  const handleComment = async () => {
    const comment = commentRef.current?.value;
    
    if (!comment) {
      return;
    }

    setIsPosting(true);

    const commentBody: CommentBody = {
      comment: comment,
      author: authorName
    }

    const result = await postComment(tweet._id, commentBody);
   
    if(result) {
      refreshComments();

      setIsPosting(false);
      commentRef.current.value = '';
    }
  }

  const refreshComments = async () => {
    let comments: Comment[] = await fetchComments(tweet._id);
    setComments(comments.reverse())
  }

  useEffect(() => {
    if(scrollRef.current?.scrollHeight){
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [comments])
  
  useEffect(() => {
    refreshComments();
  }, []);

  return (
    <div className="tweetContainer animate-fadeIn p-5">
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
        <div onClick={() => setDisplayComments((prev: Boolean) => !prev)} className={`flex cursor-pointer items-center space-x-3 ${displayComments ? 'text-primary' : 'text-gray-400'}`}>
          <ChatBubbleLeftRightIcon className={`h-5 w-5 ${displayComments && 'text-primary'}`}  /> <p className="text-inherit">{comments.length}</p>
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

      {displayComments && (
        <>
          
        {comments.length > 0 && (
          <div ref={scrollRef} className={`mt-5 mx-6 max-h-56 space-y-5 overflow-y-scroll border-t border-gray-100 p-5`}>
            <FadeIn>
            {comments.map((comment) => (
                <div className="relative flex space-x-3 my-3" key={comment._id}>

                    <hr className={`
                      h-8 left-6 top-10 border-x 
                      ${comments[comments.length - 1]._id !== comment._id ? 
                      'border-primary/30' : 
                      'border-transparent'} absolute`}/>
                      
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
            </FadeIn>
          </div>
        )}

        {session && (
        <div className={`${isPosting ? 'opacity-40 pointer-events-none' : ''}`}>
          <textarea ref={commentRef} className="w-full h-20 border border-gray-200 rounded-lg p-2 mt-5" placeholder="Tweet your reply" />
          <button onClick={handleComment} className="bg-primary text-white rounded-full px-4 py-2 mt-2 transition-all duration-500 ease-out active:scale-125">Reply</button>
        </div>
      )}
      </>

      )}
    </div>
  )
}

export default TweetComponent;
