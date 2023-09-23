"use client"
import axios from "axios";
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
