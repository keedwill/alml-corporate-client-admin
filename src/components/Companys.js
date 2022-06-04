import React, { Fragment, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import getCompanys from "../redux/actions/getCompanys";
import { toast } from "react-toastify";
import Spinnersvg from "./svg/SpinnerSvg";
import { showSingleCompany } from "../redux/features/uiSlice";
import { displaySingleCompany } from "../redux/features/companySlice";



const Companys = () => {
  const dispatch = useDispatch();
   const {  loading, companys, error } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(getCompanys());
  }, []);

  const showSingleCompanyHandler =(id)=>{
     dispatch(displaySingleCompany(id));
     dispatch(showSingleCompany());
  }
  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <Fragment>
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

      {companys.length === 0 && (
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
            <h1>Sorry! There are No Companys</h1>
          </div>
        </div>
      )}

      {companys.length > 0 && (
        <div className="p-7  font-semibold flex-1 h-screen">
          <h1 className="text-4xl mb-4">Companys</h1>
          <table className=" border-collapse  bg-white ...">
            <thead>
              <tr className="">
                <th className=" p-2  ...">Company ID</th>
                <th className=" p-2   ...">Company Name</th>
                <th className=" p-2   ...">Company Address</th>
                <th className=" p-2   ...">Company Role</th>
                <th className=" p-2  ...">Company Status</th>

                <th className=" p-2   ...">Company Email</th>
                <th className=" p-2   ...">Company Phone</th>
                <th className=" p-2   ...">Created At</th>
                <th className=" p-2   ...">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {companys.map((company) => (
                <tr className="text-black font-light" key={company.id}>
                  <td className=" p-4  ...">{company.id}</td>
                  <td className=" p-4  capitalize ...">{company.name}</td>
                  <td className=" p-4  capitalize ...">{company.address}</td>
                  <td className=" p-4  ...">{company.role}</td>
                  <td className=" p-4  ...">{company.status}</td>
                  <td className=" p-4  ...">{company.email}</td>
                  <td className=" p-4  ...">{company.phone}</td>
                  <td className=" p-4  ...">{company.createdAt}</td>
                  <td className=" p-4 ...">{company.updatedAt}</td>
                  <td className=" p-4 ...">
                    <button
                      className="flex items-center justify-center p-2 text-skyblue "
                      onClick={showSingleCompanyHandler.bind(
                        this,
                        company.id
                      )}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Fragment>
  );
};

export default Companys;
