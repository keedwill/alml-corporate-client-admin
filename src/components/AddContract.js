import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cartsvg from "./svg/CartSvg";

import getServices from "../redux/actions/getServices";

import { toast } from "react-toastify";
import ErrorSvg from "./svg/ErrorSvg";

import useInput from "../hooks/use-input";

import Plussvg from "./svg/PlusSvg";
import { cartSliceActions } from "../redux/features/cartSlice";

import { showCart } from "../redux/features/uiSlice";

const isService = (value) => value.trim() !== "";

const isFee = (value) => value.trim() !== "";

const Addcontract = () => {
  const { services, error } = useSelector((state) => state.service);

  const { items } = useSelector((state) => state.cart);

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.quantity;
  }, 0);

  const dispatch = useDispatch();
  const {
    value: serviceValue,
    isValid: serviceIsValid,
    hasError: serviceHasError,
    valueChangeHandler: serviceChangeHandler,
    inputBlurHandler: serviceBlurHandler,
    reset: resetService,
  } = useInput(isService);
  const {
    value: feeValue,
    isValid: feeIsValid,
    hasError: feeHasError,
    valueChangeHandler: feeChangeHandler,
    inputBlurHandler: feeBlurHandler,
    reset: resetFee,
  } = useInput(isFee);

  const { error: contractError } = useSelector((state) => state.contract);

  useEffect(() => {
    contractError && toast.error(contractError);
  }, [contractError]);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  let formIsValid = false;

  if (feeIsValid && serviceIsValid) {
    formIsValid = true;
  }

  const showCartHandler = () => {
    dispatch(showCart());
  };

  const addToCartHandler = (id) => {
    if (!formIsValid) {
      return;
    }
    let item = {};
    let singleService = services.find((service) => service.id === id);
    item = { ...singleService, agreedFee: feeValue, quantity: 1 };

    dispatch(cartSliceActions.addItemToCart(item));
    dispatch(showCart());

    resetFee();

    resetService();
  };

  return (
    <div className="p-7  font-semibold flex-1  h-screen overflow-auto overflow-x-auto w-full">
      <div className=" flex p-1  justify-center ">
        <h1 className="lg:text-3xl md:text-2xl  sm:text-sm  text-center flex items-center justify-center   ">
          Create Contract
        </h1>
      </div>
      <hr className="border-gray " />
      <div className="flex">
        <div className="flex  w-full  items-center justify-center mt-2  ">
          <div className="bg-white p-4  lg:w-2/5 sm:w-full ">
            <div className="flex  mb-6 justify-end ">
              <button className="flex  " onClick={showCartHandler}>
                <span className=" ">
                  <Cartsvg />
                </span>
                <span className="bg-gold absolute  border-transparent font-bold text-white rounded-3xl p-1 ml-9 ">
                  {numberOfCartItems}
                </span>
              </button>
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="default"
                className="block mb-2 text-lg font-medium"
              >
                Choose Service
              </label>

              <div className="">
                {/* <div className="inline-flex  items-center justify-center absolute left-0 top-0 h-full w-10">
                    <span className="mb-6">
                      <Collectionsvg stroke={"stroke-alml"} />
                    </span>
                  </div> */}
                <select
                  onChange={serviceChangeHandler}
                  onBlur={serviceBlurHandler}
                  value={serviceValue}
                  className="bg-gray   mb-6 text-sm border-none   block w-full py-2 pl-10 pr-4 focus:outline-alml"
                >
                  <option defaultValue={""}>Choose a Service</option>
                  {services &&
                    services.map((service) => (
                      <option value={service.id} key={service.id} className="">
                        {service.name} ({service.description}) ₦{service.fee}
                      </option>
                    ))}
                </select>
              </div>

              {serviceHasError && (
                <ErrorSvg message={"Service Field is Required"} />
              )}
            </div>

            <div className="flex flex-col mb-6">
              <label className="mb-1 text-lg font-normal">
                Agreed Fee (₦):
              </label>
              <div className="">
                {/* <div className="inline-flex items-center justify-center absolute   left-0 top-0 h-full w-10">
                    <span>
                      <Feesvg />
                    </span>
                  </div> */}

                <input
                  type="number"
                  value={feeValue}
                  onChange={feeChangeHandler}
                  onBlur={feeBlurHandler}
                  className="text-sm sm:text-base placeholder-gray bg-gray pl-10 pr-4    w-full py-2 focus:outline-alml"
                  placeholder="Agreed Fee"
                />
              </div>

              {feeHasError && (
                <ErrorSvg message={"Agreed Fee Field is Required"} />
              )}
            </div>

            <div className="flex w-full">
              <button
                onClick={addToCartHandler.bind(null, serviceValue)}
                type="submit"
                className={`${
                  !formIsValid
                    ? "bg-gray cursor-not-allowed"
                    : "bg-gradient-to-r from-alml to-lightpurple"
                } flex items-center justify-center focus:outline-none text-white text-sm sm:text-base   rounded py-2 w-full transition duration-150 ease-in`}
              >
                <span className="mr-2 uppercase">Add to Cart</span>
                <span>
                  {" "}
                  <Plussvg />
                </span>
              </button>
            </div>

            {/* <div className="flex flex-col mb-6">
                <label className="mb-1  text-lg font-thin">
                  Contract Duration Year(s):
                </label>
                <div className="relative">
                  <input
                    onChange={durationChangeHandler}
                    onBlur={durationBlurHandler}
                    value={durationValue}
                    type="number"
                    className={
                      "text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 focus:outline-alml   bg-gray w-full py-2"
                    }
                    placeholder="Contract Duration"
                  />
                </div>
                {durationHasError && (
                  <ErrorSvg message={"Contract Duration Field is Required"} />
                )}
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addcontract;
