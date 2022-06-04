import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hooks/use-input";
import { cartSliceActions } from "../../redux/features/cartSlice";
import { showCart } from "../../redux/features/uiSlice";
import getCompanys from "../../redux/actions/getCompanys";
import Closesvg from "../svg/CloseSvg";
import ErrorSvg from "../svg/ErrorSvg";
import Cartitem, { formatMoney } from "./CartItem";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import createContract from "../../redux/actions/createContract";
import { useState } from "react";

const isDuration = (value) => value.trim() !== "";
const isCompany = (value) => value.trim() !== "";

const Cart = () => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);
  const { companys } = useSelector((state) => state.company);
  const hasItems = items.length > 0;
  const navigate = useNavigate();

  const {
    value: durationValue,
    isValid: durationIsValid,
    hasError: durationHasError,
    valueChangeHandler: durationChangeHandler,
    inputBlurHandler: durationBlurHandler,
    reset: resetDuration,
  } = useInput(isDuration);

  const {
    value: companyValue,
    isValid: companyIsValid,
    hasError: companyHasError,
    valueChangeHandler: companyChangeHandler,
    inputBlurHandler: companyBlurHandler,
    reset: resetCompany,
  } = useInput(isCompany);

  useEffect(() => {
    dispatch(getCompanys());
  }, [dispatch]);

  let formIsValid = false;

  if (durationIsValid && hasItems && companyIsValid) {
    formIsValid = true;
  }

  const closeCartHandler = () => {
    dispatch(showCart());
  };
  const cartItemRemoveHandler = (id) => {
    dispatch(cartSliceActions.removeItemFromCart(id));
  };
  const cartItemAddHandler = (item) => {
    dispatch(cartSliceActions.addItemToCart(item));
  };

  const deleteItem = (id) => {
    dispatch(cartSliceActions.deleteItem(id));
  };

  const createContractHandler = () => {
    if (!formIsValid) {
      return;
    }

    let data = {};

    data = {
      duration: durationValue,
      userId: companyValue,
      contract_services: items,
    };
    dispatch(createContract({ data, navigate, toast }));
    // dispatch(cartSliceActions.clearCart())
    dispatch(showCart());

    resetCompany();
    resetDuration();
  };

  const checkedHandler = () => {
    setChecked(!checked);
  };
  return (
    <div className="flex  absolute w-screen h-screen  flex-col items-center justify-center bg-transparentBlack">
      <div className="flex flex-col  h-fit bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md lg:w-3/5 sm:w-4/5  overflow-auto">
        <div className="">
          <button className=" float-right " onClick={closeCartHandler}>
            <span className=" ">
              <Closesvg />
            </span>
          </button>
        </div>

        {items.map((item) => (
          <Cartitem
            key={item.id}
            item={item}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
            onDelete={deleteItem.bind(null, item.id)}
          />
        ))}

        <div className="mt-4  ">
          {hasItems && (
            <>
              <div className="flex  items-center">
                <button onClick={checkedHandler}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-8 w-8 mr-2  border border-gray fill-${
                      checked ? "green" : "gray"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <span className="text-sm ">Click if Done Adding Services</span>
              </div>

              <h1>Total Price: {formatMoney(totalAmount)} NGN </h1>
            </>
          )}

          {!hasItems && (
            <div className="text-center font-bold">
              <h1>No Service In The Cart</h1>
            </div>
          )}
        </div>
        {hasItems && checked && (
          <div className="flex flex-col mb-6">
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
                  "text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 focus:outline-alml border border-gray w-full py-2"
                }
                placeholder="Contract Duration"
              />
            </div>
            {durationHasError && (
              <ErrorSvg message={"Contract Duration Field is Required"} />
            )}
          </div>
        )}

        {hasItems && checked && (
          <div className="flex flex-col mb-6">
            <label htmlFor="default" className="block mb-2 text-lg font-medium">
              Choose Company
            </label>

            <div className="">
              <select
                onChange={companyChangeHandler}
                onBlur={companyBlurHandler}
                value={companyValue}
                className="bg-gray   mb-6 text-sm border-none   block w-full py-2 pl-10 pr-4 focus:outline-alml"
              >
                <option defaultValue={""}>Choose a Company</option>
                {companys &&
                  companys.map((company) => (
                    <option value={company.id} key={company.id} className="">
                      {company.name}
                    </option>
                  ))}
              </select>
            </div>

            {companyHasError && (
              <ErrorSvg message={"Company Field is Required"} />
            )}
          </div>
        )}

        <div className=" flex items-center justify-center ">
          {hasItems && (
            <button
              onClick={createContractHandler}
              className={`${
                !formIsValid
                  ? "bg-gray cursor-not-allowed"
                  : "bg-gradient-to-r from-alml to-lightpurple"
              } flex items-center justify-center focus:outline-none text-white text-sm sm:text-base   rounded py-2 w-1/4 transition duration-150 ease-in`}
            >
              Create
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
