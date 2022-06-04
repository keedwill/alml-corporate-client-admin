import React from "react";

const Plussvg = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${props.h ? props.h : "h-6"} ${props.w ? props.w : "w-6"} ${props.stroke ? props.stroke : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  );
};

export default Plussvg;
