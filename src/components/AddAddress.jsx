import React, { useState } from "react";
import BillNavbar from "./BillNavbar";
import { Autocomplete, TextField } from "@mui/material";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const AddAddress = () => {
  const [inputAddress, setInputAddress] = useState(""); // Separate state for the input field
  const [selectedAddress, setSelectedAddress] = useState("");

  const handlePlaceChange = (address) => {
    setInputAddress(address); // Update the input address state
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
