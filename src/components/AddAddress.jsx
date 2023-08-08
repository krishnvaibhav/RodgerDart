import React, { useState } from "react";
import BillNavbar from "./BillNavbar";
import { Autocomplete, TextField } from "@mui/material";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
const AddAddress = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const data = await updateDoc(docRef, {
      addresses: arrayUnion({
        name: Firstname + " " + LastName,
        location: selectedAddress,
        email: email,
        phone: phone,
        state: state,
        local: local,
      }),
    });

    navigate("/homescreen");
  };
  const [inputAddress, setInputAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [Firstname, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [local, setLocal] = useState("");

  const handlePlaceChange = (address) => {
    setInputAddress(address);
  };

  const handlePlaceSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      console.log("Selected place:", {
        address,
        location: latLng,
      });
      setSelectedAddress(address);
      setInputAddress(address);
    } catch (error) {
      console.error("Error selecting place:", error);
    }
  };

  return (
    <div>
      <BillNavbar title="Address" location="checkout" />
      <div className="m-3 p-3">
        <div className="m-3">
          <p style={{ fontSize: 16, fontWeight: 500, color: "#3C3E3E" }}>
            First Name
          </p>
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="Enter First Name"
            variant="outlined"
            value={Firstname}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div className="m-3">
          <p style={{ fontSize: 16, fontWeight: 500, color: "#3C3E3E" }}>
            Last Name
          </p>
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="Enter Last Name"
            variant="outlined"
            value={LastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div className="m-3">
          <p style={{ fontSize: 16, fontWeight: 500, color: "#3C3E3E" }}>
            Email
          </p>
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="Enter Email"
            variant="outlined"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="m-3">
          <p style={{ fontSize: 16, fontWeight: 500, color: "#3C3E3E" }}>
            Phone
          </p>
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="Enter Phone Number"
            variant="outlined"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>
        <div className="m-3">
          <p style={{ fontSize: 16, fontWeight: 500, color: "#3C3E3E" }}>
            State
          </p>
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="Enter State"
            variant="outlined"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
            }}
          />
        </div>
        <div className="m-3">
          <p style={{ fontSize: 16, fontWeight: 500, color: "#3C3E3E" }}>
            Local Area
          </p>
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="Enter Local Area"
            variant="outlined"
            value={local}
            onChange={(e) => {
              setLocal(e.target.value);
            }}
          />
        </div>
        <div className="m-3">
          <p style={{ fontSize: 16, fontWeight: 500, color: "#3C3E3E" }}>
            Address
          </p>
          <div>
            <PlacesAutocomplete
              key={"AIzaSyDesOie1K0-Ho2y_Aj35-FNI8L2Jk8P-qg"}
              value={inputAddress}
              onChange={handlePlaceChange}
              onSelect={handlePlaceSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    placeholder="Enter Address"
                    variant="outlined"
                    {...getInputProps({})}
                  />
                  <div>
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion.placeId}
                        {...getSuggestionItemProps(suggestion, {
                          className:
                            "places-autocomplete-suggestion flex items-center justify-start",
                        })}
                      >
                        <LocationOnIcon className="m-3" />
                        {suggestion.description}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={() => {
            console.log(selectedAddress);
            handleClick();
          }}
          className="p-3 m-3 text-white rounded"
          style={{ backgroundColor: "#B10000", width: "83%" }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddAddress;
