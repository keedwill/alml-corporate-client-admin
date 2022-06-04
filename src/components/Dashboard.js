import { motion } from "framer-motion";
import React, { } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  showServiceForm,
  showCategoryForm,
  showCompanyForm,
} from "../redux/features/uiSlice";

import Plussvg from "./svg/PlusSvg";

const services = [
  {
    id: 1,
    name: "Airport Transfer",
    status: "active",
    description: "transport",
    fee: 8500,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
  },
  {
    id: 2,
    name: "Oasis Lounge",
    status: "active",
    description: "welfare",
    fee: 10000,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
   
  
  const showServiceFormHandler = () => {
    dispatch(showServiceForm());
  };
  const showCategoryFormHandler = () => {
    dispatch(showCategoryForm());
  };

  const showCompanyFormHandler = () => {
    dispatch(showCompanyForm());
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 1,
        },
      }}
      exit={{ opacity: 0 }}
      className="p-7  font-semibold flex-1  h-screen  "
    >
      <h1 className="text-4xl">Dashboard</h1>
      <div className=" flex mt-8 bg-white ">
        <button
          onClick={showServiceFormHandler}
          className=" p-2 m-2 text-white bg-lightgreen flex items-center justify-center"
        >
          <span className="mr-2 font-thin uppercase text-sm">Add Service</span>
          <span className="">
            <Plussvg />
          </span>
        </button>
        <Link
          to={"/contract/create"}
          className=" p-2 m-2 text-white bg-brown flex items-center justify-center"
        >
          <span className="mr-2 font-thin uppercase text-sm">Add Contract</span>
          <span className="">
            <Plussvg />
          </span>
        </Link>
        <button
          onClick={showCategoryFormHandler}
          className=" p-2 m-2  text-white bg-gradient-to-r from-alml to-lightpurple flex items-center justify-center"
        >
          <span className="mr-2 uppercase font-thin text-sm">
            {" "}
            Add Category
          </span>
          <span className="">
            <Plussvg />
          </span>
        </button>
        <button
          onClick={showCompanyFormHandler}
          className=" p-2 m-2 text-white bg-darkgrey flex items-center justify-center"
        >
          <span className="mr-2 uppercase font-thin text-sm">Add Company</span>
          <span className="">
            <Plussvg />
          </span>
        </button>
      </div>

      <h1 className="text-4xl mt-8">Recent Orders</h1>
      <div className="mt-8 bg-white p-4">
        <table className=" border-collapse ...">
          <thead>
            <tr className="">
              <th className=" p-2  ...">Service ID</th>
              <th className=" p-2   ...">Service Name</th>
              <th className=" p-2   ...">Service Description</th>
              <th className=" p-2  ...">Service Status</th>
              <th className=" p-2   ...">Service Fee</th>

              <th className=" p-2   ...">Created At</th>
              <th className=" p-2   ...">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr className="text-black font-light" key={service.id}>
                <td className=" p-4  ...">{service.id}</td>
                <td className=" p-4  ...">{service.name}</td>
                <td className=" p-4  ...">{service.description}</td>
                <td className=" p-4  ">
                  {" "}
                  <p className="capitalize bg-lightgreen text-center text-green font-bold rounded-full">
                    {service.status}
                  </p>
                </td>
                <td className=" p-4  ...">{service.fee}</td>
                <td className=" p-4  ...">{service.createdAt}</td>
                <td className=" p-4  ...">{service.updatedAt}</td>
                <td className=" p-4  ...">
                  <Link
                    className="flex items-center justify-center p-2 text-skyblue "
                    to={``}
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:shrink-0"></div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Case study
            </div>

            <p className="mt-2 text-slate-500">
              Getting a new business off the ground is a lot of hard work. Here
              are five ideas you can use to find your first customers.
            </p>
          </div>
        </div>
      </div> */}
    </motion.div>
  );
};

export default Dashboard;
