import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";
import { login } from "../store/authSlice";

function Signup() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    try {
      setError("");
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div
        className={`p-10 border border-black/10 w-full mx-auto max-w-lg rounded-xl bg-gray-100`}
      >
        <div className="flex mb-2 justify-center">
          <span className="w-full inline-block max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center leading-tight text-2xl font-bold">
          Sign up to create your account
        </h2>
        <p className="mt-2 text-center text-black/60 text-base">
          Already have an account
          <Link
            to="/"
            className="text-primary font-medium hover:underline transition-all duration-200"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-center text-red-600 mt-8">{error}</p>}
        ///{/*<--FORM-->*/} 
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name: "
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email:"
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
              label="password"
              placeholder="enter your password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
