import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { auth } from "../firebase";
import {
  EmailAuthProvider,
  PhoneAuthCredential,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = auth.currentUser;
  const navigate = useNavigate();

  const reauthUser = async () => {
    const credentials = PhoneAuthCredential.credential();

    try {
      await reauthenticateWithCredential(user, credentials);
      console.log("User reauthenticated successfully!");
    } catch (error) {
      console.error("Reauthentication error:", error);
      throw error;
    }
  };
  const changePassword = async () => {
    try {
      if (password === confirmPassword) {
        if (user) {
          await updatePassword(user, password);
          console.log("Password changed successfully!");
          navigate("/");
        } else {
          console.log("No user is currently signed in.");
        }
      } else {
        alert("Passwords do not match");
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };
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
            type="password"
            placeholder="Enter your new password"
            className="p-3 mt-2 w-80"
            style={{
              border: "0.4px solid rgba(151, 146, 140, 0.51)",
              borderRadius: 3,
            }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="m-2 p-2">
          <h3>Confirm Pasword</h3>
          <input
            type="password"
            placeholder="Confirm your password"
            className="p-3 mt-2 w-80"
            style={{
              border: "0.4px solid rgba(151, 146, 140, 0.51)",
              borderRadius: 3,
            }}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-center mt-5 flex-col">
        <button
          className="bg-color p-3 m-3 w-80 rounded text-white"
          onClick={changePassword}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default NewPassword;
