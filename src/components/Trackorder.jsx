import React from "react";
import BillNavbar from "./BillNavbar";
import profile from "../assets/profile.png";
import { Fab } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Trackorder = () => {
  const mapStyles = {
    height: "400px",
    width: "100%",
  };
  const defaultCenter = {
    lat: 40.7128, // Latitude
    lng: -74.006, // Longitude
  };
  return (
    <div style={{ height: "100vh" }}>
      <BillNavbar title="Payment" />
      <div >
        <LoadScript googleMapsApiKey="AIzaSyDesOie1K0-Ho2y_Aj35-FNI8L2Jk8P-qg">
          <GoogleMap
            mapContainerStyle={mapStyles}
            center={defaultCenter}
            zoom={10}
          >
            <Marker position={defaultCenter} />
          </GoogleMap>
        </LoadScript>
      </div>
      <div className=" m-3 p-3">
        <p style={{ fontSize: 12, color: "#000000" }}>Delivery Time</p>
        <p>10 Minutes</p>
      </div>
      <div className="m-3 p-3">
        <p style={{ fontSize: 12, color: "#000000" }}>Your Address</p>
        <p>11, Samson dada Sr, Ebegda 220143, Lagos, Nigeria </p>
      </div>
      <div
        style={{ backgroundColor: "#FCF6F6" }}
        className="flex items-center justify-between m-3 p-3"
      >
        <div className="flex">
          <div>
            <img style={{ marginRight: 15 }} src={profile} alt="" />
          </div>
          <div>
            <p style={{ fontSize: 14 }}>Joshson Segun</p>
            <p style={{ fontSize: 12 }}>Rider</p>
          </div>
        </div>
        <div>
          <Fab
            sx={{ backgroundColor: "#B10000", color: "white" }}
            aria-label="add"
          >
            <CallIcon />
          </Fab>
        </div>
      </div>
    </div>
  );
};

export default Trackorder;
