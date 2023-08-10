import { Box, Input, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Cards from "react-credit-cards-2";
import Modal from "@mui/material/Modal";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import CryptoJS from "crypto-js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #B10000;",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

const PaymentForm = (props) => {
  const { list } = props;

  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [focus, setFocus] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputFocus = (e) => {
    setFocus(e.target.name);
  };

  const [selectedCard, setSelectedCard] = useState("");

  const handleCardChange = (cardName) => {
    setSelectedCard(cardName);
  };

  const [cardsList, setCardsList] = useState(list);

  const handleClick = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const encryptedNuber = CryptoJS.AES.encrypt(
      number,
      "secret_key"
    ).toString();
    const encryptedCVV = CryptoJS.AES.encrypt(cvv, "secret_key").toString();
    const newCard = {
      name: name,
      CardNumber: encryptedNuber,
      CVV: encryptedCVV,
      expiry: expiry,
    };

    setCardsList([...cardsList, newCard]);
    const data = await updateDoc(docRef, {
      cards: arrayUnion(newCard),
    });
    setOpen(false);
  };

  useEffect(() => {
    console.log(selectedCard);
  }, [selectedCard]);

  return (
    <div id="PaymentForm">
      {list.map((el, index) => (
        <label key={index}>
          <input
            type="radio"
            value={el.CardNumber}
            checked={selectedCard === el.CardNumber}
            onChange={() => handleCardChange(el.CardNumber)}
          />
          <Cards
            cvc={"***"}
            expiry={el.expiry}
            focused={focus}
            name={el.name}
            number={"**** **** **** ****"}
          />
        </label>
      ))}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h2 className="mb-3" style={{ textAlign: "center" }}>
              Add New Card
            </h2>
            <TextField
              className=""
              id="standard-basic"
              label="Card Number"
              variant="standard"
              fullWidth
              margin="dense"
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
            <TextField
              className=""
              id="standard-basic"
              label="CVV"
              variant="standard"
              fullWidth
              margin="dense"
              value={cvv}
              onChange={(e) => {
                setCvv(e.target.value);
              }}
            />
            <TextField
              className=""
              id="standard-basic"
              label="Expiry Date"
              variant="standard"
              fullWidth
              margin="dense"
              value={expiry}
              onChange={(e) => {
                setExpiry(e.target.value);
              }}
            />
            <TextField
              className=""
              id="standard-basic"
              label="Name On The Card"
              variant="standard"
              fullWidth
              margin="dense"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <button
              onClick={handleClick}
              className="p-3 mt-5 text-white"
              style={{
                backgroundColor: "#B10000",
                width: "100%",
                borderRadius: 5,
              }}
            >
              SAVE
            </button>
          </Box>
        </Modal>
      </div>
      <button
        onClick={() => {
          handleOpen();
        }}
        className="p-2 mt-4"
        style={{
          borderColor: "red",
          borderWidth: 1,
          borderRadius: 8,
          width: "100%",
        }}
      >
        Add New Card
      </button>
    </div>
  );
};

export default PaymentForm;
