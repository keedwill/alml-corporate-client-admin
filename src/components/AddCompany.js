import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/use-input";
import { showCompanyForm } from "../redux/features/uiSlice";
import Closesvg from "./svg/CloseSvg";
import Emailsvg from "./svg/EmailSvg";
import ErrorSvg from "./svg/ErrorSvg";
import Spinnersvg from "./svg/SpinnerSvg";
import PlusSvg from "./svg/PlusSvg";
import Passwordsvg from "./svg/PasswordSvg";
import Filebase from "react-file-base64";
import createCompany from "../redux/actions/createCompany";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const isCompany = (value) => value.trim() !== "";
const isEmail = (value) => value.trim() !== "";
// const isNote = (value) => value.trim() !== "";
const isAddress = (value) => value.trim() !== "";
const isPhone = (value) => value.trim() !== "";
const isPassword = (value) => value.trim() !== "";
const isPassword2 = (value) => value.trim() !== "";

const Addcompany = () => {
  const [file, setFile] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.company);

  const {
    value: phoneValue,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhone,
  } = useInput(isPhone);
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);
  const {
    value: addressValue,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddress,
  } = useInput(isAddress);
  const {
    value: companyValue,
    isValid: companyIsValid,
    hasError: companyHasError,
    valueChangeHandler: companyChangeHandler,
    inputBlurHandler: companyBlurHandler,
    reset: resetCompany,
  } = useInput(isCompany);
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

  const closeServiceFormHandler = () => {
    dispatch(showCompanyForm());
  };

  const getFile = (file) => {
    setFile(file.base64);
  };
  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  let passwordCompare = false;

  let formIsValid = false;
  if (
    emailIsValid &&
    passwordIsValid &&
    password2IsValid &&
    phoneIsValid &&
    addressIsValid &&
    companyIsValid &&
    file
  ) {
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
    dispatch(
      createCompany({
        password2Value,
        passwordValue,
        emailValue,
        companyValue,
        file,
        addressValue,
        phoneValue,
        navigate,
        toast,
      })
    );
    resetAddress();
    resetPhone();
    resetCompany();
    resetEmail();

    resetPassword();
    resetPassword2();
    setFile("")
  };

  return (
    <div className=" flex  absolute w-screen h-screen  flex-col items-center  justify-center bg-transparentBlack  ">
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
                Company Name:
              </label>
              <div className="relative">
                <input
                  onChange={companyChangeHandler}
                  onBlur={companyBlurHandler}
                  value={companyValue}
                  type="text"
                  className={
                    "text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 focus:outline-alml   bg-gray w-full py-2"
                  }
                  placeholder="Company Name"
                />
              </div>
              {companyHasError && (
                <ErrorSvg message={"Company Name Field is Required"} />
              )}
            </div>

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
              <label className="mb-1  sm:text-sm tracking-wide">
                Company Address:
              </label>
              <div className="relative">
                <input
                  onChange={addressChangeHandler}
                  onBlur={addressBlurHandler}
                  value={addressValue}
                  type="text"
                  className={
                    "text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 focus:outline-alml   bg-gray w-full py-2"
                  }
                  placeholder="Company Address"
                />
              </div>
              {addressHasError && (
                <ErrorSvg message={"Company Address Field is Required"} />
              )}
            </div>

            <div className="flex flex-col mb-6">
              <label className="mb-1  sm:text-sm tracking-wide">
                Company phone:
              </label>
              <div className="relative">
                <input
                  onChange={phoneChangeHandler}
                  onBlur={phoneBlurHandler}
                  value={phoneValue}
                  type="text"
                  className={
                    "text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 focus:outline-alml   bg-gray w-full py-2"
                  }
                  placeholder="Company Phone"
                />
              </div>
              {phoneHasError && (
                <ErrorSvg message={"Company Phone Field is Required"} />
              )}
            </div>

            <div className="flex flex-col mb-6">
              <label className="mb-1 text-lg tracking-wide text-black">
                Company Logo:
              </label>
              <div className="relative">
                <Filebase
                  type="file"
                  multiple={false}
                  onDone={getFile.bind(this)}
                />
              </div>
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

            {/* <div className="flex flex-col mb-6">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                 Description
              </label>
              <textarea
                value={noteValue}
                onChange={noteChangeHandler}
                onBlur={noteBlurHandler}
                rows="4"
                className="block py-2 pl-10 pr-4  w-full text-sm focus:outline-alml  bg-gray "
                placeholder="Service Description..."
              ></textarea>
              {noteHasError && (
                <ErrorSvg message={"Note Field is Required"} />
              )}
            </div> */}

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
                  {!loading && <PlusSvg />}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addcompany;
