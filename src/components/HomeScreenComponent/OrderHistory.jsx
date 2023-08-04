import React from "react";
import NavTopBar from "./NavTopBar";
import ongoinimg from "../../assets/ongoinghistoryimg.png";
import BottomContainer from "../HomeScreenComponent/BottomContainer";

const OrderHistory = () => {
  const orderList = [
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
  ];

  return (
    <div style={{ height: "99vh" }}>
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
      <div
        className={`flex flex-col items-center ${
          orderList.length === 0 ? "justify-around" : ""
        }`}
        style={{ height: "78%", overflowY: "scroll" }}
      >
        {orderList.length === 0 ? (
          <>
            <img src={ongoinimg} alt="" />
            <p style={{ color: "#7E7E7E", fontSize: 20, fontWeight: 400 }}>
              You have no ongoing order{" "}
            </p>
            <button
              className="p-3 text-white w-60 rounded"
              style={{ backgroundColor: "#B10000" }}
            >
              Order Now
            </button>
          </>
        ) : (
          orderList.map((el, index) => (
            <div key={index} style={{ width: "100%" }} className="p-3">
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p style={{ fontSize: 14, fontWeight: 400 }}>{el.item}</p>
                  <p style={{ color: "#A4AAAD", fontSize: 10 }}>{el.details}</p>
                </div>
                <div>
                  <p style={{ color: "#455A64" }}>{el.price}</p>
                  <p style={{ color: "#455A64" }}>{el.price}</p>
                </div>
              </div>
              <hr />
            </div>
          ))
        )}
      </div>
      <div style={{ height: "10%" }}>
        <BottomContainer />
      </div>
    </div>
  );
};

export default OrderHistory;
