import Header from "@/app/components/Header";

import axios from "axios";
import dynamic from "next/dynamic";
import React from "react";
import { ClipLoader } from "react-spinners";

const UserHero = dynamic(() => import("@/app/components/users/UserHero"), {
  ssr: false,
  loading: () => (
    <div className=" flex justify-center items-center h-full">
      <ClipLoader color="lightblue" size={80} />
    </div>
  ),
});
const UserBio = dynamic(() => import("@/app/components/users/UserBio"), {
  ssr: false,
  loading: () => (
    <div className=" flex justify-center items-center h-full">
      <ClipLoader color="lightblue" size={80} />
    </div>
  ),
});
const PostFeed = dynamic(() => import("@/app/components/posts/PostFeed"), {
  ssr: false,
  loading: () => (
    <div className=" flex justify-center items-center">
      <ClipLoader color="lightblue" size={80} />
    </div>
  ),
});

export const revalidate = 0;
const UserView = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const { data } = await axios.get(
    `https://backlitter.onrender.com/users/${userId}`
  );
  const user = data;

  if (!user) {
    return (
      <div className=" flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label={user?.user.name} />
      <UserHero user={user} />
      <UserBio user={user} />
      <PostFeed userId={userId} />
    </>
  );
};

export default UserView;
