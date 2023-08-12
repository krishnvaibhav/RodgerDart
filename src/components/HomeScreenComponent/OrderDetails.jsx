import React, { useContext } from "react";
import NavTopBar from "./NavTopBar";
import { Divider } from "@mui/material";
import { AppContext } from "../../context/appContext";

const OrderDetails = () => {
  const { items } = useContext(AppContext);

  console.log(items);

  const items1 = [
    { name: "Special Jellof Rice", price: "N4,500" },
    { name: "Special Jellof Rice", price: "N4,500" },
    { name: "Special Jellof Rice", price: "N4,500" },
    { name: "Special Jellof Rice", price: "N4,500" },
    { name: "Special Jellof Rice", price: "N4,500" },
    { name: "Special Jellof Rice", price: "N4,500" },
  ];
  return (
    <div>
      <div style={{ height: "12%" }}>
        <NavTopBar title="Order History" />
        <div className="flex items-center justify-center w-4/5 m-auto">
          <p
            className="w-1/2 flex justify-center items-center p-2 txt-color"
            style={{
              borderBottom: "1px solid #B10000",
            }}
          >
            Ongoing
          </p>
          <p
            className="w-1/2 flex justify-center items-center p-2"
            style={{
              borderBottom: "1px solid black",
            }}
          >
            Completed
          </p>
        </div>
      </div>
      <div className="m-3 p-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p style={{ fontSize: 16, fontWeight: 600 }}>Order Rceipt</p>
            <p style={{ color: "#868686", fontSize: 12, fontWeight: 500 }}>
              Order number : 1245
            </p>
          </div>
          <div>
            <p style={{ color: "#868686", fontSize: 12, fontWeight: 500 }}>
              Date :Today at 02:30pm
            </p>
          </div>
        </div>
        <div className="mt-3">
          <p style={{ fontSize: 15, fontWeight: 400, color: "#263238" }}>
            Items
          </p>
          <div className="flex flex-col items-center justify-between mt-2">
            {items1.map((el) => (
              <div
                className="flex items-center justify-between"
                style={{ width: "100%" }}
              >
                <p style={{ fontSize: 15, fontWeight: 400, color: "#263238" }}>
                  Special Jellof Rice
                </p>
                <p style={{ fontSize: 15, fontWeight: 400, color: "#263238" }}>
                  N4,500
                </p>
              </div>
            ))}
            <div
              className="flex items-center justify-between mt-2
              "
              style={{ width: "100%" }}
            >
              <p style={{ fontSize: 15, fontWeight: 600 }}>Subtotal</p>
              <p style={{ fontSize: 15, fontWeight: 600 }}>20,600</p>
            </div>
            <Divider />
            <div
              className="flex items-center justify-between mt-2
              "
              style={{ width: "100%" }}
            >
              <div
                className="flex items-center justify-between"
                style={{ width: "100%" }}
              >
                <p style={{ fontSize: 15, fontWeight: 400 }}>Delivery fee</p>
                <p style={{ fontSize: 15, fontWeight: 400 }}>N1,500</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
