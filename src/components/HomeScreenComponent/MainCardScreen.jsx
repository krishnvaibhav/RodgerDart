import React from "react";
import MainCards from "./MainCards";
import Icons from "./ImagePath";

const MainCardScreen = (props) => {
  return (
    <div>
      <div>
        <h1 className="font-semibold text-black text-lg">{props.title}</h1>
      </div>
      <div className="flex space-x-2">
        <MainCards
          fav={props.fav}
          image={Icons.MegaChicken}
          foodName="MegaChicken"
        />
        <MainCards
          fav={props.fav}
          image={Icons.ChickenRepublic}
          foodName="Chicken Republic"
        />
      </div>
    </div>
  );
};

export default MainCardScreen;
