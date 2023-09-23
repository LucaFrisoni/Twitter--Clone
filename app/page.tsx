"use client";
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import PostFeed from "./components/posts/PostFeed";
import Header from "./components/Header";
import Form from "./components/Form";
import HomeView from "./components/Views/HomeView";

const Home = async () => {
  const { data: allPostsDataa } = await axios.get(
    `https://backlitter.onrender.com/posts`
  );

  return (
    <>
      <HomeView allPostsData={allPostsDataa} />
    </>
  );
};
export default Home;
