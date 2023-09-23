"use client"
import React from "react";
import Header from "../Header";
import Form from "../Form";
import PostFeed from "../posts/PostFeed";

interface HomeViewProps {
  allPostsData: any;
}

const HomeView = ({ allPostsData }: HomeViewProps) => {
  return (
    <div>
      <Header label="Home" />
      <Form placeholder="What`s happening?" />
      <PostFeed allTweets={allPostsData} />
    </div>
  );
};

export default HomeView;
