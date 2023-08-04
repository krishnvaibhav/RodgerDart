import React from "react";
import style from "./CategoryCard.module.css";

const CategoryCard = (props) => {
  const cardWidth = props.width;
  return (
    <div
      style={{
        margin: 20,
        height: "100%",
        width: "100%",
      }}
      // className={[style.innerContainer, "h-24 bg-red-200"]}
    >
      <img src={props.imageSrc} style={{ width: 50, height: 50 }} />
      <p>hello</p>
    </div>
  );
};

export default CategoryCard;
