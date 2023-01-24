import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <div className="relative ">
          <div class="lds-ellipsis">
            <div className="bg-gray-800 dark:bg-white"></div>
            <div className="bg-gray-800 dark:bg-white"></div>
            <div className="bg-gray-800 dark:bg-white"></div>
            <div className="bg-gray-800 dark:bg-white"></div>
          </div>
        </div>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
