import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Closesvg from "./svg/CloseSvg";
import { showServiceForm } from "../redux/features/uiSlice";
import Feesvg from "./svg/FeeSvg";
import Collectionsvg from "./svg/CollectionSvg";
import Plussvg from "./svg/PlusSvg";
import useInput from "../hooks/use-input";
import ErrorSvg from "./svg/ErrorSvg";

import { toast } from "react-toastify";
import createService from "../redux/actions/createService";
import Spinnersvg from "./svg/SpinnerSvg";
import getCategorys from "../redux/actions/getCategorys";

const isService = (value) => value.trim() !== "";
const isCategory = (value) => value.trim() !== "";
const isDescription = (value) => value.trim() !== "";
const isFee = (value) => value.trim() !== "";

const Addservice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categorys } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(getCategorys());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { error, loading } = useSelector((state) => state.service);
  const {
    value: serviceValue,
    isValid: serviceIsValid,
    hasError: serviceHasError,
    valueChangeHandler: serviceChangeHandler,
    inputBlurHandler: serviceBlurHandler,
    reset: resetService,
  } = useInput(isService);

  const {
    value: categoryValue,
    isValid: categoryIsValid,
    hasError: categoryHasError,
    valueChangeHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
    reset: resetCategory,
  } = useInput(isCategory);

  const {
    value: feeValue,
    isValid: feeIsValid,
    hasError: feeHasError,
    valueChangeHandler: feeChangeHandler,
    inputBlurHandler: feeBlurHandler,
    reset: resetFee,
  } = useInput(isFee);

  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription,
  } = useInput(isDescription);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  let formIsValid = false;
  const closeServiceFormHandler = () => {
    dispatch(showServiceForm());
  };

  if (descriptionIsValid && feeIsValid && categoryIsValid && serviceIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    dispatch(
      createService({
        descriptionValue,
        serviceValue,
        categoryValue,
        feeValue,
        navigate,
        toast,
      })
    );

    resetService();
    resetCategory();
    resetFee();
    resetDescription();
  };

  return (
    <div className=" flex  absolute w-screen h-screen  flex-col items-center   justify-center bg-transparentBlack  ">
      <div className="flex flex-col h-fit overflow-auto  bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <div className="">
          <button className=" float-right" onClick={closeServiceFormHandler}>
            <span className="">
              <Closesvg />
            </span>
          </button>
        </div>
        <div className="font-bold self-center text-xl sm:text-2xl uppercase text-gray-800">
          Create Service
        </div>

        <div className="mt-10">
          <form onSubmit={formSubmitHandler}>
            <div className="flex flex-col mb-6">
              <label className="mb-1  sm:text-sm tracking-wide">
                Service Name:
              </label>
              <div className="relative">
                <input
                  onChange={serviceChangeHandler}
                  onBlur={serviceBlurHandler}
                  value={serviceValue}
                  type="text"
                  className={
                    "text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 focus:outline-alml   bg-gray w-full py-2"
                  }
                  placeholder="Service Name"
                />
              </div>
              {serviceHasError && (
                <ErrorSvg message={"Service Name Field is Required"} />
              )}
            </div>

            <div className="flex flex-col mb-6">
              <label
                htmlFor="default"
                className="block mb-2 text-sm font-medium"
              >
                Choose Category
              </label>

              <div className="relative">
                <div className="inline-flex  items-center justify-center absolute left-0 top-0 h-full w-10">
                  <span className="mb-6">
                    <Collectionsvg stroke={"stroke-alml"} />
                  </span>
                </div>
                <select
                  onChange={categoryChangeHandler}
                  onBlur={categoryBlurHandler}
                  value={categoryValue}
                  className="bg-gray   mb-6 text-sm border-none   block w-full py-2 pl-10 pr-4 focus:outline-alml"
                >
                  <option defaultValue={""}>Choose a category</option>
                  {categorys &&
                    categorys.map((category) => (
                      <option
                        value={category.id}
                        key={category.id}
                        className=""
                      >
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>

              {categoryHasError && (
                <ErrorSvg message={"Category Field is Required"} />
              )}
            </div>

            <div className="flex flex-col mb-6">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Service Description
              </label>
              <textarea
                value={descriptionValue}
                onChange={descriptionChangeHandler}
                onBlur={descriptionBlurHandler}
                rows="4"
                className="block py-2 pl-10 pr-4  w-full text-sm focus:outline-alml  bg-gray "
                placeholder="Service Description..."
              ></textarea>
              {descriptionHasError && (
                <ErrorSvg message={"Description Field is Required"} />
              )}
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
                  value={feeValue}
                  onChange={feeChangeHandler}
                  onBlur={feeBlurHandler}
                  className="text-sm sm:text-base placeholder-gray bg-gray pl-10 pr-4   w-full py-2 focus:outline-alml"
                  placeholder="Service Fee"
                />
              </div>

              {feeHasError && <ErrorSvg message={"Fee Field is Required"} />}
            </div>

            <div className="flex w-full">
              <button
                type="submit"
                className={`${
                  !formIsValid
                    ? "bg-gray cursor-not-allowed"
                    : "bg-gradient-to-r from-alml to-lightpurple"
                } flex items-center justify-center focus:outline-none text-white text-sm sm:text-base   rounded py-2 w-full transition duration-150 ease-in`}
              >
                <span className="mr-2 uppercase">Create</span>
                <span>
                  {" "}
                  {loading && <Spinnersvg />}
                  {!loading && <Plussvg />}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addservice;
