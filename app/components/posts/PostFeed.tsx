"use client";
import React, { useEffect, useState } from "react";
import { Post } from "@/types";
import { ClipLoader } from "react-spinners";
import PostItem from "./PostItem";
import LoadMoreSentinel from "./LoadMoreSentinel";
import FeedLoader from "./FeedLoader";

interface PostFeedProps {
  userId?: string;
  allTweets: Post[];
  hasMore: boolean;
  isLoaded: boolean;
  onLoadMore: () => void;
  onRefresh?: () => void; // Cambia el tipo de allTweets a Post[]
}

const PostFeed: React.FC<PostFeedProps> = ({
  userId,
  allTweets,
  hasMore,
  isLoaded,
  onLoadMore,
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

  if (isLoaded && allTweets.length === 0) {
    return (
      <p className="text-neutral-500 text-center p-2 ">
        This account does not have any Tweet yet
      </p>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="mt-4 flex justify-center items-center">
          <ClipLoader color="lightblue" size={80} />
        </div>
      ) : allTweets.length > 0 ? (
        <>
          {allTweets.map((tweet: Post) => (
            <PostItem
              userId={userId}
              key={tweet._id}
              data={tweet}
              onRefresh={onRefresh}
            />
          ))}
          {hasMore && (
            <LoadMoreSentinel key={allTweets.length} onVisible={onLoadMore} />
          )}
        </>
      ) : (
        <FeedLoader />
      )}
    </>
  );
};
export default PostFeed;
