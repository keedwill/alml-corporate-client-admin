import React from "react";

import avatar from "../assets/user.png";
import { NavLink } from "react-router-dom";
import Menusvg from "./svg/MenuSvg";
import Homesvg from "./svg/HomeSvg";
import Worksvg from "./svg/workSvg";
import Companysvg from "./svg/CompanySvg";
import Proformasvg from "./svg/ProformaSvg";
import Contractsvg from "./svg/ContractSvg";
import Settingsvg from "./svg/settingSvg";
import Logoutsvg from "./svg/logoutSvg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/authSlice";


const Sidebar = (props) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const openFunction = () => {
    props.openHandler();
  };

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    user && (
      <div
        className={`${
          props.open ? "w-60" : "w-20 "
        } h-screen duration-500 p-5 pt-8  border-r border-gray relative  bg-backgroundpurple`}
      >
        <Menusvg openFunction={openFunction} />

        <div className="flex gap-x-4 items-center">
          <img
            src={avatar}
            alt="avatar"
            className={`cursor-pointer duration-500 w-24 ${
              props.open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-black origin-left font-medium text-sm  duration-300 ${
              !props.open && "scale-0"
            }`}
          >
            {user ? user.email : "Admin"}
          </h1>
        </div>

        <ul className="pt-6">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `text-black text-sm flex items-center gap-x-4 cursor-pointer p-2 mb-2 hover:bg-lightpurple rounded-md border-b-4 border-lightpurple `
                  : `text-black text-sm flex items-center gap-x-4 cursor-pointer p-2 mb-2 hover:bg-lightpurple rounded-md`
              }
              to={"/dashboard"}
            >
              <Homesvg />
              <span
                className={`${
                  !props.open && "hidden"
                } origin-left duration-200`}
              >
                {"Dashboard"}
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `text-black text-sm flex items-center gap-x-4 cursor-pointer p-2 mb-2 hover:bg-lightpurple rounded-md border-b-4 border-lightpurple `
                  : `text-black text-sm flex items-center gap-x-4 cursor-pointer p-2 mb-2 hover:bg-lightpurple rounded-md`
              }
              to={"/services"}
            >
              <Worksvg />
              <span
                className={`${
                  !props.open && "hidden"
                } origin-left duration-200`}
              >
                {"Services"}
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `text-black text-sm flex items-center gap-x-4 cursor-pointer p-2 mb-2 hover:bg-lightpurple rounded-md border-b-4 border-lightpurple `
                  : `text-black text-sm flex items-center gap-x-4 cursor-pointer p-2 mb-2 hover:bg-lightpurple rounded-md`
              }
              to={"/companys"}
            >
              <Companysvg />
              <span
                className={`${
                  !props.open && "hidden"
                } origin-left duration-200`}
              >
                {"Companys"}
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `text-black text-sm flex items-center gap-x-4 cursor-pointer p-2 mb-2 hover:bg-lightpurple rounded-md border-b-4 border-lightpurple `
                  : `text-black text-sm flex items-center gap-x-4 cursor-pointer p-2 mb-2 hover:bg-lightpurple rounded-md`
              }
              to={"/proformas"}
            >
              <Proformasvg />
              <span
                className={`${
                  !props.open && "hidden"
                } origin-left duration-200`}
              >
                {"Proformas"}
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `text-black text-sm flex items-center gap-x-4 cursor-pointer p-2 mb-2 hover:bg-lightpurple rounded-md border-b-4 border-lightpurple `
                  : `text-black text-sm flex items-center gap-x-4 cursor-pointer p-2 mb-2 hover:bg-lightpurple rounded-md`
              }
              to={"/contracts"}
            >
              <Contractsvg />
              <span
                className={`${
                  !props.open && "hidden"
                } origin-left duration-200`}
              >
                {"Contracts"}
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `text-black text-sm flex items-center gap-x-4 cursor-pointer mt-10 p-2 mb-2 hover:bg-lightpurple rounded-md border-b-4 border-lightpurple `
                  : `text-black text-sm flex items-center gap-x-4 cursor-pointer p-2 mt-10 mb-2 hover:bg-lightpurple rounded-md`
              }
              to={`/profile/${user?.userId}`}
            >
              <Settingsvg />
              <span
                className={`${
                  !props.open && "hidden"
                } origin-left duration-200`}
              >
                {"Profile"}
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `text-black text-sm flex items-center gap-x-4 cursor-pointer p-2 mb-2 hover:bg-lightpurple rounded-md border-b-4 border-lightpurple `
                  : `text-black text-sm flex items-center gap-x-4 cursor-pointer p-2 mb-2 hover:bg-lightpurple rounded-md`
              }
              to={`/login`}
              onClick={logoutHandler}
            >
              <Logoutsvg />
              <span
                className={`${
                  !props.open && "hidden"
                } origin-left duration-200`}
              >
                {"Logout"}
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    )
  );
};

export default Sidebar;
