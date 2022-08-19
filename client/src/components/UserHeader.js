import React from "react";
import { Outlet } from "react-router-dom";

const UserHeader = () => {
  return (
    <>
      <h1 className="m-4 ms-0">Espace Bibliothèque</h1>
      <Outlet />
    </>
  );
};

export default UserHeader;
