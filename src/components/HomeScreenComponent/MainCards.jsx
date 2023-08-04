import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Icon from "./ImagePath";
import { useNavigate } from "react-router-dom";

const MainCards = (props) => {
  const [favItem, setFavItem] = useState(false);
  const [rating, setRating] = useState();
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate("/restCard");
        }}
      >
        <div className="relative">
          <div
            className="rounded-full absolute bg-white p-1 right-0 mr-2 mt-2"
            onClick={() => {
              setFavItem(!favItem);
            }}
          >
            {favItem ? (
              <AiFillHeart
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
          <img src={props.image} width={150} />
        </div>
        <div className="flex flex-col">
          <h2 className=" font-normal text-base ">{props.foodName}</h2>
          <div>
            <img src={Icon.RatingIcon} alt="" />
            <p>{}</p>
          </div>
        </div>
      </button>
    </div>
  );
};

export default MainCards;
