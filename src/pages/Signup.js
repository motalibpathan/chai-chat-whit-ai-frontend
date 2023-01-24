import React, { useContext } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from "../components/LoadingBar/LoadingBar";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { user, googleLogin, facebookLogin, signupWithEmail, error, loading } =
    useContext(AuthContext);

  if (user) {
    navigate("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const info = {
      email: e.target.email.value,
      name: e.target.name.value,
      password: e.target.password.value,
    };
    signupWithEmail(info);
  };

  return (
    <>
      {loading && <LoadingBar />}
      <div className="bg-white dark:bg-gray-800 min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm border">
          <h1 className="text-xl font-medium mb-4 text-center">Signup</h1>
          <form onSubmit={handleSubmit}>
            <label className="block font-medium mb-2">
              Name
              <input
                type="text"
                name="name"
                className="form-input mt-1 block w-full py-2 px-3 border-2 focus:border-primary outline-none rounded-md"
                placeholder="jane@example.com"
              />
            </label>
            <label className="block font-medium mb-2">
              Email
              <input
                type="email"
                name="email"
                className="form-input mt-1 block w-full py-2 px-3 border-2 focus:border-primary outline-none rounded-md"
                placeholder="jane@example.com"
              />
            </label>
            <label className="block font-medium mb-2">
              Password
              <input
                type="password"
                name="password"
                className="form-input mt-1 block w-full py-2 px-3 border-2  focus:border-primary outline-none rounded-md "
                placeholder="********"
              />
            </label>
            <button className="bg-primary text-white py-2 px-4 rounded-full hover:bg-[#c9004a] mt-3 duration-500 w-full">
              Sign Up
            </button>
          </form>
          {error && <p>{error}</p>}
          <div className="w-full my-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="border-t-2 w-full"></div>
              <div className="text-sm text-gray-600 ">Or</div>
              <div className="border-t-2 w-full"></div>
            </div>
            <button
              onClick={googleLogin}
              className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 w-full flex justify-center items-center duration-500"
            >
              <FaGoogle className="mr-2" />{" "}
              <span className="">Continue with Google</span>
            </button>
            <button
              onClick={facebookLogin}
              className="bg-blue-500 text-white py-2 px-4  rounded-full hover:bg-blue-600 w-full flex justify-center items-center duration-500"
            >
              <FaFacebookF className="mr-2" /> Continue with Facebook
            </button>
          </div>
          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-500 hover:text-indigo-600">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
