import { Box, Input, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import Modal from "@mui/material/Modal";
import "react-credit-cards-2/dist/es/styles-compiled.css";

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

const PaymentForm = () => {
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [focus, setFocus] = useState("");
  const [name, setName] = useState("pranoy peter lund");
  const [number, setNumber] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputFocus = (e) => {
    setFocus(e.target.name);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "cvc":
        setCvc(value);
        break;
      case "expiry":
        setExpiry(value);
        break;
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      default:
        break;
    }
  };

  return (
    <div id="PaymentForm">
      <Cards
        cvc={cvc}
        expiry={expiry}
        focused={focus}
        name={name}
        number={number}
      />
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
            />
            <TextField
              className=""
              id="standard-basic"
              label="CVV"
              variant="standard"
              fullWidth
              margin="dense"
            />
            <TextField
              className=""
              id="standard-basic"
              label="Expiry Date"
              variant="standard"
              fullWidth
              margin="dense"
            />
            <TextField
              className=""
              id="standard-basic"
              label="Name On The Card"
              variant="standard"
              fullWidth
              margin="dense"
            />
            <button className="p-3 mt-5 text-white" style={{backgroundColor:"#B10000",width:"100%",borderRadius:5}}>SAVE</button>
          </Box>
        </Modal>
      </div>
      <button
        onClick={handleOpen}
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
