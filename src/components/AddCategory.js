import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/use-input";
import { showCategoryForm } from "../redux/features/uiSlice";
import Closesvg from "./svg/CloseSvg";
import Collectionsvg from "./svg/CollectionSvg";
import ErrorSvg from "./svg/ErrorSvg";
import Plussvg from "./svg/PlusSvg";
import Filebase from "react-file-base64";
import { toast } from "react-toastify";
import Spinnersvg from "./svg/SpinnerSvg";
import createCategory from "../redux/actions/createCategory";
import { motion } from "framer-motion";

const isCategory = (value) => value.trim() !== "";

const Addcategory = () => {
  const openCategoryForm = useSelector((state) => state.ui.showCategoryForm);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState("");

  const { error, loading } = useSelector((state) => state.category);

  const {
    value: categoryValue,
    isValid: categoryIsValid,
    hasError: categoryHasError,
    valueChangeHandler: categoryChangeHandler,
    inputBlurHandler: categoryBlurHandler,
    reset: resetcategory,
  } = useInput(isCategory);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  const getFile = (file) => {
    setFile(file.base64);
  };

  let formIsValid = false;
  if (categoryIsValid && file) {
    formIsValid = true;
  }
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    dispatch(createCategory({ categoryValue, file, toast, navigate }));

    resetcategory();
    setFile("");
  };

  const closeCategoryFormHandler = () => {
    dispatch(showCategoryForm());
  };

  return (
    <>
      {openCategoryForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.4,
            },
          }}
          exit={{
            opacity: 0,
          }}
          className="flex  absolute w-screen h-screen  flex-col items-center justify-center bg-transparentBlack"
        >
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
            className="flex flex-col h-fit  bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md"
          >
            <div className="">
              <button
                className=" float-right"
                onClick={closeCategoryFormHandler}
              >
                <span className="">
                  <Closesvg />
                </span>
              </button>
            </div>
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
              Create Category
            </motion.div>
            <div className="mt-10 bg-white p-4">
              <form onSubmit={formSubmitHandler}>
                <div className="flex flex-col mb-6">
                  <label
                    htmlFor=""
                    className="mb-1 text-lg text-black tracking-wide"
                  >
                    Category Name:
                  </label>
                  <div className="relative">
                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                      <span>
                        <Collectionsvg />
                      </span>
                    </div>

                    <input
                      onChange={categoryChangeHandler}
                      value={categoryValue}
                      onBlur={categoryBlurHandler}
                      id=""
                      type="text"
                      name="category"
                      className="text-sm sm:text-base  bg-gray pl-10 pr-4   border-gray w-full py-2 focus:outline-none"
                      placeholder="category name"
                    />
                  </div>

                  {categoryHasError && (
                    <ErrorSvg message={"Category Field is Required"} />
                  )}
                </div>

                <div className="flex flex-col mb-6">
                  <label className="mb-1 text-lg tracking-wide text-black">
                    Category Icon:
                  </label>
                  <div className="relative">
                    <Filebase
                      type="file"
                      multiple={false}
                      onDone={getFile.bind(this)}
                    />
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
                    <span className="mr-2 uppercase">Create Category</span>
                    <span>
                      {loading && <Spinnersvg />}
                      {!loading && <Plussvg />}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Addcategory;
