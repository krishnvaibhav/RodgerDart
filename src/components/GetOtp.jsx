import React, { useEffect, useState } from "react";
import opt2 from "../assets/otp2.png";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../context/stateProvider";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";

const GetOtp = () => {
  const [{ number }, dispatch] = useStateValue();

  const [phone, setPhone] = useState(number || "");

  const navigate = useNavigate();

  const onCaptchaVerifier = () => {
    if (!window.RecaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {},
          "expired-callback": () => {},
        },
        auth
      );
    }
  };

  const onSignUp = async () => {
    onCaptchaVerifier();
    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        "+91" + number,
        appVerifier
      );
      window.confirmationResult = confirmationResult.verificationId;
      dispatch({
        type: "SET_ID",
        id: confirmationResult.verificationId,
      });
    } catch (error) {
      console.log("Error sending verification code:", error);
    }
    navigate("/otpscreen");
  };
  return (
    <div
      style={{ height: "100vh" }}
      className="flex items-center justify-around flex-col"
    >
      <div className="flex items-center justify-center flex-col">
        <img src={opt2} style={{ width: 180, height: 170 }} alt="otp" />
        <h2 className="text-xl font-semibold">OTP VERIFICATION</h2>
        <p
          style={{
            fontSize: 16,
            width: 355,
            textAlign: "center",
            fontWeight: 400,
          }}
          className="mt-4 p-2"
        >
          We will send you a one-time password to this mobile number
        </p>
        <div className="mt-4">
          <input
            className="mt-3 text-center p-2 rounded"
            type="text"
            style={{ backgroundColor: "rgba(245, 245, 245, 1)" }}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>
      </div>
      <div
        style={{ width: 400, height: 400, position: "absolute" }}
        id="recaptcha-container"
      ></div>

      <div className="mt-4">
        <button
          onClick={() => onSignUp()}
          className="bg-color p-3 m-3 w-80 rounded text-white"
        >
          Get OTP
        </button>
      </div>
    </div>
  );
};

export default GetOtp;
