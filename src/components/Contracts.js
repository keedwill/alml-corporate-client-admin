import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import getContracts from "../redux/actions/getContracts";
import Spinnersvg from "./svg/SpinnerSvg";
import moment from "moment";
import { showSingleContract } from "../redux/features/uiSlice";
import { displaySingleContract } from "../redux/features/contractSlice.js";

const Contracts = () => {
  const dispatch = useDispatch();
  const { contracts, loading, error } = useSelector((state) => state.contract);


  useEffect(() => {
    dispatch(getContracts());
  }, []);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const showSingleContractHandler = (id) => {
   
    dispatch(displaySingleContract(id));
    dispatch(showSingleContract());
  };
  return (
    <Fragment>
      {loading && (
        <div className="min-h-screen flex flex-col   justify-center items-center   ">
          <div className="  flex flex-col items-center bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md  max-w-md">
            <div className="flex justify-center items-center">
              <Spinnersvg fill={"fill-lightpurple"} />
              <h1> Loading...</h1>
            </div>
          </div>
        </div>
      )}
      {contracts.length === 0 && (
        <div className="min-h-screen flex flex-col   justify-center items-center  ">
          <div className="  flex flex-col items-center bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md  max-w-md">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <h1>Sorry! There are No Contracts</h1>
          </div>
        </div>
      )}
      {contracts.length > 0 && (
        <div className="p-7  font-semibold flex-1 h-screen  ">
          <h1 className="text-4xl mb-4">Contracts</h1>

          <table className=" border-collapse  bg-white ...">
            <thead>
              <tr className="">
                <th className=" p-2  ...">Contract ID</th>
                <th className=" p-2   ...">Company Name</th>
                <th className=" p-2   ...">Company Email</th>
                <th className=" p-2   ...">Contract Status</th>
                <th className=" p-2   ...">Created At</th>
                <th className=" p-2   ...">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract) => (
                <tr className="text-black font-light" key={contract.id}>
                  <td className=" p-4  ...">{contract.id}</td>
                  <td className=" p-4  capitalize ...">{contract.user.name}</td>
                  <td className=" p-4  ...">{contract.user.email}</td>
                  <td className=" p-4  ...">{contract.status}</td>

                  <td className=" p-4  ...">
                    {moment(contract.createdAt).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </td>
                  <td className=" p-4 ...">
                    {moment(contract.updatedAt).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </td>
                  <td className=" p-4 ...">
                    <button
                      className="flex items-center justify-center p-2 text-skyblue "
                      onClick={showSingleContractHandler.bind(
                        this,
                        contract.id
                      )}
                    >
                      View Contract
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Fragment>
  );
};

export default Contracts;
