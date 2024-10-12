import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full bg-gray-100 rounded-xl max-w-lg border border-black/10 p-10 `}
      >
        <div className="flex mb-2 justify-center">
          <span className="w-full inline-block max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center leading-tight text-2xl font-bold">
          Sign In into your account
        </h2>
        <p className="mt-2 text-center text-black/60 text-base">
          Don't have an account
          <Link
            to="/"
            className="text-primary font-medium hover:underline transition-all duration-200"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 text-center mt-8"> {error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              type="password"
              label="password"
              placeholder="Enter you password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
