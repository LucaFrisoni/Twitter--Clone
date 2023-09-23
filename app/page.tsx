"use client";
import { redirect, useRouter } from "next/navigation";
import HomeView from "./components/Views/HomeView";

const Home = () => {
  const router = useRouter();
  if (router) {
    return redirect("/home");
  }
  return <div></div>;
};
export default Home;
