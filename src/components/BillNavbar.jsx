import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const BillNavbar = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center justify-center m-3 p-2">
        <AiOutlineArrowLeft
          onClick={() => {
            navigate(`/${props.location}`);
          }}
          style={{ width: 24, height: 24 }}
          className="absolute left-0 ml-8"
        />
        <h1 className="text-2xl m-2 p-2">{props.title}</h1>
      </div>
    </div>
  );
};

export default BillNavbar;
