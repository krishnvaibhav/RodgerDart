import React from "react";
import { useNavigate } from "react-router-dom";

const BillBottomNav = () => {
  const navigate = useNavigate();
  return (
    <div className="top-40 flex flex-col mb-3 items-center">
      <button
        onClick={() => {
          navigate("/tipscreen");
        }}
        className="bg-color p-3 m-3 w-80 rounded text-white"
      >
        Countinue
      </button>
      <button className="mt-2">Cancel</button>
    </div>
  );
};

export default BillBottomNav;
