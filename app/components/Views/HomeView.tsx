"use client";
import React, { useState, useEffect } from "react";
import Header from "../Header";
import Form from "../Form";
import PostFeed from "../posts/PostFeed";
import axios from "axios";

const HomeView = () => {
  const [allPostsData, setAllPostsData] = useState([]);
  const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://backlitter.onrender.com/posts`
        );
        setAllPostsData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [refreshCounter]); // Agregar refreshCounter como dependencia

  return (
    <div>
      <Header label="Home" />
      <Form
        placeholder="What's happening?"
        onRefresh={() => setRefreshCounter((prev) => prev + 1)}
      />
      <PostFeed
        allTweets={allPostsData}
        onRefresh={() => setRefreshCounter((prev) => prev + 1)}
      />
    </div>
  );
};

export default HomeView;
