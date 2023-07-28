import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useStateValue } from "../context/stateProvider";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigator = useNavigate();
  const [number, setNumber] = useState("");
  const [{ name }, dispatch] = useStateValue();
  const handleDispatch = () => {
    try {
      if (!number) {
        // Handle the case when the number is empty
        console.log("Please enter a phone number");
        return;
      }

      console.log(name);

      // The hang issue

      // dispatch({
      //   type: "SET_NUMBER",
      //   number: number,
      // });

      navigator("/getotp");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center m-3 p-2">
        <AiOutlineArrowLeft
          onClick={() => {
            navigator("/");
          }}
          style={{ width: 24, height: 24 }}
          className="absolute left-0 ml-8"
        />
        <h1 className="text-2xl m-2 p-2">Forgot Password</h1>
      </div>
      <div className="m-2 p-2 flex items-center justify-center flex-col">
        <div className="m-2 p-2">
          <h3>Phone Number</h3>
          <input
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
            type="text"
            placeholder="Enter your phone number"
            className="p-3 mt-2 w-80"
            style={{
              border: "0.4px solid rgba(151, 146, 140, 0.51)",
              borderRadius: 3,
            }}
          />
        </div>
      </div>
      <div className="relative bottom-5 flex items-center justify-center mr-8 pr-4">
        <p className="text-xs ml-6">
          we will send a verification number to your phone number
        </p>
      </div>
      <div className="flex items-center justify-center mt-5 flex-col">
        <button
          onClick={() => handleDispatch()}
          className="bg-color p-3 m-3 w-80 rounded text-white"
        >
          Countinue
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
