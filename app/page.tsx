import axios from "axios";
import HomeView from "./components/Views/HomeView";
import { redirect } from "next/navigation";

const Home = async () => {
  const { data: allPostsDataa } = await axios.get(
    `https://backlitter.onrender.com/posts`
  );

  // if (allPostsDataa) {
  //   return redirect("/home");
  // }
  return (
    <>
      <HomeView allPostsDataa={allPostsDataa} />
    </>
  );
};
export default Home;
