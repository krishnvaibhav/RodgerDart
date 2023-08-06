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
        padding: "8px 12px",
        backgroundColor: "#ffffff",
      }}
    >
      <div className="rounded-full w-8 h-8 flex items-center justify-center">
        <button
          onClick={() => {
            console.log("log");
            navigate(props.navigationPath);
          }}
        >
          <img src={props.icon} alt="menu" />
        </button>
      </div>
      <h1 className="font-semibold" style={{ textAlign: "center", flex: 1 }}>
        {title}
      </h1>
      {props.cart ? (
        <div className="rounded-full w-8 h-8 flex items-center justify-center">
          <button
            onClick={() => {
              navigate("/cartscreen");
            }}
          >
            <img src={props.cart} alt="cart" />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default TopBar;
