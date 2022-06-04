import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Loadingtoredirect from "./LoadingToRedirect";
import decode from "jwt-decode";
import { logout, setUser } from "../redux/features/authSlice";

const Privateroute = ({ children }) => {
  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);
   const profile = JSON.parse(localStorage.getItem("profile"));
     useEffect(() => {
       dispatch(setUser(profile));
     }, [profile, dispatch]);
 
  // const token = user?.token;
  const token =profile?.token;
  // console.log(token)
  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(logout());
    } else {
      return children;
    }
  }
  return <Loadingtoredirect />;
};

export default Privateroute;
