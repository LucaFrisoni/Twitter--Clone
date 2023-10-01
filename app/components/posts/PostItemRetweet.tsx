"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineRetweet,
} from "react-icons/ai";
import Avatar from "../Avatar";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";
import { useSession } from "next-auth/react";

interface PostItemRetweetProps {
  data: any;
  goToUser: any;
  createdAt: any;
  loginModal: any;
}

const PostItemRetweet = ({
  data,
  goToUser,
  createdAt,
  loginModal,
}: PostItemRetweetProps) => {
  const { data: session, status } = useSession();
  const user = useSelector((state: any) => state.user);
  const [isDataLoaded, setIsDataLoaded] = useState(!!data.postId?.likeIds);
  const [isDataLoadedRT, setIsDataLoadedRT] = useState(!!data.postId?.retweets);
  const router = useRouter();

  useEffect(() => {
    setIsDataLoadedRT(!!data.postId?.retweets);
  }, [data.postId?.retweets]);

  useEffect(() => {
    setIsDataLoaded(!!data.postId?.likeIds);
  }, [data.postId?.likeIds]);

  const isLiked = useMemo(() => {
    if (!isDataLoaded) {
      return false; // O cualquier valor predeterminado según tu lógica
    }

    return (
      data.likeIds?.some((like: any) => like.userId === user?._id) ||
      data.postId?.likeIds?.some((like: any) => like.userId === user?._id) ||
      false
    );
  }, [isDataLoaded, user?._id, data.postId?.likeIds]);

  const isRetweet = useMemo(() => {
    if (!isDataLoadedRT) {
      return false; // O cualquier valor predeterminado según tu lógica
    }
    return (
      data.postId?.retweets?.some(
        (retweet: any) => retweet.toString() === user?._id.toString()
      ) || false
    );
  }, [isDataLoadedRT, user?._id, data.postId?.retweets]);

  const onLike = useCallback(
    async (event: any) => {
      event.stopPropagation();
      if (!session) {
        return loginModal.onOpen();
      }
      try {
        if (isLiked) {
          await axios.delete(
            `https://backlitter.onrender.com/like?postId=${data.postId._id}&currentUserId=${user?._id}`
          );
          toast.success("Tweet Unliked");
          return router.refresh();
        } else {
          // // Lógica para dar like
          await axios.post("https://backlitter.onrender.com/like", {
            postId: data.postId._id,
            currentUserId: user._id,
          });
          toast.success("Tweet Liked");
          router.refresh();
        }
      } catch (error) {
        console.log("el error", error);
        toast.error("Something went wrong");
      }
    },
    [loginModal, user, data.postId.id, session, isLiked, router]
  );

  const debouncedOnLike = debounce(onLike, 1000);

  const onRetweet = useCallback(
    async (event: any) => {
      event.stopPropagation();
      if (!session) {
        return loginModal.onOpen();
      }
      try {
        if (isRetweet) {
          await axios.delete(
            `https://backlitter.onrender.com/retweets?postId=${data.postId._id}&userRetweet=${user?._id}`
          );
          toast.success("Retweet Deleted");
          router.refresh();
        } else {
          await axios.post("https://backlitter.onrender.com/retweets", {
            postId: data.postId._id,
            userRetweet: user._id,
          });
          toast.success("Retweet Created");
          router.refresh();
        }
      } catch (error) {
        console.log("el error", error);
        toast.error("Something went wrong");
      }
    },
    [loginModal, user, data._id, isRetweet, session, router]
  );

  const debouncedOnRetweet = debounce(onRetweet, 1000);

  return (
    <div>
      <div className="flex flex-row gap-x-2 items-center p-2">
        <AiOutlineRetweet className="text-neutral-500" size={15} />
        <p className="text-neutral-500 text-sm">
          {data.userRetweet?.username} Retweeteo
        </p>
      </div>
      <div className=" flex flex-row items-start gap-3">
        <Avatar
          profileImage={data.postId.user?.profileImage}
          userId={data.postId.user?._id}
        />

        <div>
          <div className="flex flex-row items-center gap-2 ">
            <p className=" text-white font-semibold cursor-pointer hover:underline">
              {data.postId.user?.name}
            </p>
            <span
              onClick={goToUser}
              className=" text-neutral-500 cursor-pointer hover:underline hidden md:block"
            >
              @{data.postId.user?.username}
            </span>
            <span className=" text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className=" text-white mt-1 max-w-sm ">
            <p className="whitespace-normal break-words">{data.postId.body}</p>
          </div>
          <div className=" flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{data.postId.comments?.length || 0}</p>
            </div>

            <div
              onClick={(event) => {
                event.stopPropagation();
                debouncedOnRetweet(event);
              }}
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-emerald-500"
            >
              {isRetweet ? (
                <AiOutlineRetweet className="text-emerald-500" size={20} />
              ) : (
                <AiOutlineRetweet size={20} />
              )}
              <p>{data.postId.retweets?.length || 0}</p>
            </div>

            <div
              onClick={(event) => {
                event.stopPropagation();
                debouncedOnLike(event);
              }}
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
            >
              {isLiked ? (
                <AiFillHeart color={"red"} size={20} />
              ) : (
                <AiOutlineHeart size={20} />
              )}

              <p>{data.postId.likeIds?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItemRetweet;
