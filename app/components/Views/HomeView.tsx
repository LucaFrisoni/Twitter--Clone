import React from "react";
import Header from "../Header";
import Form from "../Form";
import PostFeed from "../posts/PostFeed";
import axios from "axios";

// interface HomeViewProps {
//   allPostsData: any;
// }

const HomeView = async () => {
  const { data: allPostsDataa } = await axios.get(
    `https://backlitter.onrender.com/posts`
  );
  return (
    <div>
      <Header label="Home" />
      <Form placeholder="What`s happening?" />
      <PostFeed allTweets={allPostsDataa} />
    </div>
  );
};

export default HomeView;
