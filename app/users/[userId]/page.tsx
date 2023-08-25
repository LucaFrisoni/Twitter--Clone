import Header from "@/app/components/Header";
import PostFeed from "@/app/components/posts/PostFeed";
import UserBio from "@/app/components/users/UserBio";
import UserHero from "@/app/components/users/UserHero";
import { useUser } from "@/hooks/useUser";
import React from "react";
import { ClipLoader } from "react-spinners";

export const revalidate = 0;
const UserView = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const user = await useUser(userId);

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
