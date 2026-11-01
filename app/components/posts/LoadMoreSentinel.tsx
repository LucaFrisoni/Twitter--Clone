// Invisible marker at the end of a feed that asks for the next page before the user reaches it.
"use client";
import React, { useEffect, useRef } from "react";
import { ClipLoader } from "react-spinners";

interface LoadMoreSentinelProps {
  onVisible: () => void;
}

const LoadMoreSentinel: React.FC<LoadMoreSentinelProps> = ({ onVisible }) => {
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onVisible();
      },
      { rootMargin: "600px" }
    );
    if (sentinel.current) observer.observe(sentinel.current);

    return () => observer.disconnect();
  }, [onVisible]);

  return (
    <div ref={sentinel} className="flex justify-center p-4">
      <ClipLoader color="lightblue" size={32} />
    </div>
  );
};

export default LoadMoreSentinel;
