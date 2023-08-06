import React, { useEffect, useRef, useState } from "react";
import TopBar from "./HomeScreenComponent/TopBar";
import SearchBar from "./HomeScreenComponent/SearchBar";
import WelcomeCard from "./HomeScreenComponent/WelcomeCard";
import OfferScreen from "./HomeScreenComponent/OfferScreen";
import CategoryScreen from "./HomeScreenComponent/CategoryScreen";
import MainCardScreen from "./HomeScreenComponent/MainCardScreen";
import BottomContainer from "./HomeScreenComponent/BottomContainer";
import Icon from "./HomeScreenComponent/ImagePath";
import { CSSTransition } from "react-transition-group";
import "./NotificationCard.css";

const HomeScreen = () => {
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
  const [favTime, setFavTime] = useState(false);

  return (
    <div
      style={{
        height: "100vh", // Set the height of the container to fill the viewport
        overflowY: "hidden", // Hide vertical scrollbar for the entire container
        position: "relative", // Set position to relative for the fixed top bar
        paddingTop: "40px", // Add padding to create space for the TopBar
      }}
    >
      <CSSTransition
        in={favTime}
        timeout={300}
        classNames="notification"
        unmountOnExit
      >
        {/* The div with the sliding animation */}
        <div
          className="topNotification"
          style={{
            position: "absolute",
            backgroundColor: "#F2CECE",
            width: "92%",
            height: "10%",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <div
            style={{
              width: "100%",
              margin: 30,
            }}
          >
            <div className="flex flex-row items-center space-x-3">
              <img
                className="self-center"
                src={Icon.NotificationIc}
                alt="Notification Icon"
              />
              <h1 className="">Added to favorites.</h1>
            </div>
          </div>
        </div>
      </CSSTransition>
      <TopBar
        icon={Icon.MenuIc}
        cart={Icon.cartIc}
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
            <WelcomeCard statename={userName} />
            <SearchBar width={width} />
            <OfferScreen />
            <CategoryScreen width={width} />
            <MainCardScreen title="Eatery" fav={setFavTime} />
            <MainCardScreen title="Gffts" fav={setFavTime} />
            <MainCardScreen title="Grocery" fav={setFavTime} />
            <MainCardScreen title="Pastries" fav={setFavTime} />
            <MainCardScreen title="Pharmacy" fav={setFavTime} />
          </div>
        </div>
      </div>
      <BottomContainer width={deviceWidth} />
    </div>
  );
};

export default HomeScreen;
