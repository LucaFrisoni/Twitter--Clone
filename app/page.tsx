"use client"
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import PostFeed from "./components/posts/PostFeed";
import Header from "./components/Header";
import Form from "./components/Form";
import HomeView from "./components/Views/HomeView";

const Home = async () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [allPostsData, setPost] = useState([]);
  // const fetch = async () => {
  const { data: allPostsDataa } = await axios.get(
    `https://backlitter.onrender.com/posts`
  );
  // setPost(allPostsDataa);
  // };

  // useEffect(() => {
  //   setIsLoading(false);
  //   fetch();
  // }, [fetch]);

  return (
    <>
      {/* {isLoading ? ( // Renderiza el loader si isLoading es true
        <div className="flex justify-center items-center">
          <ClipLoader color="lightblue" size={80} />
        </div>
      ) : ( */}
      <>
        <HomeView allPostsData={allPostsDataa} />
      </>
      {/* )} */}
    </>
  );
};
export default Home;
