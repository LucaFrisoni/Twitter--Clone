"use client";
import { useSession } from "next-auth/react";
import React, { useCallback, useMemo, useState } from "react";
import { format } from "date-fns";
import Button from "../Button";
import { BiCalendar } from "react-icons/bi";
import useEditModel from "@/hooks/zustandHooks/useEditModel";
import useLoginModel from "@/hooks/zustandHooks/useLoginModel";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import debounce from "lodash.debounce";

interface UserBioProps {
  user: any;
}

const UserBio: React.FC<UserBioProps> = ({ user }) => {
  const { data: session, status } = useSession();
  const userr = useSelector((state: any) => state.user);

  const editModal = useEditModel();
  const loginModal = useLoginModel();
  const router = useRouter();

  const isFollowing = useMemo(() => {
    const list = user?.user.followingIds || [];
    return list.includes(userr?._id);
  }, [user?.user.followingIds, userr]);

  const handleFollow = useCallback(async () => {
    if (!session) {
      return loginModal.onOpen();
    }
    try {
      if (isFollowing) {
        await axios.delete(
          `https://backlitter.onrender.com/follow?userId=${user?.user._id}&currentUserId=${userr._id}`
        );

        toast.success("User Unfollowed");
        router.refresh();
      } else {
        await axios.post("https://backlitter.onrender.com/follow", {
          userId: user?.user._id,
          currentUserId: userr._id,
        });

        toast.success("User Followed");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }, [user, userr, isFollowing, loginModal, router, session]);

  const debouncedOnFollow = debounce(handleFollow, 1000);

  const createdAt = useMemo(() => {
    return format(new Date(user?.user.createdAt), "MMMM yyyy");
  }, [user?.user.createdAt]);



  const totalLikes = useMemo(() => {
    return user?.user.posts.reduce(
      (sum: any, post: any) => sum + post.likeIds.length,
      0
    );
  }, [user]);

  return (
    <div className=" border-b-[1px] border-neutral-800 pb-4">
      <div className=" flex justify-end p-2">
        {session?.user?.email == user?.user.email ? (
          <Button secondary label="Edit" onClick={editModal.onOpen} />
        ) : (
          <Button
            onClick={debouncedOnFollow}
            label={isFollowing ? "Unfollow" : "Follow"}
            secondary={!isFollowing}
            outline={isFollowing}
          />
        )}
      </div>

      <div className=" mt-8 px-4 ">
        <div className=" flex flex-col">
          <p className=" text-white text-2xl font-semibold">
            {user?.user.name}
          </p>
          <p className=" text-md text-neutral-500">@{user?.user.username}</p>
        </div>

        <div className=" flex flex-col mt-4 ">
          <p className="text-white">{user?.user.bio}</p>
          <div className=" flex flex-row items-center gap-2 mt-4 text-neutral-500">
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div>
        </div>

        <div className="flex flex-row items-center mt-4 gap-6">
          <div className=" flex flex-row items-center gap-1">
            <p className=" text-white">{user?.followersCount}</p>
            <p className=" text-neutral-500">Following</p>
          </div>
          <div className=" flex flex-row items-center gap-1">
            <p className=" text-white">{user?.user.followingIds.length}</p>
            <p className=" text-neutral-500">Followers</p>
          </div>
          <div className=" flex flex-row items-center gap-1">
            <p className=" text-white">{totalLikes}</p>
            <p className=" text-neutral-500">Total Likes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
