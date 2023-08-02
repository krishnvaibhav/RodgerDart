import React from "react";
import BillNavbar from "./BillNavbar";
import addressimg from "../assets/address.png";
import "../styles/style.css";
import deleteimg from "../assets/trash.png";
import editimg from "../assets/editimg.png";
import CustomCards from "./CustomCards";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const MyCards = () => {
  const cardList = [
    {
      name: "vaibhav",
      cvv: "456",
      cardnumber: "1234567890126567",
      expiry: "12/24",
    },
    {
      name: "vaibhav",
      cvv: "456",
      cardnumber: "1234567890126567",
      expiry: "12/24",
    },
    {
      name: "vaibhav",
      cvv: "456",
      cardnumber: "1234567890126567",
      expiry: "12/24",
    },
  ];

  return (
    <div
      className={`flex flex-col items-center ${
        cardList.length === 0 ? "justify-between" : ""
      }`}
    >
      <BillNavbar title="Cards" />
      <div
        className="flex flex-col items-center justify-between"
        style={{ height: "80vh" }}
      >
        <div>
          {cardList.length > 0 &&
            cardList.map((el) => {
              return (
                <div className="flex m-3 p-3 items-center justify-center">
                  <Cards
                    cvc={el.cvv}
                    expiry={el.expiry}
                    name={el.name}
                    number={el.cardnumber}
                  />
                  <img src={deleteimg} alt="" className="m-3" style={{height:25,width:25}} />
                </div>
              );
            })}
          {cardList.length === 0 && (
            <div className="flex flex-col items-center justify-center">
              <p style={{ fontSize: 20, fontWeight: 600, color: "#7E7E7E" }}>
                You Have not added any cards
              </p>
            </div>
          )}
        </div>
        <div>
          <button
            className=" m-3 p-3 text-white w-60 rounded"
            style={{ backgroundColor: "#B10000" }}
          >
            Add Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCards;
