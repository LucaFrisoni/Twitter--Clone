"use client"
import { useRouter } from "next/navigation";
import HomeView from "./components/Views/HomeView";

const Home = () => {
  const router = useRouter()
  return  router.push("/home")
 
};
export default Home;
