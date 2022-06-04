import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showSingleContract } from "../redux/features/uiSlice";
import Closesvg from "./svg/CloseSvg";
import Printsvg from "./svg/PrintSvg";
import moment from "moment";

const Singlecontract = () => {
  const { contract } = useSelector((state) => state.contract);

  const dispatch = useDispatch();
  const closeSingleContractHandler = () => {
    dispatch(showSingleContract());
  };
  return (
    <div className="flex  absolute w-full h-screen items-center  flex-col  bg-transparentBlack p-6  ">
      <div className="flex flex-col  h-fit bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-4/5 ">
        <div className="">
          <button
            className="float-right hover:bg-gray p-1"
            onClick={closeSingleContractHandler}
          >
            <span className="">
              <Closesvg />
            </span>
          </button>
          <button
            className="float-left flex
           hover:bg-gray p-1"
          >
            <span className="mr-1">
              <Printsvg />
            </span>
            <span className="text-alml">Print</span>
          </button>
        </div>

        <div className="font-bold text-center text-xl sm:text-2xl uppercase text-gray-800">
          Contract Agreement
          {contract.map((c) => (
            <h5 className="font-thin">Duration: {c.duration}(Year(s))</h5>
          ))}
        </div>
        <div className="p-2 border border-gray">
          <div className="bg-gray flex justify-between p-4">
            <div>
              <address>
                <p className="font-bold">ALML GROUP</p>
                <p>63 Adekunle Fajuyi Way,</p>
                <p>GRA, IKEJA </p>
                <p>Lagos</p>
                <p>webadmin@almlgroup.com</p>
              </address>
            </div>
            <div>
              <address>
                {contract.map((c) => (
                  <>
                    <p className="capitalize font-bold"> {c.user.name}</p>
                    <p className=""> {c.user.address}</p>
                    <p className=""> {c.user.email}</p>
                  </>
                ))}
              </address>
            </div>
          </div>
          <div className="mt-8">
            <table className=" border-collapse  bg-white ...">
              <thead>
                <tr className="">
                  <th className=" p-2   ...">Service(s)</th>
                  <th className=" p-2   ...">Service Initial Fee</th>
                  <th className=" p-2   ...">Service Description</th>
                  <th className=" p-2   ...">Category</th>
                  <th className=" p-2   ...">Agreed Fee</th>

                  <th className=" p-2   ...">Created At</th>
                </tr>
              </thead>
              <tbody>
                {contract.map((c) =>
                  c.services.map((s) => (
                    <tr className="text-black font-light " key={c.id}>
                      <>
                        <td className=" p-4  capitalize ...">{s.name}</td>
                        <td className=" p-4   ...">₦ {s.initialFee}</td>
                        <td className=" p-4   ..."> {s.description}</td>
                        <td className=" p-4   ..."> {s.category.name}</td>
                        <td className=" p-4   ...">₦ {s.agreedFee}</td>

                        <td className=" p-4  ...">
                          {moment(contract.createdAt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </td>
                      </>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singlecontract;
