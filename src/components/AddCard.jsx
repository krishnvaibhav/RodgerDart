import React from "react";
import BillNavbar from "./BillNavbar";
import { TextField } from "@mui/material";

const AddCard = () => {
  return (
    <div>
      <BillNavbar title="Add New Cards" />
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
            />
            <TextField
              className=""
              id="standard-basic"
              label="CVV"
              variant="standard"
              fullWidth
              margin="dense"
            />
            <TextField
              className=""
              id="standard-basic"
              label="Expiry Date"
              variant="standard"
              fullWidth
              margin="dense"
            />
            <TextField
              className=""
              id="standard-basic"
              label="Name On The Card"
              variant="standard"
              fullWidth
              margin="dense"
            />
          </div>
        </div>
        <div className="m-4 p-4" style={{width:"90%"}}>
          <button
            className="p-3 mt-5 text-white"
            style={{
              backgroundColor: "#B10000",
              width: "100%",
              borderRadius: 5,
            }}
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCard;
