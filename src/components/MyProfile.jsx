import React, { useEffect, useState } from "react";
import BillNavbar from "./BillNavbar";
import { TextField } from "@mui/material";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const navigate = useNavigate();

  const loadData = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      const data = docSnap.data();
      setName(data.name);
      setEmail(data.email);
      setPhone(data.number);
    } else {
      console.log("No such document!");
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const existingData = docSnap.data();

      const updatedData = {
        ...existingData,
        name: name,
        email: email,
        number: Phone,
      };

      await setDoc(docRef, updatedData);

      console.log("Document successfully updated!");
    }
    navigate(-1);
  };

  return (
    <div>
      <BillNavbar title="My Profile" isBack={true} />
      <div
        className="m-3 p-3 flex flex-col justify-between"
        style={{ height: "80vh" }}
      >
        <div>
          <div className="m-2 p-2">
            <TextField
              fullWidth
              variant="outlined"
              label="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="m-2 p-2">
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="m-2 p-2">
            <TextField
              fullWidth
              variant="outlined"
              label="Phone"
              value={Phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="m-3 p-3">
          <button
            className="text-white rounded p-3"
            style={{ backgroundColor: "#B10000", width: "100%" }}
            onClick={handleSave}
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
