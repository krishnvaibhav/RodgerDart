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
          <p>{props.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default MainCards;
