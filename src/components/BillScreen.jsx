import React, { useEffect, useState } from "react";
import BillNavbar from "./BillNavbar";
import BillBottomNav from "./BillBottomNav";
import BillCheckOut from "./BillCheckOut";
import Icon from "./HomeScreenComponent/ImagePath";
import TopBar from "./HomeScreenComponent/TopBar";

const BillScreen = () => {
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      <TopBar
        title="Restuarant"
        icon={Icon.BackArrow}
        cart={Icon.cartIc}
        isBack={true}
        width={deviceWidth}
        style={{
          position: "fixed", // Set position to fixed to make the top bar fixed
          top: 0, // Place the top bar at the top of the viewport
          width: "100%", // Set the width to span the entire viewport
        }}
      />
      <BillCheckOut />
      <BillBottomNav />
    </div>
  );
};

export default BillScreen;
