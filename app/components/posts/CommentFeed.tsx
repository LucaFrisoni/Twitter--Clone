"use client";
import React from "react";
import CommentItem from "./CommentItem";

interface CommentFeedProps {
  comments?: any;
  onRefresh?: () => void;
}

const CommentFeed: React.FC<CommentFeedProps> = ({
  comments = [],
  onRefresh,
}) => {
  return (
    <>
      {comments?.map((comment: any) => (
        <CommentItem key={comment._id} data={comment} onRefresh={onRefresh} />
      ))}
    </>
  );
};

export default CommentFeed;
