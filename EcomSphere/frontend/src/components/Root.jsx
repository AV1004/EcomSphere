import React from "react";
import { Outlet } from "react-router-dom";
import { NavbarCom } from "./NavbarCom";

export const Root = ({ isAuthenticated }) => {
  return (
    <>
      <NavbarCom isAuthenticated={isAuthenticated} />
      <Outlet />
    </>
  );
};
