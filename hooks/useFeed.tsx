// Loads a timeline page by page and keeps it in sync after likes, retweets or new tweets.
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

const POSTS_URL = "https://backlitter.onrender.com/posts";
const PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

const fetchPage = async (limit: number, userId?: string, last?: any) => {
  const { data } = await axios.get(POSTS_URL, {
    params: { limit, userId, before: last?.createdAt, beforeId: last?._id },
  });
  return Array.isArray(data) ? data : [];
};

// Vuelve a pedir lo ya cargado para que refrescar no pierda el scroll del usuario
const fetchFirstItems = async (target: number, userId?: string) => {
  let items: any[] = [];
  let hasMore = true;

  while (hasMore && items.length < target) {
    const limit = Math.min(target - items.length, MAX_PAGE_SIZE);
    const page = await fetchPage(limit, userId, items[items.length - 1]);
    items = [...items, ...page];
    hasMore = page.length === limit;
  }
  return { items, hasMore };
};

const useFeed = (userId?: string) => {
  const [tweets, setTweets] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadedItems = useRef<any[]>([]);
  const latestRequest = useRef(0);
  const isFetching = useRef(false);

  const applyPage = (items: any[], more: boolean) => {
    loadedItems.current = items;
    setTweets(items);
    setHasMore(more);
    setIsLoaded(true);
  };

  // Solo aplica la respuesta si no la reemplazo un refresh mas nuevo
  const runRequest = useCallback(async (request: () => Promise<any>) => {
    const requestId = ++latestRequest.current;
    isFetching.current = true;
    try {
      const { items, hasMore: more } = await request();
      if (requestId === latestRequest.current) applyPage(items, more);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      if (requestId === latestRequest.current) isFetching.current = false;
    }
  }, []);

  const refresh = useCallback(() => {
    const target = Math.max(loadedItems.current.length, PAGE_SIZE);
    return runRequest(() => fetchFirstItems(target, userId));
  }, [runRequest, userId]);

  const loadMore = useCallback(() => {
    if (isFetching.current) return;
    const current = loadedItems.current;
    return runRequest(async () => {
      const last = current[current.length - 1];
      const page = await fetchPage(PAGE_SIZE, userId, last);
      return {
        items: [...current, ...page],
        hasMore: page.length === PAGE_SIZE,
      };
    });
  }, [runRequest, userId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { tweets, hasMore, isLoaded, refresh, loadMore };
};

export default useFeed;
