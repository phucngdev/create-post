import React from "react";
import Header from "../layout/Header";
import { Outlet } from "react-router-dom";

const Public = () => {
  return (
    <>
      <Header></Header>
      <Outlet />
    </>
  );
};

export default Public;
