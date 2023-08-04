import React, { useEffect, useState } from "react";
import menuCard from "../../assets/textalign-left.png";
import shoppingCart from "../../assets/bag-2.png";
import { useNavigate } from "react-router-dom";

const TopBar = (props) => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(props.title);
  });
  return (
    <div
      className="flex flex-row justify-between items-center"
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        display: "flex",
        padding: "10px",
        backgroundColor: "#ffffff",
      }}
    >
      <div className="rounded-full w-8 h-8 flex items-center justify-center">
        <button
          onClick={() => {
            console.log("log");
            navigate("/browscreen");
          }}
        >
          <img src={menuCard} alt="menu" />
        </button>
      </div>
      <h1>{title}</h1>
      <div className="flex-1 flex justify-end">
        <div className="rounded-full w-8 h-8 flex items-center justify-center">
          <img src={props.cart} alt="cart" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
