import menuCard from "../../assets/textalign-left.png";
import shoppingCart from "../../assets/bag-2.png";
import React from "react";

const NavTopBar = (props) => {
  return (
    <div className="flex items-center justify-between m-3 p-3">
      <div>
        <img src={menuCard} alt="" />
      </div>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>{props.title}</h2>
      </div>
      <div>
        <img src={shoppingCart} alt="" />
      </div>
    </div>
  );
};

export default NavTopBar;
