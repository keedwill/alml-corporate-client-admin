import React from 'react';

const ErrorSvg = (props) => {
  return (
    <div
      className="p-2 mb-2 mt-2 text-sm text-red bg-lightred  dark:bg-red dark:text-red"
      role="alert"
    >
      <span className="font-medium">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>{" "}
      {props.message}
    </div>
  );
};

export default ErrorSvg;
