import React, { useContext, useEffect, useRef, useState } from "react";
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
import { AppContext } from "../../context/appContext";

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
  const [orderDoneList, setOrderDoneList] = useState([]);
  const [ongoingOrder, setOngoingOrder] = useState([]);
  const [doneOrder, setDoneOrder] = useState([]);
  const [vid, setVid] = useState("");
  const [vendor, setVendor] = useState([]);

  const loadDoneData = async () => {
    const q = query(collection(db, "orders"), where("completed", "==", true));
    const querySnapshot = await getDocs(q);
    const doneData = [];
    const vidList = [];
    querySnapshot.forEach((doc) => {
      doneData.push(doc.data());
      vidList.push(doc.data().vid);
    });
    setVid(vidList);
    setOrderDoneList(doneData);
  };

  const loadOngoingData = async () => {
    const q = query(collection(db, "orders"), where("completed", "==", false));

    const querySnapshot = await getDocs(q);
    const doneData = [];
    const vidList = [];
    querySnapshot.forEach((doc) => {
      doneData.push(doc.data());
      vidList.push(doc.data().vid);
    });
    setVid(vidList);
    setOngoingList(doneData);
  };

  useEffect(() => {
    console.log(ongoingList);
  }, [ongoingList]);

  useEffect(() => {
    console.log(orderDoneList);
  }, [orderDoneList]);

  useEffect(() => {
    loadDoneData();
    loadOngoingData();
  }, []);

  const loadDoneItem = async () => {
    const food = [];
    for (const id of doneList) {
      const docRef = doc(db, "item", id.trim());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        food.push(docSnap.data());
      } else {
        console.log("No such document!");
      }
    }
    setDoneOrder(food);
  };

  useEffect(() => {
    loadDoneItem();
  }, [doneList]);

  const { setItems } = useContext(AppContext);

  useEffect(() => {
    console.log("doneOrder");
    console.log(doneOrder);
    setItems(doneOrder);
  }, []);

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("ongoing");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div
      style={{
        height: "100vh",
        overflowY: "hidden",
        position: "relative",
        paddingTop: "40px",
      }}
    >
      <TopBar
        icon={Icon.MenuIc}
        cart={Icon.cartIc}
        width={deviceWidth}
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
        }}
      />
      <div
        style={{
          height: "calc(100vh - 120px)",
          overflowY: "scroll",
          paddingBottom: "20px",
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
                onClick={() => handleTabClick("ongoing")}
              >
                Ongoing
              </button>
              <button
                className="w-1/2 flex justify-center items-center p-2"
                style={{
                  borderBottom: "1px solid black",
                }}
                onClick={() => handleTabClick("completed")}
              >
                Completed
              </button>
            </div>
          </div>
          {activeTab === "ongoing" && (
            <div
              className={`flex flex-col items-center ${
                ongoingList.length === 0 ? "justify-around" : ""
              }`}
              style={{ height: "78%", overflowY: "scroll" }}
            >
              {ongoingList.length === 0 ? (
                <>
                  <img src={ongoinimg} alt="" />
                  <p
                    style={{ color: "#7E7E7E", fontSize: 20, fontWeight: 400 }}
                  >
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
                ongoingList.map((el, index) => (
                  <div key={index} style={{ width: "100%" }} className="p-3">
                    <div className="mt-2 flex items-center justify-between">
                      <div>
                        <p style={{ fontSize: 16, fontWeight: 600 }}>
                          {el.vendor}
                        </p>
                        <p
                          style={{
                            color: "#868686",
                            fontSize: 16,
                            fontWeight: 600,
                          }}
                        >
                          {/* {el.details} */}
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
                          {el.price.finalTotal + el.tip}
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
          )}
          {activeTab === "completed" && (
            <div
              className={`flex flex-col items-center ${
                orderDoneList.length === 0 ? "justify-around" : ""
              }`}
              style={{ height: "78%", overflowY: "scroll" }}
            >
              {orderDoneList.length === 0 ? (
                <>
                  <img src={ongoinimg} alt="" />
                  <p
                    style={{ color: "#7E7E7E", fontSize: 20, fontWeight: 400 }}
                  >
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
                orderDoneList.map((el, index) => (
                  <div key={index} style={{ width: "100%" }} className="p-3">
                    <div className="mt-2 flex items-center justify-between">
                      <div>
                        <p style={{ fontSize: 16, fontWeight: 600 }}>
                          {el.vendor}
                        </p>
                        <p
                          style={{
                            color: "#868686",
                            fontSize: 16,
                            fontWeight: 600,
                          }}
                        >
                          {/* {el.details} */}
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
                          {el.price.finalTotal + el.tip}
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
          )}
        </div>
      </div>
      <BottomContainer width={deviceWidth} />
    </div>
  );
};

export default OrderHistory;
