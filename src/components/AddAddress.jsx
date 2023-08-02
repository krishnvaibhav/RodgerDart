import React from "react";
import BillNavbar from "./BillNavbar";
import { Autocomplete, TextField } from "@mui/material";

const AddAddress = () => {
  return (
    <div>
      <BillNavbar title="Address" />
      <div className="m-3 p-3">
        <div className="m-3">
          <p style={{ fontSize: 16, fontWeight: 500, color: "#3C3E3E" }}>
            First Name
          </p>
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="Enter First Name"
            variant="outlined"
          />
        </div>
        <div className="m-3">
          <p style={{ fontSize: 16, fontWeight: 500, color: "#3C3E3E" }}>
            Last Name
          </p>
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="Enter Last Name"
            variant="outlined"
          />
        </div>
        <div className="m-3">
          <p style={{ fontSize: 16, fontWeight: 500, color: "#3C3E3E" }}>
            Email
          </p>
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="Enter Email"
            variant="outlined"
          />
        </div>
        <div className="m-3">
          <p style={{ fontSize: 16, fontWeight: 500, color: "#3C3E3E" }}>
            Phone
          </p>
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="Enter Phone Number"
            variant="outlined"
          />
        </div>
        <div className="m-3">
          <p style={{ fontSize: 16, fontWeight: 500, color: "#3C3E3E" }}>
            State
          </p>
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="Enter State"
            variant="outlined"
          />
        </div>
        <div className="m-3">
          <p style={{ fontSize: 16, fontWeight: 500, color: "#3C3E3E" }}>
            Local Area
          </p>
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="Enter Local Area"
            variant="outlined"
          />
        </div>
        <div className="m-3">
          <p style={{ fontSize: 16, fontWeight: 500, color: "#3C3E3E" }}>
            Address
          </p>
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="Enter Email"
            variant="outlined"
          />
          {/* <Autocomplete
            apiKey={"AIzaSyDesOie1K0-Ho2y_Aj35-FNI8L2Jk8P-qg"}
            onPlaceSelected={(place) => {
              console.log(place);
            }}
          /> */}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="p-3 text-white rounded"
          style={{ backgroundColor: "#B10000", width: "83%" }}
        >
          Save
        </button>
      </div>
      
    </div>
  );
};

export default AddAddress;
