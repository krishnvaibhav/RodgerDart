import React, { useContext, useState } from "react";
import otpImg from "../assets/otp.png";
import { useStateValue } from "../context/stateProvider";
import {
  PhoneAuthProvider,
  linkWithCredential,
  reauthenticateWithCredential,
  signInWithCredential,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/appContext";
const OtpScreenForget = () => {
  const [{ id, number, name }, dispatch] = useStateValue();
  const { email } = useContext(AppContext);
  console.log(id, number, name);
  const navigator = useNavigate();
  const [otp, setOtp] = useState();
  const signIn = async () => {
    try {
      console.log(id, otp);
      const credential = PhoneAuthProvider.credential(id, otp);
      console.log(auth.currentUser);
      const userCredential = await reauthenticateWithCredential(
        auth.currentUser,
        credential
      );

      if (userCredential.user) {
        dispatch({
          type: "SET_USER",
          user: userCredential.user,
        });
        navigator("/newpassword");
      }
      console.log("Phone number sign-in successful!");
    } catch (error) {
      console.error("Phone number sign-in error:", error);
    }
  };
  return (
    <div
      className="flex items-center justify-center flex-col"
      style={{ height: "100vh" }}
    >
      <img src={otpImg} style={{ width: 180, height: 170 }} alt="otp" />
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
        Please enter <span className="txt-color font-bold">4 digit </span> code
        we sent to your phone number
      </p>
      <div
        className="mt-4"
        style={{ width: 300, height: 62, border: "1px solid black" }}
      >
        <input
          type="text"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
          }}
        />
      </div>
      <div className="mt-4">
        <p className="mt-4" style={{ color: "grey" }}>
          Didn't receive the OTP? <span className="txt-color">RESEND OTP</span>
        </p>
      </div>
      <div className="mt-4">
        <button
          onClick={signIn}
          className="bg-color p-3 m-3 w-80 rounded text-white"
        >
          Countinue
        </button>
      </div>
    </div>
  );
};

export default OtpScreenForget;
