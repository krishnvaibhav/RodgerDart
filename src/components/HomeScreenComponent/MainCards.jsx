import React, { useContext, useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Icon from "./ImagePath";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/stateProvider";
import { AppContext } from "../../context/appContext";

const MainCards = (props) => {
  const [favItem, setFavItem] = useState(false);
  const [rating, setRating] = useState();
  const navigate = useNavigate();
  const [{}, dispatch] = useStateValue();
  const { setItem, item } = useContext(AppContext);
  const [cTitle, setCtitle] = useState(capitalizeString(props.foodName));
  const [itemID, setItemID] = useState(props.ids);

  const HandleCardClick = async () => {
    try {
      navigate(`/restCard/${itemID}/${cTitle}`);
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

  function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

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
          <img
            src={Icon.MegaChicken}
            style={{ width: 150, height: 100 }}
            alt=""
          />
        </button>
      </div>
      <div className="flex flex-col">
        <h2 className=" font-semibold text-base ">{cTitle}</h2>
        <div className="flex flex-row space-x-2">
          <img src={Icon.RatingIcon} alt="" />
          <p className="text-sm font-thin">{props.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default MainCards;
