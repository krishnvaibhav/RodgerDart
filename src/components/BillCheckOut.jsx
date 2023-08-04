import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  FormControlLabel,
  FormLabel,
  Input,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import payimg from "../assets/Vector.png";
import bankimg from "../assets/mdi_bank-outline.png";
import cardimg from "../assets/Credit_Card_01.png";
import paystackimg from "../assets/paystack.png";
import Items from "./Items";
import CustomCards from "./CustomCards";
import { useNavigate } from "react-router-dom";

const BillCheckOut = () => {
  const [address, setAddress] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [showBankDetails, setShowBankDetails] = useState(false);

  const handleChange = (event) => {
    setAddress(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setShowBankDetails(event.target.value === "bank");
  };

  const addressList = [
    "123 Main Street, Anytown, USA",
    "456 Oak Avenue, Cityville, Canada",
    "789 Maple Lane, Villagetown, United Kingdom",
    "321 Elm Street, Townsville, Australia",
    "987 Pine Road, Hamletville, New Zealan",
  ];

  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center justify-center w-4/5 m-auto">
        <p
          className="w-1/2 flex justify-center items-center mb-2 p-2 txt-color"
          style={{
            borderBottom: "1px solid #B10000",
          }}
        >
          Delivery
        </p>
        <p
          className="w-1/2 flex justify-center items-center mb-2  p-2"
          style={{
            borderBottom: "1px solid black",
          }}
        >
          Pickup
        </p>
      </div>
      <div>
        <div
          className="flex items-center justify-between"
          style={{
            margin: 20,
          }}
        >
          <p
            style={{
              fontSize: 15,
              color: "#515151",
            }}
          >
            Delivery address
          </p>
          <button
            onClick={() => {
              navigate("/addAddress");
            }}
            style={{
              fontSize: 10,
              color: "#0230B1",
            }}
          >
            + Add new address
          </button>
        </div>
        <div className="m-auto" style={{ margin: 20 }}>
          <div className="mb-3">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Address</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={address}
                label="Address"
                onChange={handleChange}
              >
                {addressList.map((el) => (
                  <MenuItem key={el} value={el}>
                    {el}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <TextField
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
            className="pt-2"
            placeholder="Enter Delivery Instruction"
            variant="outlined"
            fullWidth
          />
        </div>
      </div>
      <div
        className="flex flex-col items-start justify-start"
        style={{ margin: 20, fontSize: 15 }}
      >
        <label
          className="flex items-center justify-center"
          style={{ width: "100%" }}
        >
          <input
            type="radio"
            value="paystack"
            checked={selectedOption === "paystack"}
            onChange={handleOptionChange}
          />
          <div
            className="flex items-center justify-between"
            style={{
              border: "1px solid black",
              padding: "10px",
              margin: 15,
              background: "#F5F5F5",
              borderWidth: 0,
              width: "100%",
            }}
          >
            <div className="flex m-1">
              <img src={payimg} alt="" style={{ marginRight: 10 }} />
              <p style={{ fontSize: 12, fontWeight: 400 }}>Paystack</p>
            </div>
            <div>
              <img src={paystackimg} alt="" />
            </div>
          </div>
        </label>
        <label
          className="flex items-center justify-center"
          style={{ width: "100%" }}
        >
          <input
            type="radio"
            value="bank"
            checked={selectedOption === "bank"}
            onChange={handleOptionChange}
          />
          <div
            className="flex items-center justify-between"
            style={{
              border: "1px solid black",
              padding: "10px",
              margin: 15,
              background: "#F5F5F5",
              borderWidth: 0,
              width: "100%",
            }}
          >
            <div className="flex m-1">
              <img src={cardimg} alt="" style={{ marginRight: 10 }} />
              <p style={{ fontSize: 12, fontWeight: 400 }}>Debit Card</p>
            </div>
          </div>
        </label>
        {showBankDetails && (
          <div style={{ margin: 20 }}>
            <CustomCards />
          </div>
        )}
        <label
          className="flex items-center justify-center"
          style={{ width: "100%" }}
        >
          <input
            type="radio"
            value="card"
            checked={selectedOption === "card"}
            onChange={handleOptionChange}
          />
          <div
            className="flex items-center justify-between"
            style={{
              border: "1px solid black",
              padding: "10px",
              margin: 15,
              background: "#F5F5F5",
              borderWidth: 0,
              width: "100%",
            }}
          >
            <div className="flex m-1">
              <img src={bankimg} alt="" style={{ marginRight: 10 }} />
              <p style={{ fontSize: 12, fontWeight: 400 }}>Bank Transfer</p>
            </div>
          </div>
        </label>
        <br />
      </div>
      <Items />
    </div>
  );
};

export default BillCheckOut;
