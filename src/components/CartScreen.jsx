import React from "react";
import TopBar from "./HomeScreenComponent/TopBar";
import Icon from "./HomeScreenComponent/ImagePath.js";

const CartScreen = () => {
  return (
    <div>
      <TopBar title="Your Cart" icon={Icon.BackArrow} navigationPath="goback" />
    </div>
  );
};

export default CartScreen;
