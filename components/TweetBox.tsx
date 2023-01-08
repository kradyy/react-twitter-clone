import React, { useState } from "react";

import { CalendarIcon, FaceSmileIcon, FaceFrownIcon, PhotoIcon, MagnifyingGlassCircleIcon,MapPinIcon } from "@heroicons/react/24/outline";

function TweetBox() {
  const [tweet, setTweet] = useState<string>('');

  return (
    <div className="flex items-center p-5 space-x-2">

      <div className="h-24">
        <img
          src="./avatar.png"
          alt="avatar"
          className="h-14 w-14 object-cover rounded-full"
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
                <PhotoIcon className="h-6 w-6 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
                <MapPinIcon className="h-6 w-6" />
                <FaceSmileIcon className="h-6 w-6" />
                <MagnifyingGlassCircleIcon className="h-6 w-6" />
                <CalendarIcon className="h-6 w-6" />
              </div>


              <button type="submit" className="bg-primary text-white rounded-full px-4 py-2 font-bold disabled:opacity-40"
              disabled={!tweet.length}>
                Tweet
              </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TweetBox;
