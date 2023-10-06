"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import useLoginModel from "@/hooks/zustandHooks/useLoginModel";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import Avatar from "../Avatar";
import { formatDistanceToNowStrict } from "date-fns";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineMessage,
  AiOutlineRetweet,
} from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { PiPencilSimpleLineLight } from "react-icons/pi";

import toast from "react-hot-toast";
import axios from "axios";
import { FiMoreHorizontal } from "react-icons/fi";
import debounce from "lodash.debounce";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import PostItemRetweet from "./PostItemRetweet";
import useQuoteModel from "@/hooks/zustandHooks/useQuoteModal";
import QuoteItem from "./QuoteItem";
import QuoteItemRetweet from "./QuoteItemRetweet";

interface PostItemProps {
  data: any;
  userId?: string;
  onRefresh?: () => void;
}
// export const revalidate = 0;
const PostItem: React.FC<PostItemProps> = ({ data, userId, onRefresh }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const loginModal = useLoginModel();
  const { onOpen } = useQuoteModel();

  const user = useSelector((state: any) => state.user);

  const [isDataLoaded, setIsDataLoaded] = useState(!!data.likeIds);
  const [isDataLoadedRT, setIsDataLoadedRT] = useState(!!data.retweets);

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (data.userRetweet) {
        return router.push(`/users/${data.postId.user?._id}`);
      }
      if (data.userQuoteRetweet) {
        return router.push(`/users/${data.quoteId.postId.user?._id}`);
      }
      router.push(`/users/${data.user?._id}`);
    },
    [router, data.user?._id]
  );

  const goToPost = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (data.userRetweet) {
        return router.push(`/posts/${data.postId._id}`);
      }
      router.push(`/posts/${data._id}`);
    },
    [router, data]
  );

  const goToQuote = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (data.userQuoteRetweet) {
        return router.push(`/posts/${data.quoteIdDelete}`);
      }
      if (data.userQuote) router.push(`/posts/${data._id}`);
    },
    [router, data]
  );

  useEffect(() => {
    setIsDataLoaded(!!data.likeIds);
  }, [data.likeIds]);

  useEffect(() => {
    setIsDataLoadedRT(!!data.retweets);
  }, [data.retweets, data.postId?.retweets]);

  const isLiked = useMemo(() => {
    if (!isDataLoaded) {
      return false; // O cualquier valor predeterminado según tu lógica
    }

    return (
      data.likeIds?.some((like: any) => like.userId === user?._id) || false
    );
  }, [isDataLoaded, user?._id, data.likeIds]);

  const onLike = useCallback(
    async (event: any) => {
      event.stopPropagation();
      if (!session) {
        return loginModal.onOpen();
      }
      try {
        if (isLiked) {
          await axios.delete(
            `https://backlitter.onrender.com/like?postId=${data._id}&currentUserId=${user?._id}`
          );
          toast.success("Post Unliked");

          if (onRefresh) {
            onRefresh();
          }
        } else {
          //
          await axios.post("https://backlitter.onrender.com/like", {
            postId: data._id,
            currentUserId: user._id,
          });
          toast.success("Post Liked");

          if (onRefresh) {
            onRefresh();
          }
        }
      } catch (error) {
        console.log("el error", error);
        toast.error("Something went wrong");
      }
    },
    [loginModal, user, data._id, router, isLiked, session]
  );

  const debouncedOnLike = debounce(onLike, 1000);

  const isRetweet = useMemo(() => {
    if (!isDataLoadedRT) {
      return false; // O cualquier valor predeterminado según tu lógica
    }
    return (
      data.retweets?.some(
        (retweet: any) => retweet.toString() === user?._id.toString()
      ) ||
      data.postId?.retweets?.some(
        (retweet: any) => retweet.toString() === user?._id.toString()
      ) ||
      false
    );
  }, [isDataLoadedRT, user?._id, data.retweets, data.postId?.retweets, router]);

  const onRetweet = useCallback(
    async (event: any) => {
      event.stopPropagation();
      if (!session) {
        return loginModal.onOpen();
      }
      try {
        if (isRetweet) {
          await axios.delete(
            `https://backlitter.onrender.com/retweets?postId=${data._id}&userRetweet=${user?._id}`
          );
          toast.success("Retweet Deleted");

          if (onRefresh) {
            onRefresh();
          }
        } else {
          await axios.post("https://backlitter.onrender.com/retweets", {
            postId: data._id,
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

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  const handleDropdownClick = (event: any) => {
    event.stopPropagation(); // Evita la propagación del evento al elemento padre
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://backlitter.onrender.com/delete/posts?postId=${data._id}`
      );
      // router.refresh();
      toast.success("Tweet Deleted");

      if (onRefresh) {
        onRefresh();
      }
      router.push("/");
    } catch (error) {
      console.log(error);
      return toast.error("Something went wrong");
    }
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  const handleQuote = (e: any) => {
    e.stopPropagation();
    onOpen(data, onRefresh);
  };

  return (
    <div
      className="border-b-[1px]
  border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition relative"
      onClick={data.userQuoteRetweet || data.userQuote ? goToQuote : goToPost}
    >
      {data.user ? (
        <div className=" flex flex-row items-start gap-3">
          <Avatar
            profileImage={data.user?.profileImage}
            userId={data.user?._id}
          />

          <div>
            <div className="flex flex-row items-center gap-2 ">
              <p className=" text-white font-semibold cursor-pointer hover:underline">
                {data.user?.name}
              </p>
              <span
                onClick={goToUser}
                className=" text-neutral-500 cursor-pointer hover:underline hidden md:block"
              >
                @{data.user?.username}
              </span>
              <span className=" text-neutral-500 text-sm">{createdAt}</span>
              <div
                className="flex justify-center items-center group absolute right-5 "
                onClick={handleDropdownClick}
              >
                <div className="bg-sky-500/10 h-9 w-9 rounded-full absolute hidden group-hover:flex transition"></div>
                <div className=" z-20">
                  {/* Delete Menu */}
                  {data.user.email == user?.email ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <FiMoreHorizontal className=" text-neutral-500 hover:text-sky-700 transition  " />
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
                        <DropdownMenuItem
                          className="flex gap-x-2 w-full bg-black"
                          onClick={handleDelete}
                        >
                          <BsFillTrashFill className="text-red-700 ml-1.5" />
                          <span className="text-red-700 font-bold text-base">
                            Delete
                          </span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : null}
                </div>
              </div>
            </div>
            <div className=" text-white mt-1 max-w-sm ">
              <p className="whitespace-pre-line break-words">{data.body}</p>
            </div>
            <div className=" flex flex-row items-center mt-3 gap-10">
              <div className="flex flex-row items-center justify-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500 group">
                <div className="bg-sky-500/10 h-12 w-12 rounded-full absolute hidden group-hover:flex transition "></div>
                <AiOutlineMessage size={20} />
                <p>{data.comments?.length || 0}</p>
              </div>
              {/* Retweet & Quote Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex flex-row justify-center items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-emerald-500 group">
                    <div className="bg-emerald-500/10 h-12 w-12 rounded-full absolute hidden group-hover:flex transition"></div>
                    {isRetweet ? (
                      <AiOutlineRetweet
                        className="text-emerald-500"
                        size={20}
                      />
                    ) : (
                      <AiOutlineRetweet size={20} />
                    )}
                    <p>{data.retweets?.length || 0}</p>
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
                className="flex flex-row justify-center items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500 group"
              >
                <div className="bg-red-500/10 h-12 w-12 rounded-full absolute hidden group-hover:flex transition"></div>
                {isLiked ? (
                  <AiFillHeart color={"red"} size={20} />
                ) : (
                  <AiOutlineHeart size={20} />
                )}

                <p>{data.likeIds?.length}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {data.userRetweet ? (
        <PostItemRetweet
          loginModal={loginModal}
          data={data}
          goToUser={goToUser}
          createdAt={createdAt}
          onRefresh={onRefresh}
        />
      ) : null}

      {data.userQuote ? <QuoteItem data={data} onRefresh={onRefresh} /> : null}

      {data.userQuoteRetweet ? (
        <QuoteItemRetweet
          loginModal={loginModal}
          data={data}
          onRefresh={onRefresh}
          goToUser={goToUser}
        />
      ) : null}
    </div>
  );
};

export default PostItem;
