import React from "react";
import BillNavbar from "./BillNavbar";
import { TextField } from "@mui/material";

const MyProfile = () => {
  return (
    <div>
      <BillNavbar title="My Profile" />
      <div className="m-3 p-3 flex flex-col justify-between" style={{height:"80vh"}}>
        <div>
          <div className="m-2 p-2">
            <TextField fullWidth variant="outlined" label="Name" />
          </div>
          <div className="m-2 p-2">
            <TextField fullWidth variant="outlined" label="Email" />
          </div>
          <div className="m-2 p-2">
            <TextField fullWidth variant="outlined" label="Phone" />
          </div>
        </div>
        <div className="m-3 p-3">
          <button
          
            className="text-white rounded p-3"
            style={{ backgroundColor: "#B10000",width:"100%" }}
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
