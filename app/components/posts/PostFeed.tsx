import React from "react";
import PostItem from "./PostItem";
import { Post } from "@/types";
import axios from "axios";
interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = async ({ userId }) => {
  try {
    const { data: allPostsData } = await axios.get(
      `https://backlitter.onrender.com/posts`
    );

    let usePostsTweet = allPostsData;

    if (userId) {
      const { data: userPostsData } = await axios.get(
        `https://backlitter.onrender.com/posts?userId=${userId}`
      );
      usePostsTweet = userPostsData;
    }
    return (
      <>
        {usePostsTweet.map((tweet: Post) => {
          return <PostItem userId={userId} key={tweet._id} data={tweet} />;
        })}
      </>
    );
  } catch (error) {
    console.log(error);
  }


};

export default PostFeed;
