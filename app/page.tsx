"use client";
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import PostFeed from "./components/posts/PostFeed";

const Header = dynamic(() => import("./components/Header"), {
  loading: () => (
    <div className=" flex justify-center items-center h-full">
      <ClipLoader color="lightblue" size={80} />
    </div>
  ),
});

const Form = dynamic(() => import("./components/Form"), {
  loading: () => (
    <div className=" flex justify-center items-center h-full">
      <ClipLoader color="lightblue" size={80} />
    </div>
  ),
});



const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allPostsData, setPost] = useState([]);
  const fetch = async () => {
    const { data: allPostsDataa } = await axios.get(
      `https://backlitter.onrender.com/posts`
    );
    setPost(allPostsDataa);
    console.log("refresh")
  };

  useEffect(() => {
    setIsLoading(false);
   
  }, []);
  fetch();
  return (
    <>
      {isLoading ? ( // Renderiza el loader si isLoading es true
        <div className="flex justify-center items-center">
          <ClipLoader color="lightblue" size={80} />
        </div>
      ) : (
        <div>
          <Header label="Home" />
          <Form placeholder="What`s happening?" />
          <PostFeed allTweets={allPostsData} />
        </div>
      )}
    </>
  );
};
export default Home;
