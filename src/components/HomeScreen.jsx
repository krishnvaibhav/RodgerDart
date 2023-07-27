import React, { Image } from "react";

import bagImg from "../assets/bag-2.png";

import { HiOutlineBars4 } from "react-icons/hi2";
import { BsFillHandbagFill } from "react-icons/bs";

const HomeScreen = () => {
  return (
    <div className="p-4 pb-1 bg-red-400">
      <div className="flex flex-row">
        <HiOutlineBars4 size={25} />
        {/* <img src={bagImg} style={{ width: 25 }} /> */}
        <BsFillHandbagFill size={25} className="flex-1" />
      </div>
    </div>
  );
};

export default HomeScreen;
