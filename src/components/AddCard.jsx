import React, { useState } from "react";
import BillNavbar from "./BillNavbar";
import { TextField } from "@mui/material";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const AddCard = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [CVV, setCVV] = useState("");
  const [expiry, setExpiry] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const encryptedNumber = CryptoJS.AES.encrypt(
      number,
      "secret_key"
    ).toString();
    const encryptedCVV = CryptoJS.AES.encrypt(CVV, "secret_key").toString();
    const data = await updateDoc(docRef, {
      cards: arrayUnion({
        name: name,
        CardNumber: encryptedNumber,
        CVV: encryptedCVV,
        expiry: expiry,
      }),
    });
    navigate(-1);
  };
  return (
    <div>
      <BillNavbar title="Add New Cards" isBack={true} />
      <div
        className="flex flex-col items-center justify-between"
        style={{ height: "80vh" }}
      >
        <div>
          <div
            className=" p-4 m-4"
            style={{ backgroundColor: "#D1D1D1", borderRadius: 12 }}
          >
            <h2 style={{ fontSize: 12, fontWeight: 500 }}>
              How safe is my card details?
            </h2>
            <p style={{ fontSize: 10, fontWeight: 500 }}>
              Your card details are{" "}
              <span style={{ color: "#AC2E0E" }}>NOT</span> saved on any of our
              servers. They are securely passed to your bank for processing and
              verification.
            </p>
          </div>
          <div className="m-4 p-4">
            <TextField
              className=""
              id="standard-basic"
              label="Card Number"
              variant="standard"
              fullWidth
              margin="dense"
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
            <TextField
              className=""
              id="standard-basic"
              label="CVV"
              variant="standard"
              fullWidth
              margin="dense"
              value={CVV}
              onChange={(e) => {
                setCVV(e.target.value);
              }}
            />
            <TextField
              className=""
              id="standard-basic"
              label="Expiry Date"
              variant="standard"
              fullWidth
              margin="dense"
              value={expiry}
              onChange={(e) => {
                setExpiry(e.target.value);
              }}
            />
            <TextField
              className=""
              id="standard-basic"
              label="Name On The Card"
              variant="standard"
              fullWidth
              margin="dense"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="m-4 p-4" style={{ width: "90%" }}>
          <button
            className="p-3 mt-5 text-white"
            style={{
              backgroundColor: "#B10000",
              width: "100%",
              borderRadius: 5,
            }}
            onClick={handleClick}
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCard;
