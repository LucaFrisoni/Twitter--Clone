"use client";
import React, { useEffect, useState } from "react";
import { Post } from "@/types";
import axios from "axios";
import dynamic from "next/dynamic";
import { ClipLoader } from "react-spinners";

const PostItem = dynamic(() => import("@/app/components/posts/PostItem"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center">
      <ClipLoader color="lightblue" size={80} />
    </div>
  ),
});

interface PostFeedProps {
  userId?: string;
  allTweets?: Post[]; // Cambia el tipo de allTweets a Post[]
}

const PostFeed: React.FC<PostFeedProps> = ({ userId, allTweets }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [usePostsTweet, setUsePostsTweet] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para controlar la carga

  useEffect(() => {
    setIsMounted(true);

    const fetchData = async () => {
      try {
        if (userId) {
          const { data: userPostsData } = await axios.get(
            `https://backlitter.onrender.com/posts?userId=${userId}`
          );
          if (userPostsData === "They are not posts available") {
            return null;
          } else {
            setUsePostsTweet(userPostsData);
          }
        }
        setIsLoading(false); // Marca la carga como completa
      } catch (error) {
        console.log(error);
        setIsLoading(false); // Marca la carga como completa en caso de error
      }
    };

    fetchData();
  }, [userId]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {isLoading ? ( // Renderiza el loader si isLoading es true
        <div className="flex justify-center items-center">
          <ClipLoader color="lightblue" size={80} />
        </div>
      ) : allTweets ? (
        allTweets.map((tweet: Post) => (
          <PostItem userId={userId} key={tweet._id} data={tweet} />
        ))
      ) : (
        usePostsTweet.map((tweet: Post) => (
          <PostItem userId={userId} key={tweet._id} data={tweet} />
        ))
      )}
    </>
  );
};

export default PostFeed;
