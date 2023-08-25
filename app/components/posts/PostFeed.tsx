import { usePostTweet } from "@/hooks/usePostTweet";
import React from "react";
import PostItem from "./PostItem";
import { Post } from "@/types";
interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = async ({ userId }) => {
 
  let usePostsTweet = await usePostTweet("get");
  if (userId) {
    usePostsTweet = await usePostTweet("get", userId);
  }
  // console.log("Post", usePostsTweet);
  return (
    <>
      {usePostsTweet.map((tweet: Post) => {
        return <PostItem userId={userId} key={tweet.id} data={tweet} />;
      })}
    </>
  );
};

export default PostFeed;
