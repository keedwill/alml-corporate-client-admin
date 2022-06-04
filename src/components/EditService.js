import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import fileBase from "react-file-base64";
import { useNavigate } from "react-router-dom";
import Collectionsvg from "./svg/CollectionSvg";
import Feesvg from "./svg/FeeSvg";
import { useDispatch, useSelector } from "react-redux";
import updateService from "../redux/actions/updateService";

const Editservice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { error, loading } = useSelector((state) => state.service);
  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(updateService(id,{}));
  };
  return (
    <div className="flex   w-full h-screen   flex-col items-center  justify-center   ">
      <div className="flex flex-col h-fit overflow-auto   bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="font-bold self-center text-xl sm:text-2xl uppercase text-gray-800">
          Edit Service
        </div>
        <div className="mt-10 bg-white p-4">
          <form onSubmit={formSubmitHandler}>
            <div className="flex flex-col mb-6">
              <label
                htmlFor=""
                className="mb-1 text-lg text-black tracking-wide"
              >
                Service Name:
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <span>
                    <Collectionsvg />
                  </span>
                </div>

                <input
                  id=""
                  type="text"
                  name="category"
                  className="text-sm sm:text-base  bg-gray pl-10 pr-4   border-gray w-full py-2 focus:outline-none"
                  placeholder="Service name"
                />
              </div>
            </div>

            <div className="flex flex-col mb-6">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Service Description
              </label>
              <textarea
                rows="4"
                className="block py-2 pl-10 pr-4  w-full text-sm focus:outline-alml  bg-gray "
                placeholder="Service Description..."
              ></textarea>
            </div>

            <div className="flex flex-col mb-6">
              <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                Service Fee (₦):
              </label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10">
                  <span>
                    <Feesvg />
                  </span>
                </div>

                <input
                  type="number"
                  className="text-sm sm:text-base placeholder-gray bg-gray pl-10 pr-4   w-full py-2 focus:outline-alml"
                  placeholder="Service Fee"
                />
              </div>
            </div>

            <div className="flex flex-col mb-6">
              <label
                htmlFor="default"
                className="block mb-2 text-sm font-medium"
              >
                Choose Service Status
              </label>

              <div className="relative">
                <div className="inline-flex  items-center justify-center absolute left-0 top-0 h-full w-10">
                  <span className="mb-6">
                    <Collectionsvg stroke={"stroke-alml"} />
                  </span>
                </div>
                <select className="bg-gray   mb-6 text-sm border-none   block w-full py-2 pl-10 pr-4 focus:outline-alml">
                  <option defaultValue={""}>Choose a status</option>

                  <option value={"active"} className="">
                    Active
                  </option>

                  <option value={"inactive"} className="">
                    inactive
                  </option>
                </select>
              </div>
            </div>

            <div className="flex w-full">
              <button
                type="submit"
                className={`${"bg-gradient-to-r from-alml to-lightpurple"} flex items-center justify-center focus:outline-none text-white text-sm sm:text-base   rounded py-2 w-full transition duration-150 ease-in`}
              >
                <span className="mr-2 uppercase">Update Service</span>
                <span>
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
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editservice;
