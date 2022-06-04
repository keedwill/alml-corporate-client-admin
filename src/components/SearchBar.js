import React from "react";

const Searchbar = (props) => {

  return (
    <div className="flex justify-center items-center  px-7 pt-2 ">
      <div className="input-group relative flex flex-wrap items-stretch w-2/5 mb-4  justify-center ">
        <input
          value={props.value}
          onChange={props.onChange}
          type="search"
          className="form-control mb-2 relative flex-auto min-w-0 block w-full px-3 py-2 text-base font-normal  bg-white bg-clip-padding border border-solid border-gray rounded transition ease-in-out m-0   focus:outline-none"
          placeholder="Search"
        />
        <button
          disabled={!props.valueIsValid}
          className={`
            ${
              !props.valueIsValid
                ? "bg-gray cursor-not-allowed"
                : "bg-gradient-to-r from-alml to-lightpurple"
            }
          btn  px-6 py-2.5  text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg   focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-200 ease-in-out flex items-center`}
          type="button"
          onClick={props.click}
        >
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
