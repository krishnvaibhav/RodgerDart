import React, { useEffect, useState } from "react";
import MainCards from "./HomeScreenComponent/MainCards";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const MainCardScreen = (props) => {
  const [cardVendor, setCardVendor] = useState([]);
  const [cardItem, setCardItem] = useState([]);
  const [userData, setUserData] = useState({});

  const cardRef = collection(db, "vendor");
  const itemRef = collection(db, "item");
  const userRef = collection(db, "users");

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const snapshot = await getDocs(cardRef);
        const data = snapshot.docs.map((doc) => ({
          vid: doc.id,
          name: doc.data().name,
          category: doc.data().category,
          rating: doc.data().rating,
        }));
        setCardVendor(data);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchVendorData();
  }, []);

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
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const docref = doc(db, "users", auth.currentUser.uid);
      const docsnap = await getDoc(docref);
      const userAcc = docsnap.data();
      setUserData(userAcc);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  // Filter vendors based on the category matching props.title
  const filteredVendors = cardVendor.filter(
    (vendor) => vendor.category.toLowerCase() === props.title.toLowerCase()
  );

  const hasVendorIn = cardVendor.some(
    (vendor) => vendor.category.toLowerCase() === props.title.toLowerCase()
  );
  const maxColumns = 2;

  // Calculate the width of each card based on the maxColumns
  const cardWidth = `${100 / maxColumns}%`;

  const isItemInFavorites = (itemId) => {
    return userData.favItem && userData.favItem.includes(itemId);
  };

  console.log(cardItem);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {filteredVendors.map((filteredVendor, index) => {
          return (
            <div
              key={index * index}
              style={{
                width: cardWidth,
                padding: "1px",
                boxSizing: "border-box",
              }}
            >
              <MainCards
                key={index}
                ids={filteredVendor.vid}
                foodName={filteredVendor.name}
                rating={filteredVendor.rating}
                fav={isItemInFavorites(cardItem.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainCardScreen;
