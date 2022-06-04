import React, { Fragment, useEffect } from "react";
import Addusersvg from "../svg/AddUserSvg";
import { Link, useNavigate } from "react-router-dom";
import Loginsvg from "../svg/LoginSvg";
import Passwordsvg from "../svg/PasswordSvg";
import Emailsvg from "../svg/EmailSvg";
import useInput from "../../hooks/use-input";
import ErrorSvg from "../svg/ErrorSvg";
import SpinnerSvg from "../svg/SpinnerSvg";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import register from "../../redux/actions/auth/register";

const isPassword = (value) => value.trim() !== "";
const isPassword2 = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@") && value.trim() !== "";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isPassword);
  const {
    value: password2Value,
    isValid: password2IsValid,
    hasError: password2HasError,
    valueChangeHandler: password2ChangeHandler,
    inputBlurHandler: password2BlurHandler,
    reset: resetPassword2,
  } = useInput(isPassword2);
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  let passwordCompare = false;

  let formIsValid = false;
  if (emailIsValid && passwordIsValid && password2IsValid) {
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
    dispatch(register({ emailValue, passwordValue, password2Value, navigate, toast }));
    resetEmail();
    resetPassword();
    resetPassword2();
  };
  return (
    <Fragment>
      <div className="min-h-screen bg-gradient-to-r from-alml to-lightpurple flex flex-col items-center justify-center ">
        <div className="flex flex-col bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
          <div className="font-bold self-center text-xl sm:text-2xl uppercase text-gray-800">
            Admin Register
          </div>

          <div className="mt-10">
            <form onSubmit={formSubmitHandler}>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="email"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  E-Mail Address:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <Emailsvg />
                  </div>

                  <input
                    id="email"
                    value={emailValue}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    type="email"
                    name="email"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-full  border-gray-400 bg-gray w-full py-2 focus:outline-none "
                    placeholder="E-Mail Address"
                  />
                </div>
                {emailHasError && <ErrorSvg message={"Email is invalid"} />}
              </div>
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
                {passwordHasError && (
                  <ErrorSvg message={"Password is invalid"} />
                )}
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
                  <span className="mr-2 uppercase">Register</span>
                  <span>
                    {loading && <SpinnerSvg />}
                    {!loading && <Loginsvg />}
                  </span>
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-center items-center mt-6">
            <Link
              to={"/login"}
              className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center"
            >
              <span>
                <Addusersvg />
              </span>
              <span className="ml-2 hover:text-lightpurple">
                Already have an account?
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
