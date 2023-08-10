import React, { useEffect, useState } from "react";
import BillNavbar from "./BillNavbar";
import addressimg from "../assets/address.png";
import "../styles/style.css";
import deleteimg from "../assets/trash.png";
import editimg from "../assets/editimg.png";
import CustomCards from "./CustomCards";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { Icon } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import CryptoJS from "crypto-js";

const MyCards = () => {
  const navigate = useNavigate();

  const [cardList, setCardList] = useState([]);
  const loadCards = async () => {
    const userDoc = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      setCardList(docSnap.data().cards);
    } else {
      setCardList([]);
      console.log("No such document!");
    }
  };

  useEffect(() => {
    loadCards();
    // const decryptedBytes = CryptoJS.AES.decrypt("el", "secret_key");
    // const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    // console.log(decryptedText);
  }, []);

  return (
    <div
      className={`flex flex-col items-center ${
        cardList.length === 0 ? "justify-between" : ""
      }`}
    >
      <BillNavbar title="Cards" isBack={true} />
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
                    cvc={el.CVV}
                    expiry={el.expiry}
                    name={el.name}
                    number="**** **** **** ****"
                    issuer="SBI"
                    preview={true}
                  />
                  <img
                    src={deleteimg}
                    alt=""
                    className="m-3"
                    style={{ height: 25, width: 25 }}
                  />
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
        <div
          style={{ width: "100%" }}
          className="flex items-center justify-center"
        >
          <button
            className="flex items-center justify-center p-3 m-4 text-white rounded"
            onClick={() => {
              navigate("/addcard");
            }}
            style={{
              borderColor: "#B10000",
              borderWidth: 2,
              color: "#B10000",
              width: "83%",
            }}
          >
            <AddIcon />
            <p className="ml-2">Add Card</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCards;
