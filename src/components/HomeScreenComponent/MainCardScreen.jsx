import React, { useEffect, useState } from "react";
import MainCards from "./MainCards";
import Icons from "./ImagePath";

const MainCardScreen = (props) => {
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
        {items.map((el) => (
          <MainCards fav={el.fav} image={el.image} foodName={el.foodName} />
        ))}
      </div>
    </div>
  );
};

export default MainCardScreen;
