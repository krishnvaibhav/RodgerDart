import React from "react";
import BillNavbar from "./BillNavbar";
import addressimg from "../assets/address.png";
import "../styles/style.css";
import deleteimg from "../assets/trash.png";
import editimg from "../assets/editimg.png";
import { Divider } from "@mui/material";

const AddressScreeen = () => {
  const addressList = [
    {
      name: "Kenneth Micheal",
      address: "19 b, Oko central, Surulere,lagos",
    },
    {
      name: "Kenneth Micheal",
      address: "19 b, Oko central, Surulere,lagos",
    },
    {
      name: "Kenneth Micheal",
      address: "19 b, Oko central, Surulere,lagos",
    },
  ];

  return (
    <div
      className={`flex flex-col items-center ${
        addressList.length === 0 ? "justify-between" : ""
      }`}
      style={{ height: "80vh" }}
    >
      <BillNavbar title="Address" />
      {addressList.length > 0 &&
        addressList.map((el) => {
          return (
            <>
              <div
                className="flex items-center justify-between m-2 p-4"
                style={{ width: "100%" }}
              >
                <div className="">
                  <p style={{ fontSize: 16, fontWeight: 400 }}>{el.name}</p>
                  <p style={{ color: "#7E7E7E", fontSize: 16, fontWeight: 400 }}>
                    {el.address}
                  </p>
                </div>
                <div className="flex items-center">
                  <img src={editimg} alt="" className="mr-2" />
                  <img src={deleteimg} alt="" className="ml-2" />
                </div>
              </div>
              <hr />
            </>
          );
        })}
      {addressList.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <img src={addressimg} alt="" />
          <p style={{ fontSize: 20, fontWeight: 600, color: "#7E7E7E" }}>
            You have not added any address
          </p>
        </div>
      )}
      <div>
        <button
          className="p-3 text-white w-60 rounded"
          style={{ backgroundColor: "#B10000" }}
        >
          Add Address
        </button>
      </div>
    </div>
  );
};

export default AddressScreeen;
