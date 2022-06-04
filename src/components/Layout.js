import React, {  useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";


import Addcategory from "./AddCategory";
import Addcompany from "./AddCompany";
import Addservice from "./AddService";
import Cart from "./Cart/Cart";

import Sidebar from "./SideBar";
import Singlecompany from "./SingleCompany";
import Singlecontract from "./SingleContract";

const Layout = () => {
  const [open, setOpen] = useState(false);

  const showServiceForm = useSelector((state) => state.ui.showServiceForm);
  const showCategoryForm = useSelector((state) => state.ui.showCategoryForm);

  const showSingleCompany = useSelector((state) => state.ui.showSingleCompany);
  const showSingleContract = useSelector(
    (state) => state.ui.showSingleContract
  );

   const showCart = useSelector((state) => state.ui.showCart);
  
  const showCompanyForm = useSelector((state) => state.ui.showCompanyForm);
  return (
    <div className="flex bg-backgroundpurple">
      <Sidebar open={open} openHandler={() => setOpen(!open)} />
      {showServiceForm && <Addservice />}
      {showCategoryForm && <Addcategory />}
      {showSingleContract && <Singlecontract />}
      {showCompanyForm && <Addcompany />}
      {showSingleCompany && <Singlecompany />}
      {showCart && <Cart />}

      <div className="w-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
