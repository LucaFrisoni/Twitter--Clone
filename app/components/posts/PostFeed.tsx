"use client";
import React, { useEffect, useState } from "react";
import { Post } from "@/types";
import dynamic from "next/dynamic";
import { ClipLoader } from "react-spinners";
import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string;
  allTweets?: Post[];
  dataUserId?: any;
  onRefresh: () => void; // Cambia el tipo de allTweets a Post[]
}

const PostFeed: React.FC<PostFeedProps> = ({
  userId,
  allTweets,
  dataUserId,
  onRefresh,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para controlar la carga

  useEffect(() => {
    setIsMounted(true);
    setIsLoading(false);
  }, [userId]);

  if (!isMounted) {
    return null;
  }
  if (dataUserId == "They are not post available") {
    dataUserId = [];
  }
  return (
    <>
      {isLoading ? ( // Renderiza el loader si isLoading es true
        <div className="flex justify-center items-center">
          <ClipLoader color="lightblue" size={80} />
        </div>
      ) : allTweets ? (
        allTweets.map((tweet: Post) => (
          <PostItem
            userId={userId}
            key={tweet._id}
            data={tweet}
            onRefresh={onRefresh}
          />
        ))
      ) : (
        dataUserId?.map((tweet: Post) => (
          <PostItem
            userId={userId}
            key={tweet._id}
            data={tweet}
            onRefresh={onRefresh}
          />
        ))
      )}
    </>
  );
};

export default PostFeed;
