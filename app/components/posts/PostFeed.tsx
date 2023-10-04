"use client";
import React, { useEffect, useState } from "react";
import { Post } from "@/types";
import { ClipLoader } from "react-spinners";
import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string;
  allTweets?: Post[];
  dataUserId?: any;
  onRefresh?: () => void; // Cambia el tipo de allTweets a Post[]
}

const PostFeed: React.FC<PostFeedProps> = ({
  userId,
  allTweets,
  dataUserId,
  onRefresh,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    setIsLoading(false);
  }, [userId]);

  if (!isMounted) {
    return null;
  }

  // Utiliza un operador ternario para decidir qué array mapear
  const tweetsToMap = allTweets ? allTweets : dataUserId || [];

  if (tweetsToMap == "No Posts available") {
    return (
      <p className="text-neutral-500 text-center p-2 ">
        This account does not have any Tweet yet
      </p>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <ClipLoader color="lightblue" size={80} />
        </div>
      ) : tweetsToMap.length > 0 ? (
        tweetsToMap.map((tweet: Post) => (
          <PostItem
            userId={userId}
            key={tweet._id}
            data={tweet}
            onRefresh={onRefresh}
          />
        ))
      ) : (
        <div className="flex justify-center items-center">
          <ClipLoader color="lightblue" size={80} />
        </div>
      )}
    </>
  );
};
export default PostFeed;
