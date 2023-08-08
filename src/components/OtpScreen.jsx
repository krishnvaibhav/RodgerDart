import React, { useContext, useState } from "react";
import otpImg from "../assets/otp.png";
import { useStateValue } from "../context/stateProvider";
import { PhoneAuthProvider, linkWithCredential } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/appContext";
const OtpScreen = () => {
  const [{ id, number, name }, dispatch] = useStateValue();
  const { email } = useContext(AppContext);
  console.log(id, number, name);
  const navigator = useNavigate();
  const [otp, setOtp] = useState();
  const signIn = async () => {
    try {
      const credential = PhoneAuthProvider.credential(id, otp);
      const user = await linkWithCredential(auth.currentUser, credential);
      setDoc(doc(db, "users", user.user.uid), {
        name: name,
        number: "+91" + number,
        email: email,
      });
      dispatch({
        type: "SET_USER",
        user: user.user,
      });
      navigator("/homescreen");
    } catch (err) {
      console.log(err);
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

export default OtpScreen;
