import React from "react";

const NotFound = () => {
  return (
    <>
      <h2 className="text-center h-screen  flex flex-col justify-center">
        <div>
          <span className="text-9xl italic font-extrabold text-gray-600">404</span>
          <p className="text-2xl font-bold text-gray-800">
            This Page is Unavailable
          </p>
        </div>
      </h2>
    </>
  );
};

export default NotFound;
