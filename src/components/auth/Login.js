import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../../hooks/use-input";
import Addusersvg from "../svg/AddUserSvg";
import Emailsvg from "../svg/EmailSvg";
import ErrorSvg from "../svg/ErrorSvg";
import Loginsvg from "../svg/LoginSvg";
import Passwordsvg from "../svg/PasswordSvg";
import SpinnerSvg from "../svg/SpinnerSvg";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import login from "../../redux/actions/auth/login";

const isPassword = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@") && value.trim() !== "";

const Login = () => {
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

  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    dispatch(login({ emailValue, passwordValue, navigate, toast }));

    resetEmail();
    resetPassword();
  };

  return (
    <Fragment>
      <div className="min-h-screen bg-gradient-to-r from-alml to-lightpurple flex flex-col items-center justify-center ">
        <motion.div
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
            transition: {
              duration: 0.4,
            },
          }}
          exit={{
            scale: 0,
          }}
          className="flex flex-col bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md"
        >
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                delay: 0.5,
                duration: 0.3,
              },
            }}
            className="font-bold self-center text-xl sm:text-2xl uppercase text-gray-800"
          >
            Admin Login
          </motion.div>

          <div className="mt-10">
            <form onSubmit={formSubmitHandler}>
              <div
                
                className="flex flex-col mb-6"
              >
                <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  E-Mail Address:
                </label>
                <div className="relative">
                  <Emailsvg />

                  <input
                    onChange={emailChangeHandler}
                    id="email"
                    type="email"
                    name="email"
                    onBlur={emailBlurHandler}
                    value={emailValue}
                    className={
                      "text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 focus:outline-alml   bg-gray w-full py-2"
                    }
                    placeholder="E-Mail Address"
                  />
                </div>
                {emailHasError && <ErrorSvg message={"Email is invalid"} />}
              </div>
              <div
                className="flex flex-col mb-6">
                <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
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
                    className="text-sm sm:text-base placeholder-gray-500 bg-gray pl-10 pr-4   w-full py-2 focus:outline-alml"
                    placeholder="Password"
                  />
                </div>
                {passwordHasError && (
                  <ErrorSvg message={"Password is invalid"} />
                )}
              </div>

              <div className="flex items-center mb-6 -mt-4">
                <div className="flex ml-auto">
                  <a
                    href="/"
                    className="inline-flex text-xs sm:text-sm text-blue-500 hover:text-lightpurple"
                  >
                    Forgot Your Password?
                  </a>
                </div>
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
                  <span className="mr-2 uppercase">Login</span>
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
              to={"/register"}
              className="inline-flex items-center font-bold text-blue-500 hover:text-blue-700 text-xs text-center"
            >
              <span>
                <Addusersvg />
              </span>
              <span className="ml-2 hover:text-lightpurple">
                You don't have an account?
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </Fragment>
  );
};

export default Login;
