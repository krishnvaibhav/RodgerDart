import React, { useEffect, useRef, useState } from "react";
import TopBar from "./HomeScreenComponent/TopBar";
import SearchBar from "./HomeScreenComponent/SearchBar";
import WelcomeCard from "./HomeScreenComponent/WelcomeCard";
import OfferScreen from "./HomeScreenComponent/OfferScreen";
import CategoryScreen from "./HomeScreenComponent/CategoryScreen";
import MainCardScreen from "./HomeScreenComponent/MainCardScreen";
import BottomContainer from "./HomeScreenComponent/BottomContainer";
import ItemCard from "./RestaurantScreenComponent/ItemCard";
import Icon from "./HomeScreenComponent/ImagePath";
import { HiStar } from "react-icons/hi";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router";
import { RxDividerVertical } from "react-icons/rx";
import { BsClock } from "react-icons/bs";

const RestuarantCardScreen = ({ props }) => {
  const [userName, setUserName] = useState("Nelson");
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const [cardItem, setCardItem] = useState();
  const [cardVendor, setCardVendor] = useState();

  const { cTitle } = useParams();
  const { itemID } = useParams();

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

  const itemRef = collection(db, "item");
  const cardRef = collection(db, "vendor");

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
        setCardVendor(data);
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
      <TopBar
        icon={Icon.BackArrow}
        cart={Icon.cartIc}
        width={deviceWidth}
        isBack={true}
        title={cTitle}
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
        <div className="mb-5">
          <div className="object-fill">
            <img src={Icon.BannerCard} />
          </div>
          <div
            className="flex flex-row h-10 items-center p-2 space-x-1"
            style={{ backgroundColor: "#FEF6F6" }}
          >
            <HiStar size={20} color="#ECCB57" />
            <p
              className="font-medium"
              style={{
                fontSize: 10,
              }}
            >
              {cardItem &&
                cardItem.map((item) =>
                  item.vid === itemID ? (
                    <span key={item.id}>{item.rating}</span>
                  ) : null
                )}
            </p>
            <RxDividerVertical size={20} />
            <BsClock size={15} />
            <p
              className=" font-medium"
              style={{
                fontSize: 10,
              }}
            >
              {cardVendor &&
                cardVendor.map((item) =>
                  item.vid === itemID ? (
                    <span key={item.id}>{item.del_time} MINS</span>
                  ) : null
                )}
            </p>
            <RxDividerVertical size={20} />
            <p
              className="font-medium"
              style={{
                fontSize: 10,
              }}
            >
              {cardVendor &&
                cardVendor.map((item) =>
                  item.vid === itemID ? (
                    <span key={item.id}>Delivery fee N{item.del_price}</span>
                  ) : null
                )}
            </p>
            <RxDividerVertical size={20} />
            <p
              className="font-medium"
              style={{
                fontSize: 10,
              }}
            >
              {cardVendor &&
                cardVendor.map((item) =>
                  item.vid === itemID ? (
                    <span key={item.id}>Open until {item.cl_time}</span>
                  ) : null
                )}
            </p>
          </div>
        </div>
        <div className="p-4 pb-1">
          <div
            style={{
              overflowY: "scroll",
            }}
          >
            {cardItem && itemID ? (
              getFilteredItems().map((item, index) => (
                <ItemCard
                  key={index}
                  image={Icon.MegaChicken} // Update with the actual item image
                  foodName={item.name}
                  price={item.price}
                />
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
      <BottomContainer width={deviceWidth} />
    </div>
  );
};

export default RestuarantCardScreen;
