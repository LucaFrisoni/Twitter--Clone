// Feed spinner that explains the wait when the sleeping backend takes long to wake up.
"use client";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const SLOW_LOAD_MS = 4000;

const FeedLoader = () => {
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsSlow(true), SLOW_LOAD_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-4 flex flex-col gap-4 justify-center items-center">
      <ClipLoader color="lightblue" size={80} />
      {isSlow && (
        <p className="text-neutral-500 text-center px-4">
          The server is waking up, this can take up to a minute
        </p>
      )}
    </div>
  );
};

export default FeedLoader;
