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
import { useParams } from "react-router-dom";
const BrowseScreen = ({ navigate }) => {
  const [userName, setUserName] = useState("Nelson");

  const [browserItem, setBrowserItem] = useState([]);
  const [cardItem, setCardItem] = useState();
  const [cardVendor, setCardVendor] = useState();

  const itemRef = collection(db, "item");
  const cardRef = collection(db, "vendor");
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

  const { cTitle } = useParams();
  const { itemID } = useParams();

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

  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const snapshot = await getDocs(cardRef);
        const data = snapshot.docs.map((doc) => ({
          vid: doc.id,
          name: doc.data().name,
          category: doc.data().category,
          rating: doc.data().rating,
          del_time: doc.data().del_time,
          del_price: doc.data().del_price,
          cl_time: doc.data().cl_time,
        }));
        // setCardVendor(data);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchVendorData();
  }, []);

  const getFilteredItems = () => {
    if (cardItem && itemID) {
      return cardItem.filter((item) => item.vid === itemID);
    }
    return [];
  };

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const snapshot = await getDocs(itemRef);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          price: doc.data().price,
          quant: doc.data().quant,
          type: doc.data().type,
          rating: doc.data().rating,
          vid: doc.data().vid,
          vendor_name:
            cardVendor.find((vendor) => vendor.vid === doc.data().vid)?.name ||
            "Anonymous",
        }));
        setCardItem(data);
      } catch (error) {
        // console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, [getFilteredItems]);

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
        icon={Icon.BackArrow}
        cart={Icon.cartIc}
        width={deviceWidth}
        isBack={true}
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
            <MainCardScreen title="Eatery" fav={setFavTime} />
            <MainCardScreen title="Gifts" fav={setFavTime} />
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

export default BrowseScreen;
