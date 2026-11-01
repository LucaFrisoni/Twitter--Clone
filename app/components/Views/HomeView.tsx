"use client";
import React from "react";
import Header from "../Header";
import Form from "../Form";
import PostFeed from "../posts/PostFeed";
import useFeed from "@/hooks/useFeed";

const HomeView = () => {
  const { tweets, hasMore, isLoaded, refresh, loadMore } = useFeed();

  return (
    <div>
      <Header label="Home" />
      <Form placeholder="What's happening?" onRefresh={refresh} />
      <PostFeed
        allTweets={tweets}
        hasMore={hasMore}
        isLoaded={isLoaded}
        onLoadMore={loadMore}
        onRefresh={refresh}
      />
    </div>
  );
};

export default HomeView;
