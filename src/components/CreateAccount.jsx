import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../context/stateProvider";
const CreateAccount = () => {
  const [{}, dispatch] = useStateValue();
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");

  const mailAndPassword = async () => {
    console.log("start");
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(name, number);
      dispatch({
        type: "SET_NUMBER",
        number: number,
      });
      dispatch({
        type: "SET_NAME",
        name: name,
      });
      navigator(`/getotp`);
      console.log(userCred.user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center m-3 p-2">
        <AiOutlineArrowLeft
          onClick={() => navigator("/")}
          style={{ width: 24, height: 24 }}
          className="absolute left-0 ml-8"
        />
        <h1 className="text-2xl m-2 p-2">Create an Account</h1>
      </div>
      <div className="m-2 p-2 flex items-center justify-center flex-col">
        <div className="m-2 p-2">
          <h3>Name</h3>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Enter your Name"
            className="p-3 mt-2 w-80"
            style={{
              border: "0.4px solid rgba(151, 146, 140, 0.51)",
              borderRadius: 3,
            }}
          />
        </div>
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
          <h3>Phone Number</h3>
          <input
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
            type="text"
            placeholder="Enter your Phone Number"
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

      <div className="flex items-center justify-center mt-5 flex-col">
        <button
          onClick={() => mailAndPassword()}
          className="bg-color p-3 m-3 w-80 rounded text-white"
        >
          Countinue
        </button>
        <p>
          Already have an account ?
          <span className="txt-color">
            <Link to={"/"}>SIGN IN</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;
