import React from "react";
import { GoChevronDown } from "react-icons/go";

const WelcomeCard = (props) => {
  return (
    <>
      <div>
        <p
          style={{
            fontSize: 13,
          }}
          className="text-gray-400"
        >
          Deliver Now
        </p>
        <div className="flex flex-row">
          <p style={{ fontSize: 12 }}>
            7, Adebisi Oyenola Street off oko ogba Lagos, Nigeria
          </p>
          <GoChevronDown size={20} />
        </div>
        <div>
          <h1
            style={{
              fontSize: 20,
              color: "#8E8780",
            }}
            className="font-thin"
          >
            Hello
            <span
              className="font-semibold text-black pl-1"
              style={{
                fontSize: 24,
              }}
            >
              {props.statename},
            </span>
          </h1>
          <h2
            className=""
            style={{
              color: "#8E8780",
            }}
          >
            What are you having today ?
          </h2>
        </div>
      </div>
    </>
  );
};

export default WelcomeCard;
