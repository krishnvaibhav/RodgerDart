import React from "react";
import OfferCard from "./OfferCard";

const OfferScreen = () => {
  return (
    <div className="flex justify-between" style={{ overflowX: "scroll" }}>
      <OfferCard />
      <OfferCard />
    </div>
  );
};

export default OfferScreen;
