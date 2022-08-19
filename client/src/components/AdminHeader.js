import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AdminHeader = () => {
  const navigate = useNavigate();
  const { isLogin } = useSelector((store) => store.user);
  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, [isLogin, navigate]);
  return (
    <>
      <h1 className="m-4 ms-0">Espace Bibliothèque - Administration</h1>
      <Outlet />
    </>
  );
};

export default AdminHeader;
