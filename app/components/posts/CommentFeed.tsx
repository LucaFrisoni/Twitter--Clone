import React from "react";
import CommentItem from "./CommentItem";

interface CommentFeedProps {
  comments?: any;
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => {
  console.log("Coments", comments);
  return (
    <>
      {comments?.map((comment: any) => (
        <CommentItem key={comment._id} data={comment} />
      ))}
    </>
  );
};

export default CommentFeed;
