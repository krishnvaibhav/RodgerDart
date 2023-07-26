import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const NewPassword = () => {
  return (
    <div>
      <div className="flex items-center justify-center m-3 p-2">
        <AiOutlineArrowLeft
          style={{ width: 24, height: 24 }}
          className="absolute left-0 ml-8"
        />
        <h1 className="text-2xl m-2 p-2">New Password</h1>
      </div>
      <div className="m-2 p-2 flex items-center justify-center flex-col">
        <div className="m-2 p-2">
          <h3>New Password</h3>
          <input
            type="text"
            placeholder="Enter your new password"
            className="p-3 mt-2 w-80"
            style={{
              border: "0.4px solid rgba(151, 146, 140, 0.51)",
              borderRadius: 3,
            }}
          />
        </div>
        <div className="m-2 p-2">
          <h3>Confirm Pasword</h3>
          <input
            type="text"
            placeholder="Confirm your password"
            className="p-3 mt-2 w-80"
            style={{
              border: "0.4px solid rgba(151, 146, 140, 0.51)",
              borderRadius: 3,
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-center mt-5 flex-col">
        <button className="bg-color p-3 m-3 w-80 rounded text-white">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default NewPassword;
