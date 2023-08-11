import React, { useEffect, useRef, useState } from "react";
import ongoinimg from "../../assets/ongoinghistoryimg.png";
import BottomContainer from "./BottomContainer";
import { useNavigate } from "react-router-dom";
import TopBar from "./TopBar";

import Icon from "./ImagePath";
import {
  collection,
  doc,
  getDoc,
  getDocFromCache,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

const OrderHistory = () => {
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

  const [doneList, setDoneList] = useState([]);
  const [ongoingList, setOngoingList] = useState([]);
  const [ongoingOrder, setOngoingOrder] = useState([]);

  const loadDoneData = async () => {
    try {
      const q = query(collection(db, "orders"), where("completed", "==", true));
      const querySnapshot = await getDocs(q);

      const doneData = querySnapshot.docs.map((doc) => doc.data().items);

      const data = [];

      if (doneData.length > 0 && doneData[0].length > 0) {
        doneData[0].map(async (el) => {
          try {
            data.push(el);

            const docRef = doc(db, "item", el);
            const docSnap = await getDoc(docRef);
          } catch (error) {
            console.error("Error fetching item:", error);
          }
        });
        setDoneList(data);
      } else {
        console.log("No completed orders or items found.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Call the function to load data

  const loadOngoingData = async () => {
    const q = query(collection(db, "orders"), where("completed", "==", false));

    const querySnapshot = await getDocs(q);
    const doneData = [];
    querySnapshot.forEach((doc) => {
      doneData.push(doc.data());
    });
    setOngoingList(doneData);
  };

  const loadDoneOrder = async () => {};

  useEffect(() => {
    loadDoneData();
    loadOngoingData();
  }, []);

  useEffect(() => {
    console.log(doneList);
    const fetchItemData = async () => {
      try {
        const itemPromises = doneList.map(async (el) => {
          console.log(`fetching ${el}`);
          const docRef = doc(db, "item", el);
          const docSnap = await getDoc(docRef);
          return docSnap.data();
        });
        const itemData = await Promise.all(itemPromises);
        console.log("Item data:", itemData);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    if (doneList.length > 0) {
      fetchItemData();
    }
  }, [doneList]);

  const orderList = [
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
  ];

  // const orderList = [];

  const navigate = useNavigate();

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
        <div className="p-4 pb-1 item-center">
          <div
            style={{
              overflowY: "scroll",
            }}
          >
            <div className="flex items-center justify-center w-4/5 m-auto">
              <button
                className="w-1/2 flex justify-center items-center p-2 txt-color"
                style={{
                  borderBottom: "1px solid #B10000",
                }}
              >
                Ongoing
              </button>
              <button
                className="w-1/2 flex justify-center items-center p-2"
                style={{
                  borderBottom: "1px solid black",
                }}
              >
                Completed
              </button>
            </div>
          </div>
          <div
            className={`flex flex-col items-center ${
              orderList.length === 0 ? "justify-around" : ""
            }`}
            style={{ height: "78%", overflowY: "scroll" }}
          >
            {orderList.length === 0 ? (
              <>
                <img src={ongoinimg} alt="" />
                <p style={{ color: "#7E7E7E", fontSize: 20, fontWeight: 400 }}>
                  You have no ongoing order
                </p>
                <button
                  className="p-3 text-white w-60 rounded"
                  style={{ backgroundColor: "#B10000" }}
                >
                  Order Now
                </button>
              </>
            ) : (
              orderList.map((el, index) => (
                <div key={index} style={{ width: "100%" }} className="p-3">
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <p style={{ fontSize: 16, fontWeight: 600 }}>{el.item}</p>
                      <p
                        style={{
                          color: "#868686",
                          fontSize: 16,
                          fontWeight: 600,
                        }}
                      >
                        {el.details}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-end">
                      <p
                        style={{
                          color: "#868686",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                      >
                        {el.price}
                      </p>
                      <p
                        onClick={() => {
                          navigate("/orderdetails");
                        }}
                        style={{
                          color: "#B10000",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                      >
                        View Order Details
                      </p>
                    </div>
                  </div>
                  <hr />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <BottomContainer width={deviceWidth} />
    </div>
  );
};

export default OrderHistory;
