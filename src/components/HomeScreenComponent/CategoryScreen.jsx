import React from "react";
import CategoryCard from "./CategoryCard";
import Icon from "./ImagePath";

const CategoryScreen = (props) => {
  return (
    <div>
      <div>
        <h1
          className="font-semibold"
          style={{
            fontSize: "16px",
          }}
        >
          Categories
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          overflowX: "scroll",
          whiteSpace: "nowrap",
        }}
      >
        <CategoryCard imageSrc={Icon.Eats} />
        <CategoryCard imageSrc={Icon.Gift} />
        <CategoryCard imageSrc={Icon.Pharmacy} />
        <CategoryCard imageSrc={Icon.Grocery} />
        <CategoryCard imageSrc={Icon.Pastries} />
      </div>
    </div>
  );
};

export default CategoryScreen;
