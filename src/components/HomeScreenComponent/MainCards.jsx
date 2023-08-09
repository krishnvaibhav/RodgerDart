import React, { useContext, useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Icon from "./ImagePath";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/stateProvider";
import { AppContext } from "../../context/appContext";
import { collection, getDocs } from "firebase/firestore";
import { ref } from "firebase/storage";
import { db } from "../../firebase";

const MainCards = (props) => {
  const [favItem, setFavItem] = useState(false);
  const [rating, setRating] = useState();
  const navigate = useNavigate();
  const [{}, dispatch] = useStateValue();
  const { setItem, item } = useContext(AppContext);
  const [cardVendor, setCardVendor] = useState([]);
  const [cardItem, setCardItem] = useState([]);

  const cardRef = collection(db, "vendor");
  const itemRef = collection(db, "item");

  const fetchVendorData = async () => {
    try {
      getDocs(cardRef).then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          category: doc.data().category,
        }));
        setCardVendor({ vendor: data });
      });

      // console.log(data);
    } catch (error) {
      // Handle any potential errors here
      console.error("Error fetching data:", error);
    }
    console.log(cardVendor.vendor);
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
          vid: doc.data().vid,
        }));
        setCardItem({ items: data });
      });
    } catch (error) {
      // Handle any potential errors here
      console.error("Error fetching data:", error);
    }
  };

  fetchItemData();

  console.log(cardItem.items);
  const HandleCardClick = async () => {
    try {
      console.log(item);
      navigate("/restCard");
    } catch (err) {
      console.log("error in handle card click");
    }
  };

  const performNotification = () => {
    props.fav(true);

    setTimeout(() => {
      props.fav(false);
    }, 2000);
  };
  return (
    <div className="mr-4">
      <div className="relative">
        <div
          className="rounded-full absolute bg-white p-1 right-0 "
          onClick={() => {
            setFavItem(!favItem);
            performNotification();
          }}
        >
          {favItem ? (
            <AiFillHeart
              color="#E43225"
              style={{
                transition: "color 0.8s ease",
              }}
              size={20}
            />
          ) : (
            <AiOutlineHeart
              size={20}
              style={{
                transition: "color 0.8s ease",
              }}
            />
          )}
        </div>
        <button onClick={HandleCardClick}>
          <img src={props.image} style={{ width: 150, height: 100 }} alt="" />
        </button>
      </div>
      <div className="flex flex-col">
        <h2 className=" font-normal text-base ">{props.foodName}</h2>
        <div>
          <img src={Icon.RatingIcon} alt="" />
        </div>
      </div>
    </div>
  );
};

export default MainCards;
