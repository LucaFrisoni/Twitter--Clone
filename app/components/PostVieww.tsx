import React, { useEffect, useState } from "react";
import { usePost } from "@/hooks/usePostTweet";
import { ClipLoader } from "react-spinners";
import Header from "./Header";
import PostItem from "./posts/PostItem";
import Form from "./Form";
import { Post } from "@/types";
import CommentFeed from "./posts/CommentFeed";
import axios from "axios";
interface PostViewwProps {
  postId: string;
}
export const revalidate = 0;
const PostVieww = ({ postId }: PostViewwProps) => {
  const [post, setPost] = useState<Post>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchPost = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/api/posts/${postId}`
    );
    const usePostt = data;
    setPost(usePostt);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, [postId, post]);

  if (isLoading || !post) {
    return (
      <div className=" flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }
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
