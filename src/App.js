import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Services from "./components/Services";
import Contracts from "./components/Contracts";

import Login from "./components/auth/Login";

import Layout from "./components/Layout";
import Companys from "./components/Companys";
import Editservice from "./components/EditService";
import NotFound from "./components/NotFound";
import Register from "./components/auth/Register";
import Profile from "./components/Profile";
import Proformas from "./components/Proformas";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { setUser } from "./redux/features/authSlice";
import Addcontract from "./components/AddContract";
import { AnimatePresence } from "framer-motion";
import Privateroute from "./components/PrivateRoute";
function App() {
  // const dispatch = useDispatch();
  // const profile = JSON.parse(localStorage.getItem("profile"));
  ///get token from localstorage and send a request to backend to check if token is valid
  //if error then redirect to login page
  // useEffect(() => {
  //   dispatch(setUser(profile));
  // }, [profile ,dispatch]);

  return (
    <div className="">
      <ToastContainer />
      <AnimatePresence>
        <Routes>
          <Route
            element={
              <Privateroute>
                <Layout />
              </Privateroute>
            }
          >
            <Route path="dashboard" index element={<Dashboard />} />
            <Route path="services" element={<Services />} />
            <Route path="services/search" element={<Services />} />

            <Route path="services/:serviceId" element={<Editservice />} />
            <Route path="contracts" element={<Contracts />} />
            <Route path="companys" element={<Companys />} />
            <Route path="proformas" element={<Proformas />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="contract/create" element={<Addcontract />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          {/* if you are loggedin redirect to dahsboard else go to login page */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
