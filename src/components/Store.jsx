import React, { useEffect, useRef, useState } from "react";
import TopBar from "./HomeScreenComponent/TopBar";
import SearchBar from "./HomeScreenComponent/SearchBar";
import WelcomeCard from "./HomeScreenComponent/WelcomeCard";
import OfferScreen from "./HomeScreenComponent/OfferScreen";
import CategoryScreen from "./HomeScreenComponent/CategoryScreen";
import StoreScreenCard from "./StoreScreenCard";
import BottomContainer from "./HomeScreenComponent/BottomContainer";
import Icon from "./HomeScreenComponent/ImagePath";

const Restuarants = () => {
  const [userName, setUserName] = useState("Nelson");
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
  const width = useRef(deviceWidth / 2 + deviceWidth / 3);

  return (
    <div
      style={{
        height: "100vh", // Set the height of the container to fill the viewport
        overflowY: "hidden", // Hide vertical scrollbar for the entire container
        position: "relative", // Set position to relative for the fixed top bar
        paddingTop: "40px", // Add padding to create space for the TopBar
      }}
    >
      <TopBar
        title="Restuarant"
        icon={Icon.MenuIc}
        cart={Icon.cartIc}
        isBack={false}
        width={deviceWidth}
        style={{
          position: "fixed", // Set position to fixed to make the top bar fixed
          top: 0, // Place the top bar at the top of the viewport
          width: "100%", // Set the width to span the entire viewport
        }}
      />
      <div
        style={{
          height: "calc(100vh - 120px)", // Calculate the height of the scrollable content area (subtract the height of the TopBar and BottomContainer)
          overflowY: "scroll", // Enable vertical scrolling for the content area
          paddingBottom: "20px", // Add padding to create space for the BottomContainer
        }}
      >
        <div className="p-4 pb-1">
          <div
            style={{
              overflowY: "scroll",
            }}
          >
            <SearchBar width={width} />
            <CategoryScreen width={width} />
            <StoreScreenCard title="Eatery" />
          </div>
        </div>
      </div>
      <BottomContainer width={deviceWidth} />
    </div>
  );
};

export default Restuarants;
