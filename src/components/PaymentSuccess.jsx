import React from "react";
import BillNavbar from "./BillNavbar";
import PaymentSuccessimg from "../assets/paymentsucess.png";

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-between" style={{height:"80vh"}}>
      <BillNavbar title="Payment" />
      <div className="flex flex-col items-center justify-center">
        <img src={PaymentSuccessimg} alt="" />
        <p style={{ fontSize: 24, fontWeight: 600 }}>Payment Successful</p>
        <p style={{ fontSize: 16,width:"80%",textAlign:'center'}}>
          Your order has been placed and is on it's way{" "}
        </p>
      </div>
      <div>
        <button
          className="p-3 text-white w-60 rounded"
          style={{ backgroundColor: "#B10000" }}
        >
          Track Order
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
