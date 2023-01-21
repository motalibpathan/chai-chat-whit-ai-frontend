import React from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/chat");
  };
  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm border">
        <h1 className="text-lg font-medium mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <label className="block font-medium mb-2">
            Email
            <input
              type="email"
              className="form-input mt-1 block w-full py-2 px-3 border-2 focus:border-primary outline-none rounded-md"
              placeholder="jane@example.com"
            />
          </label>
          <label className="block font-medium mb-2">
            Password
            <input
              type="password"
              className="form-input mt-1 block w-full py-2 px-3 border-2  focus:border-primary outline-none rounded-md "
              placeholder="********"
            />
          </label>
          <button className="bg-primary text-white py-2 px-4 rounded-full hover:bg-[#c9004a] mt-3 duration-500 w-full">
            Log In
          </button>
        </form>
        <div className="w-full my-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="border-t-2 w-full"></div>
            <div className="text-sm text-gray-600 w-full">Or continue with</div>
            <div className="border-t-2 w-full"></div>
          </div>
          <button className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 w-full flex items-center duration-500">
            <FaGoogle className="mr-2" /> Continue with Google
          </button>
          <button className="bg-blue-500 text-white py-2 px-4  rounded-full hover:bg-blue-600 w-full flex items-center duration-500">
            <FaFacebookF className="mr-2" /> Continue with Facebook
          </button>
        </div>
        <div className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-500 hover:text-indigo-600">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
