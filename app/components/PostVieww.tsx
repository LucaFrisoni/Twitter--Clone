// import React from "react";
// import Header from "./Header";
// import PostItem from "./posts/PostItem";
// import Form from "./Form";

// import CommentFeed from "./posts/CommentFeed";
// import axios from "axios";
// interface PostViewwProps {
//   postId: string;
// }
// export const revalidate = 0;
// const PostVieww = async ({ postId }: PostViewwProps) => {
//   const { data } = await axios.get(
//     `https://backlitter.onrender.com/postss/${postId}`
//   );
//   const post = data;

//   return (
//     <>
//       <Header label="Tweet" showBackArrow />
//       <PostItem data={post} />
//       <Form
//         postId={postId as string}
//         isComment
//         placeholder="Tweet your reply"
//       />
//       <CommentFeed comments={post?.comments} />
//     </>
//   );
// };

// export default PostVieww;

"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import PostItem from "./posts/PostItem";
import Form from "./Form";
import CommentFeed from "./posts/CommentFeed";
import axios from "axios";
import { ClipLoader } from "react-spinners";

interface PostViewProps {
  postId: string;
  refreshInterval?: number; // Prop opcional para configurar el intervalo de actualización
}

const PostView: React.FC<PostViewProps> = ({
  postId,
  refreshInterval = 10000,
}) => {




  
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://backlitter.onrender.com/postss/${postId}`
      );
      setPost(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Ejecutar la primera llamada cuando se monta el componente

    // Configurar la llamada periódica con un intervalo de tiempo
    const intervalId = setInterval(() => {
      fetchData();
    }, refreshInterval);

    return () => {
      clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
    };
  }, [postId, refreshInterval]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header label="Tweet" showBackArrow />
      <PostItem data={post} />
      <Form postId={postId} isComment placeholder="Tweet your reply" />
      <CommentFeed comments={post?.comments} />
    </>
  );
};

export default PostView;
