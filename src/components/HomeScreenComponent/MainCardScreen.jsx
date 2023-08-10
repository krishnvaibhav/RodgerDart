import React, { useEffect, useState } from "react";
import MainCards from "./MainCards";
import Icons from "./ImagePath";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const MainCardScreen = (props) => {
  const [cardVendor, setCardVendor] = useState([]);
  const [cardItem, setCardItem] = useState([]);

  const cardRef = collection(db, "vendor");
  const itemRef = collection(db, "item");

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const snapshot = await getDocs(cardRef);
        const data = snapshot.docs.map((doc) => ({
          vid: doc.id,
          name: doc.data().name,
          category: doc.data().category,
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
            "Anonymus",
        }));
        setCardItem(data);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, []);

  const items = [
    {
      image: Icons.MegaChicken,
      foodName: props.foodName,
    },
  ];

  const filteredState = cardItem.filter((item) =>
    cardVendor.some((vendor) => vendor.vid === item.vid)
  );
  const hasItemsWithType = cardItem.some(
    (item) => item.type.toLowerCase() === props.title.toLowerCase()
  );

  return (
    <div>
      {hasItemsWithType && (
        <div>
          <h1 className="font-semibold text-black text-lg">{props.title}</h1>
        </div>
      )}
      <div
        style={{
          overflowY: "scroll",
          whiteSpace: "nowrap",
        }}
        className="flex"
      >
        {cardItem
          .filter(
            (item) => item.type.toLowerCase() === props.title.toLowerCase()
          )
          .map((filteredItem, index) => {
            const vendor = cardVendor.find(
              (vendor) => vendor.vid === filteredItem.vid
            );
            const vendorName = vendor ? vendor.name : "Unknown Vendor";

            return (
              <div key={index}>
                <MainCards
                  key={index}
                  foodName={filteredItem.name}
                  rating={filteredItem.rating}
                  vendorName={vendorName}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MainCardScreen;
