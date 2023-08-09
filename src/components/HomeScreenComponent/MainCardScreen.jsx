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

  const fetchVendorData = async () => {
    try {
      getDocs(cardRef).then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          vid: doc.id,
          name: doc.data().name,
          category: doc.data().category,
        }));
        setCardVendor({ data });
      });

      // console.log(data);
    } catch (error) {
      // Handle any potential errors here
      console.error("Error fetching data:", error);
    }
  };

  fetchVendorData();

  const fetchItemData = async () => {
    try {
      getDocs(itemRef).then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          price: doc.data().price,
          quant: doc.data().quant,
          type: doc.data().type,
          rating: doc.data().rating,
          vid: doc.data().vid,
        }));
        setCardItem({ data });
      });
    } catch (error) {
      // Handle any potential errors here
      console.error("Error fetching data:", error);
    }
  };

  fetchItemData();

  const items = [
    {
      fav: props.fav,
      image: Icons.MegaChicken,
      foodName: props.foodName,
    },
  ];

  useEffect(() => {
    items.forEach((el) => {
      console.log(el.fav);
    });
  }, []);

  return (
    <div>
      <div>
        <h1 className="font-semibold text-black text-lg">{props.title}</h1>
      </div>
      <div
        style={{
          overflowY: "scroll",
          whiteSpace: "nowrap",
        }}
        className="flex"
      >
        {/* {items.map((el) => (
          <MainCards fav={el.fav} image={el.image} foodName={el.foodName} />
        ))} */}

        {cardItem.map((item, index) => {
          cardVendor.vid === cardItem[index].vid && (
            <MainCards key={index} foodName={item.name} rating={item.rating} />
          );
        })}
      </div>
    </div>
  );
};

export default MainCardScreen;
