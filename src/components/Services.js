import React, { Fragment, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import getServices from "../redux/actions/getServices";

import { toast } from "react-toastify";
import Spinnersvg from "./svg/SpinnerSvg";

import { motion } from "framer-motion";
import Searchbar from "./SearchBar";
import useSearch from "../hooks/use-Search";
import getServicesBySearch from "../redux/actions/getServicesBySearch";
import moment from "moment";

import queryString from "query-string";

const isSearch = (value) => value.trim() !== "";

const Services = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

 

  const { services, loading, error } = useSelector((state) => state.service);
  const {
    value: searchValue,
    isValid: searchValueIsValid,

    valueChangeHandler: searchValueChangeHandler,

    reset: resetSearchValue,
  } = useSearch(isSearch);

  useEffect(() => {
    let value = "";
    const searchquery = queryString.parse(location.search);

    if (searchquery.s) {
      value = searchquery.s;
      dispatch(getServicesBySearch(value));
    } else {
      dispatch(getServices());
    }
  }, [dispatch]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const deleteServiceHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this service ?")) {
    }
  };

  const searchHandler = () => {
    if (!searchValueIsValid) {
      toast.error("Search Field is Required");
      return;
    }

    if (searchValue) {
      dispatch(getServicesBySearch(searchValue));
      navigate(`/services/search?s=${searchValue}`);
    } else {
      navigate("/services");
    }
    resetSearchValue();
  };

  return (
    <Fragment>
      <div>
        <Searchbar
          value={searchValue}
          onChange={searchValueChangeHandler}
          click={searchHandler}
          valueIsValid={searchValueIsValid}
        />
      </div>
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
      {services.length === 0 && (
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
            <h1>Sorry! There are No Services</h1>
          </div>
        </div>
      )}

      {services.length > 0 && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 1,
              },
            }}
            exit={{ opacity: 0 }}
            className="p-7  font-semibold flex-1 h-screen overflow-auto  "
          >
            <h1 className="text-4xl mb-4">Services</h1>

            <table className=" border-collapse  bg-white  ...">
              <thead>
                <tr className="">
                  <th className=" p-2  ...">Service ID</th>
                  <th className=" p-2   ...">Service Name</th>
                  <th className=" p-2   ...">Service Description</th>
                  <th className=" p-2   ...">Service Status</th>
                  <th className=" p-2  ...">Service Fee</th>

                  <th className=" p-2   ...">Created At</th>
                  <th className=" p-2   ...">Updated At</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr className="text-black font-light" key={service.id}>
                    <td className=" p-2  ...">{service.id}</td>
                    <td className=" p-2  capitalize ...">{service.name}</td>
                    <td className=" p-2  capitalize ...">
                      {service.description}
                    </td>
                    <td className={`p-2 `}>
                      <p className="capitalize bg-lightgreen text-center text-green font-bold rounded-full">
                        {service.status}
                      </p>
                    </td>
                    <td className=" p-2  ...">{service.fee}</td>
                    <td className=" p-2  ...">
                      {moment(service.createdAt).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </td>
                    <td className=" p-2 ...">
                      {moment(service.updatedAt).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </td>
                    <td className=" p-2 ...">
                      <Link
                        className="flex items-center justify-center p-2 text-skyblue  "
                        to={`/services/${service.id}`}
                      >
                        Edit Service
                      </Link>
                    </td>
                    <td className=" p-2  ...">
                      <button
                        onClick={deleteServiceHandler.bind(null, service.id)}
                        className=" hover:bg-lightred  hover:p-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 stroke-red"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </>
      )}
    </Fragment>
  );
};

export default Services;
