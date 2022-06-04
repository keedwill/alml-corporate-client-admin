import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loadingtoredirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div className="flex  absolute w-full h-screen  flex-col items-center justify-center bg-transparentBlack">
      <div className="min-h-screen flex flex-col   justify-center items-center   ">
        <div className="  flex flex-col items-center bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md  max-w-md">
          <div className="flex justify-center items-center">
            <h1>Redirecting You in {count} seconds</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loadingtoredirect;
