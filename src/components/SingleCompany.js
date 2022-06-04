import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSingleCompany } from "../redux/features/uiSlice";
import Closesvg from "./svg/CloseSvg";
import Printsvg from "./svg/PrintSvg";

const Singlecompany = () => {
  const { company } = useSelector((state) => state.company);


  const dispatch = useDispatch();
  const closeSingleCompanyHandler = () => {
    dispatch(showSingleCompany());
  };
  return (
    <div className="flex  absolute w-full h-screen items-center  flex-col  bg-transparentBlack p-6  ">
      <div className="flex flex-col  h-fit bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-4/5 ">
        <div className="">
          <button
            className="float-right hover:bg-gray p-1"
            onClick={closeSingleCompanyHandler}
          >
            <span className="">
              <Closesvg />
            </span>
          </button>
          <button
            className="float-left flex
           hover:bg-gray p-1"
          >
            <span className="mr-1">
              <Printsvg />
            </span>
            <span className="text-alml">Print</span>
          </button>
        </div>

        <img
          src={company[0].image}
          className="inline object-cover w-16 h-16 mr-2 rounded-full"
          alt="COMPANY LOGO"
        />
      </div>
    </div>
  );
};

export default Singlecompany;
