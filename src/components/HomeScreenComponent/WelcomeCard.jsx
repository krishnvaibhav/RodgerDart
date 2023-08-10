import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { auth, db } from "../../firebase";
import { AppContext } from "../../context/appContext";

const WelcomeCard = (props) => {
  const deviceWidth = window.innerWidth;

  const { address, setAddress } = useContext(AppContext);

  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  const loadData = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data().addresses;
      const updatedAddressList = data.map((item) => item.location);
      setAddressList(updatedAddressList);
      setAddress(updatedAddressList ? updatedAddressList[0] : "");
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (event) => {
    setAddress(event.target.value);
  };

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
        <div className="flex flex-row mt-3">
          <div className="mb-3" style={{ width: "100%", borderColor: "red" }}>
            <FormControl fullWidth>
              <InputLabel>Address</InputLabel>
              <Select
                value={address}
                onChange={handleChange}
                placeholder="Select your address"
              >
                {addressList.map((el) => (
                  <MenuItem key={el} value={el}>
                    {el}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
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
