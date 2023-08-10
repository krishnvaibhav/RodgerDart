import React, { useContext, useEffect, useState } from "react";
import BillNavbar from "./BillNavbar";
import tipImg from "../assets/tipimg.png";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/appContext";
import { usePaystackPayment } from "react-paystack";
import { useStateValue } from "../context/stateProvider";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const TipScreen = () => {
  const [email, setEmail] = useState("");
  const loadData = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const data = docSnap.data();
      setEmail(data.email);
    } else {
      console.log("No such document!");
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  const { price } = useContext(AppContext);

  const [selectedTip, setSelectedTip] = useState(null);
  const [customTip, setCustomTip] = useState("");

  const amount = price.finalTotal;
  const finalSTip = isNaN(parseInt(customTip)) ? 0 : parseFloat(customTip);
  const finalCTip = selectedTip;

  const final =
    amount * 100 + (finalCTip === "" ? finalSTip * 100 : finalCTip * 100);

  console.log(final);

  const config = {
    email: email,
    amount: final,
    publicKey: "pk_test_f44835512bf5938d1b140f16fccad5647fe56d19",
  };

  const onSuccess = (reference) => {
    if (reference.status === "success") {
      navigate("/paymentsuccess");
    }
  };

  const onClose = () => {
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);

  const navigate = useNavigate();

  const tipOptions = [250, 300, 350, 400];

  const handleTipSelection = (tip) => {
    if (customTip !== "") {
      setCustomTip("");
    }
    setSelectedTip(parseFloat(tip));
  };

  const handleCustomTipChange = (event) => {
    setSelectedTip("");
    setCustomTip(event.target.value);
  };

  const [paymentUrl, setPaymentUrl] = useState("");

  const paynow = async () => {
    initializePayment(onSuccess, onClose);
  };

  const handleTipSubmit = () => {
    paynow();
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
