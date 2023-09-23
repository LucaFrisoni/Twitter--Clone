import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import PostFeed from "./components/posts/PostFeed";
import HomeView from "./components/Views/HomeView";

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

const Home = async () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [allPostsData, setPost] = useState([]);
  // const fetch = async () => {
  const { data: allPostsDataa } = await axios.get(
    `https://backlitter.onrender.com/posts`
  );
  //   setPost(allPostsDataa);
  // };

  // useEffect(() => {
  //   setIsLoading(false);
  //   fetch();

  //   // Establece un intervalo para llamar a fetchData cada 2 segundos.
  //   const intervalId = setInterval(fetch, 10000);

  //   // Limpia el intervalo cuando el componente se desmonta para evitar fugas de memoria.
  //   return () => clearInterval(intervalId);
  // }, [fetch]);

  return (
    <>
      {/* {isLoading ? ( // Renderiza el loader si isLoading es true
        <div className="flex justify-center items-center">
          <ClipLoader color="lightblue" size={80} />
        </div>
      ) : ( */}
      <div>
        <HomeView allPostsData={allPostsDataa} />
      </div>
      {/* )} */}
    </>
  );
};
export default Home;
