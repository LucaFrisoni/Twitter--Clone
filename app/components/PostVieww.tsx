import React from "react";
import Header from "./Header";
import PostItem from "./posts/PostItem";
import Form from "./Form";

import CommentFeed from "./posts/CommentFeed";
import axios from "axios";
interface PostViewwProps {
  postId: string;
}
export const revalidate = 0;
const PostVieww = async ({ postId }: PostViewwProps) => {
  const { data } = await axios.get(
    `https://backlitter.onrender.com/postss/${postId}`
  );
  const post = data;

  return (
    <>
      <Header label="Tweet" showBackArrow />
      <PostItem data={post} />
      <Form
        postId={postId as string}
        isComment
        placeholder="Tweet your reply"
      />
      <CommentFeed comments={post?.comments} />
    </>
  );
};

export default PostVieww;
