import axios from "axios";
import dynamic from "next/dynamic";
import { ClipLoader } from "react-spinners";

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

const PostFeed = dynamic(() => import("./components/posts/PostFeed"), {
  loading: () => (
    <div className=" flex justify-center items-center h-full">
      <ClipLoader color="lightblue" size={80} />
    </div>
  ),
});

export default async function Home() {
  const { data: allPostsData } = await axios.get(
    `https://backlitter.onrender.com/posts`
  );

  return (
    <>
      <Header label="Home" />
      <Form placeholder="What`s happening?" />
      <PostFeed allTweets={allPostsData} />
    </>
  );
}
