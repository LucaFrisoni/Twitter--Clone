"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
const PostVieww = dynamic(() => import("@/app/components/PostVieww"), {
  ssr: false,
  loading: () => (
    <div className=" flex justify-center items-center h-full">
      <ClipLoader color="lightblue" size={80} />
    </div>
  ),
});
const PostView = () => {
  const { postId } = useParams();

  return (
    <>
      <PostVieww postId={postId as string} />
    </>
  );
};

export default PostView;
