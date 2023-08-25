import Image from "next/image";
import Header from "./components/Header";
import Form from "./components/Form";
import PostFeed from "./components/posts/PostFeed";

import store from "@/redux/store";

export default function Home() {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What`s happening?" />
      <PostFeed />
    </>
  );
}
