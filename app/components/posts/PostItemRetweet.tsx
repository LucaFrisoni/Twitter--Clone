"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineRetweet,
} from "react-icons/ai";
import { PiPencilSimpleLineLight } from "react-icons/pi";
import Avatar from "../Avatar";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import useQuoteModel from "@/hooks/zustandHooks/useQuoteModal";

interface PostItemRetweetProps {
  data: any;
  goToUser: any;
  createdAt: any;
  loginModal: any;
  onRefresh?: () => void;
}

const PostItemRetweet = ({
  data,
  goToUser,
  createdAt,
  loginModal,
  onRefresh,
}: PostItemRetweetProps) => {
  const { onOpen } = useQuoteModel();

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
          if (onRefresh) {
            onRefresh();
          }
        } else {
          // // Lógica para dar like
          await axios.post("https://backlitter.onrender.com/like", {
            postId: data.postId._id,
            currentUserId: user._id,
          });
          toast.success("Tweet Liked");

          if (onRefresh) {
            onRefresh();
          }
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

          if (onRefresh) {
            onRefresh();
          }
        } else {
          await axios.post("https://backlitter.onrender.com/retweets", {
            postId: data.postId._id,
            userRetweet: user._id,
          });
          toast.success("Retweet Created");

          if (onRefresh) {
            onRefresh();
          }
        }
      } catch (error) {
        console.log("el error", error);
        toast.error("Something went wrong");
      }
    },
    [loginModal, user, data._id, isRetweet, session, router]
  );

  const debouncedOnRetweet = debounce(onRetweet, 1000);

  const handleQuote = (e: any) => {
    e.stopPropagation();
    onOpen(data, onRefresh);
  };

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
            <div className="flex flex-row items-center justify-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500 group">
              <div className="bg-sky-500/10 h-12 w-12 rounded-full absolute hidden group-hover:flex transition"></div>
              <AiOutlineMessage size={20} />
              <p>{data.postId.comments?.length || 0}</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex flex-row items-center justify-center text-neutral-500 gap-2 cursor-pointer transition hover:text-emerald-500 group">
                  <div className="bg-emerald-500/10 h-12 w-12 rounded-full absolute hidden group-hover:flex transition"></div>
                  {isRetweet ? (
                    <AiOutlineRetweet className="text-emerald-500" size={20} />
                  ) : (
                    <AiOutlineRetweet size={20} />
                  )}
                  <p>{data.postId.retweets?.length || 0}</p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className=" min-w-[230px]  hover:bg-neutral-900"
                side="bottom"
                style={{
                  boxShadow: " 0 0 10px rgba(74, 85, 104)",
                  background:
                    "linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)",
                }}
              >
                {isRetweet ? (
                  <>
                    <DropdownMenuItem
                      onClick={(event) => {
                        event.stopPropagation();
                        debouncedOnRetweet(event);
                      }}
                      className="flex gap-x-2 w-full bg-black"
                    >
                      <AiOutlineRetweet className="text-white" size={20} />
                      <span className="text-white font-bold text-base">
                        Delete Retweet
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleQuote}
                      className="flex gap-x-2 w-full bg-black"
                    >
                      <PiPencilSimpleLineLight
                        className="text-white"
                        size={20}
                      />
                      <span className="text-white font-bold text-base">
                        Quote
                      </span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem
                      onClick={(event) => {
                        event.stopPropagation();
                        debouncedOnRetweet(event);
                      }}
                      className="flex gap-x-2 w-full bg-black"
                    >
                      <AiOutlineRetweet className="text-white" size={20} />
                      <span className="text-white font-bold text-base">
                        Retweet
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleQuote}
                      className="flex gap-x-2 w-full bg-black"
                    >
                      <PiPencilSimpleLineLight
                        className="text-white"
                        size={20}
                      />
                      <span className="text-white font-bold text-base">
                        Quote
                      </span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <div
              onClick={(event) => {
                event.stopPropagation();
                debouncedOnLike(event);
              }}
              className="flex flex-row items-center justify-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500 group"
            >
              <div className="bg-red-500/10 h-12 w-12 rounded-full absolute hidden group-hover:flex transition"></div>
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
