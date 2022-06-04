import React from "react";
import { useParams } from "react-router-dom";

import Passwordsvg from "../components/svg/PasswordSvg";

import useInput from "../hooks/use-input";
import ErrorSvg from "../components/svg/ErrorSvg";
import Loginsvg from "./svg/LoginSvg";

const isPassword = (value) => value.trim() !== "";
const isPassword2 = (value) => value.trim() !== "";

const Profile = () => {
//   const { id } = useParams();
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isPassword);
  let {
    value: password2Value,
    isValid: password2IsValid,
    hasError: password2HasError,
    valueChangeHandler: password2ChangeHandler,
    inputBlurHandler: password2BlurHandler,
    reset: resetPassword2,
  } = useInput(isPassword2);

 
  let passwordCompare = false;
  let formIsValid = false;
  if (passwordIsValid && password2IsValid) {
    if (passwordValue === password2Value) {
      formIsValid = true;
    } else {
      formIsValid = false;
      passwordCompare = true;
    }
  }



  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    console.log("submitted");
    console.log(passwordValue, password2Value);

    resetPassword();
    resetPassword2();
  };
  return (
    <div className="p-7  font-semibold flex-1  h-screen ">
      <div className="font-bold self-center text-xl sm:text-2xl uppercase text-gray-800">
        Admin Profile
      </div>
      <div className="mt-10">
        <form onSubmit={formSubmitHandler}>
          <div className="flex flex-col mb-6">
            <label
              htmlFor="password"
              className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
            >
              Password:
            </label>
            <div className="relative">
              <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <span>
                  <Passwordsvg />
                </span>
              </div>

              <input
                id="password"
                onChange={passwordChangeHandler}
                value={passwordValue}
                onBlur={passwordBlurHandler}
                type="password"
                name="password"
                className="text-sm sm:text-base placeholder-gray-500 bg-gray pl-10 pr-4 rounded-full  border-gray-400 w-full py-2 focus:outline-none"
                placeholder="Password"
              />
            </div>
            {passwordHasError && <ErrorSvg message={"Password is invalid"} />}
          </div>

          <div className="flex flex-col mb-6">
            <label
              htmlFor="password"
              className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
            >
              Confirm Password:
            </label>
            <div className="relative">
              <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                <span>
                  <Passwordsvg />
                </span>
              </div>

              <input
                onChange={password2ChangeHandler}
                value={password2Value}
                onBlur={password2BlurHandler}
                id="password2"
                type="password"
                name="password2"
                className="text-sm sm:text-base placeholder-gray-500 bg-gray pl-10 pr-4 rounded-full  border-gray-400 w-full py-2 focus:outline-none"
                placeholder="Confirm Password"
              />
            </div>
            
            {(password2HasError || password2Value
              ? passwordCompare
              : false) && <ErrorSvg message={"Passwords Do Not Match"} />}
          </div>

          <div className="flex w-full">
            <button
              disabled={!formIsValid}
              type="submit"
              className={`${
                !formIsValid
                  ? "bg-gray cursor-not-allowed"
                  : "bg-gradient-to-r from-alml to-lightpurple"
              } flex items-center justify-center focus:outline-none text-white text-sm sm:text-base   rounded py-2 w-full transition duration-150 ease-in`}
            >
              <span className="mr-2 uppercase">Update</span>
              <span>
                <Loginsvg />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
