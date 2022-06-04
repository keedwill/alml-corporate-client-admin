import React from "react";

const Menusvg = (props) => {
  const openMenu = () => {
    props.openFunction();
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 absolute  bg-white cursor-pointer border border-gray -right-3 top-9 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      onClick={openMenu}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
};

export default Menusvg;
