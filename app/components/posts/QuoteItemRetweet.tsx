import useQuoteModel from "@/hooks/zustandHooks/useQuoteModal";
import axios from "axios";
import debounce from "lodash.debounce";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineRetweet,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import Avatar from "../Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { formatDistanceToNowStrict } from "date-fns";

interface PostItemRetweetProps {
  data: any;
  goToUser: any;

  loginModal: any;
  onRefresh?: () => void;
}

const QuoteItemRetweet = ({
  data,
  goToUser,
  loginModal,
  onRefresh,
}: PostItemRetweetProps) => {
 


  console.log("QuoteRtData =>", data);
  const { data: session, status } = useSession();

  const user = useSelector((state: any) => state.user);

  const [isDataLoaded, setIsDataLoaded] = useState(!!data.quoteId?.likeIds);
  const [isDataLoadedRT, setIsDataLoadedRT] = useState(
    !!data.quoteId?.retweets
  );

  const router = useRouter();

  const goToQuote = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/posts/${data.quoteIdDelete}`);
    },
    [router, data]
  );

  const goToPost = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/posts/${data.quoteId.postId._id}`);
    },
    [router, data]
  );

  useEffect(() => {
    setIsDataLoadedRT(!!data.quoteId?.retweets);
  }, [data.quoteId?.retweets]);

  useEffect(() => {
    setIsDataLoaded(!!data.quoteId?.likeIds);
  }, [data.quoteId?.likeIds]);

  const isLiked = useMemo(() => {
    if (!isDataLoaded) {
      return false; // O cualquier valor predeterminado según tu lógica
    }

    return (
      data.likeIds?.some((like: any) => like.userId === user?._id) ||
      data.postId?.likeIds?.some((like: any) => like.userId === user?._id) ||
      data.quoteId?.likeIds?.some((like: any) => like.userId === user?._id) ||
      false
    );
  }, [isDataLoaded, user?._id, data.quoteId.likeIds]);

  const isRetweet = useMemo(() => {
    if (!isDataLoadedRT) {
      return false; // O cualquier valor predeterminado según tu lógica
    }
    return (
      data.quoteId.retweets?.some(
        (retweet: any) => retweet.toString() === user?._id.toString()
      ) || false
    );
  }, [isDataLoadedRT, user?._id, data.quoteId.retweets]);

  const onLike = useCallback(
    async (event: any) => {
      event.stopPropagation();
      if (!session) {
        return loginModal.onOpen();
      }
      try {
        if (isLiked) {
          await axios.delete(
            `https://backlitter.onrender.com/likeQuote?postId=${data.quoteId._id}&currentUserId=${user?._id}`
          );
          toast.success("Quote Unliked");
          if (onRefresh) {
            onRefresh();
          }
        } else {
          // // Lógica para dar like
          await axios.post("https://backlitter.onrender.com/likeQuote", {
            postId: data.quoteId._id,
            currentUserId: user._id,
          });
          toast.success("Quote Liked");

          if (onRefresh) {
            onRefresh();
          }
        }
      } catch (error) {
        console.log("el error", error);
        toast.error("Something went wrong");
      }
    },
    [loginModal, user, data.quoteId.postId.id, session, isLiked, router]
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
            `https://backlitter.onrender.com/retweetsQuotes?quoteId=${data.quoteId._id}&userQuoteRetweet=${user?._id}`
          );
          toast.success("Quote Retweet Deleted");

          if (onRefresh) {
            onRefresh();
          }
        } else {
          await axios.post("https://backlitter.onrender.com/retweetsQuotes", {
            postId: data.quoteId._id,
            userQuoteRetweet: user._id,
          });
          toast.success("Quote Retweet Created");

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
    if (data.userQuoteRetweet) {
      return formatDistanceToNowStrict(new Date(data.quoteId.postId.createdAt));
    }
  }, [data.createdAt]);

  const createdAt2 = useMemo(() => {
    if (data.userQuoteRetweet) {
      return formatDistanceToNowStrict(new Date(data.quoteId.createdAt));
    }
  }, [data.createdAt]);

  return (
    <div>
      <div className="flex flex-row gap-x-2 items-center p-2">
        <AiOutlineRetweet className="text-neutral-500" size={15} />
        <p className="text-neutral-500 text-sm">
          {data.userQuoteRetweet?.username} Retweeteo
        </p>
      </div>
      <div>
        {/* Quote User */}
        <div className=" flex flex-row items-start gap-3" onClick={goToQuote}>
          <Avatar
            profileImage={data.quoteId.userQuote.profileImage}
            userId={data.quoteId.userQuote._id}
          />

          <div>
            <div className="flex flex-row items-center gap-2 ">
              <p className=" text-white font-semibold cursor-pointer hover:underline">
                {data.quoteId.userQuote.name}
              </p>
              <span
                onClick={goToUser}
                className=" text-neutral-500 cursor-pointer hover:underline hidden md:block"
              >
                @{data.quoteId.userQuote.username}
              </span>
              <span className=" text-neutral-500 text-sm">{createdAt2}</span>
            </div>
            <div className=" text-white mt-1 max-w-sm ">
              <p className="whitespace-pre-line break-words">
                {data.quoteId.body}
              </p>
            </div>
          </div>
        </div>
        {/* PostUser */}

        <div className="flex items-center justify-center  ">
          <div
            onClick={goToPost}
            className="hover:bg-neutral-800 w-[80%] flex flex-row items-start gap-3 border border-neutral-800 p-2 rounded-lg mt-2"
          >
            <Avatar
              profileImage={data.quoteId.postId.user?.profileImage}
              userId={data.quoteId.postId.user?._id}
            />

            <div>
              <div className="flex flex-row items-center gap-2 ">
                <p className=" text-white font-semibold cursor-pointer hover:underline">
                  {data.quoteId.postId.user?.name}
                </p>
                <span
                  onClick={goToUser}
                  className=" text-neutral-500 cursor-pointer hover:underline hidden md:block"
                >
                  @{data.quoteId.postId.user?.username}
                </span>
                <span className=" text-neutral-500 text-sm">{createdAt}</span>
              </div>
              <div className=" text-white mt-1 max-w-sm ">
                <p className="whitespace-pre-line break-words">
                  {data.quoteId.postId.body}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Features */}
        <div className=" flex flex-row  items-center  mt-3 gap-10 ">
          <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500 ml-[10%]">
            <AiOutlineMessage size={20} />
            <p>{data.quoteId.comments?.length || 0}</p>
          </div>
          {/* Retweet & Quote Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-emerald-500">
                {isRetweet ? (
                  <AiOutlineRetweet className="text-emerald-500" size={20} />
                ) : (
                  <AiOutlineRetweet size={20} />
                )}
                <p>{data.quoteId.retweets?.length || 0}</p>
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
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

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

            <p>{data.quoteId.likeIds?.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteItemRetweet;
