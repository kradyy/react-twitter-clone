import React, { useRef, useState } from "react";

import { CalendarIcon, FaceSmileIcon, FaceFrownIcon, PhotoIcon, MagnifyingGlassCircleIcon,MapPinIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { postTweet } from "../utilities/postTweet";
import { Tweet, TweetBody } from "../typings";
import { fetchTweets } from "../utilities/fetchTweets";

interface Props {
  setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>
}

function TweetBox({setTweets}: Props) {
  const [tweet, setTweet] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const { data: session } = useSession();

  const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const addImageToTweet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const image = imageInputRef.current?.value;

    if (!image) {
        toast.error('Please specify an image URL.', { duration: 1000, id: 'selectImage' } )
        return
    }

    // Verify image url
    const imageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
    const isValidImage = imageRegex.test(image);

    if (!isValidImage) {
        toast.error('Please specify a valid image URL.', { duration: 1000, id: 'selectImage' } )
        return
    }

    if (image) {
      setImage(imageInputRef.current.value);
      imageInputRef.current.value = '';
      setImageUrlBoxIsOpen(false);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!tweet.length || !session) {
      return;
    }

    const twitterToast = toast.loading('Posting tweet .. ', { duration: 1000, id: 'postingTweet' } )

    const tweetBody: TweetBody = {
      text: tweet,
      author: session?.user?.name || 'Anonymous',
      image: image || '',
    }

    const result = await postTweet(tweetBody);

    if(result.message.transactionId) {
      const getTweets = await fetchTweets();
      setTweets(getTweets);
      setTweet('')
      setImage('')
    }
  }

  return (

    <div className="flex items-center p-5 space-x-2">
      <div className="h-24 self-start flex items-center">
        <img
          src={session?.user?.image || `./avatar.png`}
          alt="avatar"
          className="h-14 w-14  object-cover rounded-full"
        />
      </div>

      <div className="flex-1 pl-3">
        <form>
          <input
            type="text"
            placeholder="What's happening?"
            className="w-full focus:outline-none h-24 text-xl text-gray-500"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
          />

          <div className="flex items-center justify-between">
              <div className="flex items-center flex-1 space-x-2 text-primary">
                <PhotoIcon onClick={() => setImageUrlBoxIsOpen(prev => !prev)} className="h-6 w-6 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
                <MapPinIcon className="h-6 w-6" />
                <FaceSmileIcon className="h-6 w-6" />
                <MagnifyingGlassCircleIcon className="h-6 w-6" />
                <CalendarIcon className="h-6 w-6" />
              </div>

              <button  type="submit" onClick={handleSubmit} className="bg-primary text-white rounded-full px-4 py-2 font-bold disabled:opacity-40 transition-all duration-500 ease-out active:scale-125 disabled:pointer-events-none"
              disabled={!tweet.length || !session}>
                Tweet
              </button>
          </div>
        </form>
        
        {image && !imageUrlBoxIsOpen && (
          <div className="flex items-center justify-between mt-4 relative w-fit">
            <img src={image} alt="tweet" className="object-contain shadow-lg" />
            <button className="bg-primary text-white px-2 hover:scale-105 transition-all duration-500 py-1 absolute rounded-full text-sm top-0 right-0 -m-2 shadow-lg " onClick={() => setImage('')}>
             ✗
            </button>
          </div>
        )}

        {imageUrlBoxIsOpen && (
            <form onSubmit={addImageToTweet} className="flex items-center rounded-lg px-4 py-2 mt-4 bg-primary/90">
              <input type="text" placeholder="Image URL" className="flex-1 focus:outline-none text-white bg-transparent placeholder:text-white" ref={imageInputRef} />
              <button type="submit" className="bg-primary text-white rounded-full px-4 py-2 font-bold disabled:opacity-40  transition-all duration-500 ease-out active:scale-125"
              disabled={!session}>
                Add image
              </button>
            </form>
          )}
          
      </div>
    </div>
  );
}

export default TweetBox;
