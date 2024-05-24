"use client";

import { useState, useEffect, ReactNode } from "react";

const Loading = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  return (
    <>
      {loading ? (
        <div className="h-screen grid place-content-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default Loading;
