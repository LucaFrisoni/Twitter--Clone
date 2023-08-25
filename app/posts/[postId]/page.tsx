"use client";

import PostVieww from "@/app/components/PostVieww";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PostView = () => {
  const { postId } = useParams();


  return (
    <>
      <PostVieww postId={postId as string} />
    </>
  );
};

export default PostView;
