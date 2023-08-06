import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../context/stateProvider";

const WelcomeBack = () => {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      console.log(auth.currentUser);
      navigate("/homescreen");
    }
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("userIDToken", user.user.getIdToken);
      console.log(auth.currentUser.getIdToken);
      dispatch({
        type: "SET_USER",
        user: user.user,
      });
      navigate("/homescreen");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center m-3 p-2">
        <AiOutlineArrowLeft
          style={{ width: 24, height: 24 }}
          className="absolute left-0 ml-8"
        />
        <h1 className="text-2xl m-2 p-2">Welcome back</h1>
      </div>
      <div className="m-2 p-2 flex items-center justify-center flex-col">
        <div className="m-2 p-2">
          <h3>Email</h3>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            placeholder="Enter your Email"
            className="p-3 mt-2 w-80"
            style={{
              border: "0.4px solid rgba(151, 146, 140, 0.51)",
              borderRadius: 3,
            }}
          />
        </div>
        <div className="m-2 p-2">
          <h3>Password</h3>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="text"
            placeholder="Enter your Password"
            className="p-3 mt-2 w-80"
            style={{
              border: "0.4px solid rgba(151, 146, 140, 0.51)",
              borderRadius: 3,
            }}
          />
        </div>
      </div>
      <div className="relative bottom-5 flex items-center justify-end mr-8 pr-4">
        <p style={{ color: "#0230B1" }}>
          <Link to={"/forgotpassword"}>Forgot password?</Link>
        </p>
      </div>
      <div className="flex items-center justify-center mt-5 flex-col">
        <button
          onClick={signIn}
          className="bg-color p-3 m-3 w-80 rounded text-white"
        >
          Countinue
        </button>
        <p>
          Dont have an account ?{" "}
          <span className="txt-color">
            <Link to={"/createaccount"}>SIGN UP</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default WelcomeBack;
