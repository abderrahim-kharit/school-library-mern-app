import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AUTH } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin } = useSelector((store) => store.user);

  useEffect(() => {
    if (isLogin) navigate("/admin/books");
  }, [isLogin, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setEmail("");
    setPassword("");
    dispatch(AUTH({ email, password }));
  };

  return (
    <>
      <h1 className="m-4 ms-0">Login</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input
          className="form-control my-2"
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          className="form-control my-2"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Login" className="btn btn-primary mt-2" />
      </form>
    </>
  );
};

export default Login;
