import React from "react";
import BillNavbar from "./BillNavbar";
import profile from "../assets/profile.png";
import { Fab } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import GoogleMapReact from "google-map-react";
import { Marker } from "@react-google-maps/api";
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Trackorder = () => {
  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const defaultProps = {
    center: {
      lat: 28.6832252,
      lng: 77.409954,
    },
    zoom: 16,
  };
  return (
    <div style={{ height: "100vh" }}>
      <BillNavbar title="Payment" location="homescreen" />
      <div style={mapStyles}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "",
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <Marker />
        </GoogleMapReact>
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
