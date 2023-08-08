import React, { useContext, useEffect, useState } from "react";
import BillNavbar from "./BillNavbar";
import tipImg from "../assets/tipimg.png";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/appContext";

const TipScreen = () => {
  const navigate = useNavigate();

  const [selectedTip, setSelectedTip] = useState(null);
  const [customTip, setCustomTip] = useState("");

  const tipOptions = [250, 300, 350, 400];

  const handleTipSelection = (tip) => {
    if (customTip !== "") {
      setCustomTip("");
    }
    setSelectedTip(tip);
  };

  const handleCustomTipChange = (event) => {
    setSelectedTip("");
    setCustomTip(event.target.value);
  };

  const { price, setPrice } = useContext(AppContext);
  const [updatedPrice, setUpdatedPrice] = useState(price);

  useEffect(() => {
    console.log(price);
    setPrice(updatedPrice);
  }, [price, setPrice, updatedPrice]);

  const handleTipSubmit = () => {
    const newPrice = {
      ...price,
      tip: selectedTip || customTip,
    };
    setUpdatedPrice(newPrice);
    setPrice(newPrice);
    navigate("/paymentsuccess");
  };
  return (
    <div>
      <BillNavbar title="Add a Tip" location="checkout" />
      <div
        className="flex flex-col items-center justify-between"
        style={{ height: "70vh" }}
      >
        <div>
          <div>
            <div className="flex flex-col items-center justify-center">
              <img src={tipImg} alt="" style={{ margin: 25 }} />
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  width: 238,
                  textAlign: "center",
                }}
              >
                100% of your tip goes to the delivery person
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start m-4 p-2">
            <p>Select a tip for the rider</p>
            <div>
              {tipOptions.map((tip) => (
                <button
                  key={tip}
                  onClick={() => handleTipSelection(tip)}
                  style={selectedTip === tip ? selectedStyle : buttonStyle}
                >
                  N{tip}
                </button>
              ))}
              <input
                type="number"
                value={customTip}
                onChange={handleCustomTipChange}
                placeholder="Custom Tip"
                style={customInputStyle}
              />
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              handleTipSubmit();
            }}
            className="p-3 text-white w-60 rounded"
            style={{ backgroundColor: "#B10000" }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const buttonStyle = {
  marginRight: "5px",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  cursor: "pointer",
};

const selectedStyle = {
  ...buttonStyle,
  border: "1px solid red",
};

const customInputStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  width: "100px",
};

export default TipScreen;
