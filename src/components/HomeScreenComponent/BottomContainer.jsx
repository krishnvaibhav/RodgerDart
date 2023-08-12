import React from "react";
import Icon from "./ImagePath";
import { useNavigate, useLocation } from "react-router-dom";

const BottomContainer = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomeScreen = location.pathname === "/homescreen";
  const isRestScreen =
    location.pathname === "/storescreen" ||
    location.pathname === `/restCard/:itemID/:cTitle`;
  const isBrowScreen = location.pathname === "/browscreen";
  const isOrdeScreen = location.pathname === "/orderhistory";
  return (
    <div
      className="flex justify-around border-t-2 pt-3"
      style={{
        width: props.width + "px",
      }}
    >
      <div className="flex flex-col items-center pt-1">
        <button
          onClick={() => {
            console.log("log");
            navigate("/homescreen");
          }}
        >
          <img
            src={isHomeScreen ? Icon.HomeIcon : Icon.NonSelHome}
            className="w-7"
          />
        </button>
        <h2 className="text-xs">Home</h2>
      </div>
      <div className="flex flex-col items-center pt-1">
        <button
          onClick={() => {
            console.log("log");
            navigate("/storescreen");
          }}
        >
          <img
            src={isRestScreen ? Icon.SelStoreIcon : Icon.StoreIcon}
            className="w-7"
          />
        </button>
        <h2 className="text-xs">Restaurants</h2>
      </div>
      <div className="flex flex-col items-center pt-1">
        <button
          onClick={() => {
            console.log("log");
            navigate("/browscreen");
          }}
        >
          <img
            src={isBrowScreen ? Icon.selBrowScreen : Icon.BrowseIcon}
            className="w-7"
          />
        </button>
        <h2 className="text-xs">Browse</h2>
      </div>
      <div className="flex flex-col items-center pt-1">
        <button
          onClick={() => {
            console.log("log");
            navigate("/orderhistory");
          }}
        >
          <img
            src={isOrdeScreen ? Icon.selectOrder : Icon.OrderIcon}
            className="w-7"
          />
        </button>
        <h2 className="text-xs">Order</h2>
      </div>
    </div>
  );
};

export default BottomContainer;
