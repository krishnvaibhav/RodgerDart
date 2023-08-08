import React, { useEffect, useRef, useState } from "react";
import TopBar from "./HomeScreenComponent/TopBar";
import SearchBar from "./HomeScreenComponent/SearchBar";
import CategoryScreen from "./HomeScreenComponent/CategoryScreen";
import MainCardScreen from "./HomeScreenComponent/MainCardScreen";
import BottomContainer from "./HomeScreenComponent/BottomContainer";
import Icon from "./HomeScreenComponent/ImagePath";
import { CSSTransition } from "react-transition-group";

import { auth, db, rootRef, storage } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import "./NotificationCard.css";
const BrowseScreen = ({ navigate }) => {
  const [userName, setUserName] = useState("Nelson");

  const [browserItem, setBrowserItem] = useState([]);

  const itemRef = collection(db, "item");
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
    };

    getDocs(itemRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        setBrowserItem([doc.data()]);
      });
    });

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
            <SearchBar width={width} />
            <CategoryScreen width={width} />
            {browserItem.map((item, key) => (
              <MainCardScreen
                type={item.type}
                key={key}
                fav={setFavTime}
                foodName={item.name}
                price={item.price}
              />
            ))}
          </div>
        </div>
      </div>
      <BottomContainer width={deviceWidth} />
    </div>
  );
};

export default BrowseScreen;
