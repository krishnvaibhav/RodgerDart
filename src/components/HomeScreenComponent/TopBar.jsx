import React, { useEffect, useState } from "react";
import menuCard from "../../assets/textalign-left.png";
import shoppingCart from "../../assets/bag-2.png";
import { useNavigate } from "react-router-dom";
import { Drawer } from "@mui/material";
import profileimg from "../../assets/user.png";
import helpimg from "../../assets/message-text.png";
import addressimg from "../../assets/location.png";
import cardimg from "../../assets/Credit_Card.png";
import favimg from "../../assets/heart.png";
import inviteimg from "../../assets/mdi_invite.png";
import privacyimg from "../../assets/dashicons_privacy.png";
import aboutimg from "../../assets/info.png";
import promotionsimg from "../../assets/Vector (1).png";
import logoutimg from "../../assets/login.png";
import { auth } from "../../firebase";

const TopBar = (props) => {
  const device_width = window.innerWidth;
  const device_height = window.innerHeight;
  const [openSide, setOpenSide] = useState(false);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(props.title);
  });

  return (
    <div
      className="flex flex-row justify-between items-center"
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        display: "flex",
        padding: "8px 12px",
        backgroundColor: "#ffffff",
      }}
    >
      <Drawer
        anchor={"left"}
        open={openSide}
        onClose={() => {
          setOpenSide(false);
        }}
      >
        <div
          style={{
            height: device_height > 820 ? device_height : "",
            width: (device_width * 65) / 100,
            backgroundColor: "#B10000",
          }}
          className="p-4 flex flex-col items-start"
        >
          <div className="m-3">
            <h3 style={{ color: "#F5F5F5", fontSize: 28, fontWeight: 600 }}>
              MENU
            </h3>
          </div>
          <div
            onClick={() => {
              navigate("/myprofile");
            }}
            className="m-3  flex items-center justify-between"
          >
            <img className="m-3" src={profileimg} alt="" />
            <p style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 400 }}>
              My Profile
            </p>
          </div>
          <div className="m-3  flex items-center justify-between">
            <img className="m-3" src={helpimg} alt="" />
            <p style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 400 }}>
              Help
            </p>
          </div>
          <div
            onClick={() => {
              navigate("/addressscreen");
            }}
            className="m-3  flex items-center justify-between"
          >
            <img className="m-3" src={addressimg} alt="" />
            <p style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 400 }}>
              Address
            </p>
          </div>
          <div
            onClick={() => {
              navigate("/mycards");
            }}
            className="m-3  flex items-center justify-between"
          >
            <img className="m-3" src={cardimg} alt="" />
            <p style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 400 }}>
              Card Details
            </p>
          </div>
          <div className="m-3  flex items-center justify-between">
            <img className="m-3" src={favimg} alt="" />
            <p style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 400 }}>
              Favorites
            </p>
          </div>
          <div className="m-3  flex items-center justify-between">
            <img className="m-3" src={inviteimg} alt="" />
            <p style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 400 }}>
              Invite Friends
            </p>
          </div>
          <div className="m-3  flex items-center justify-between">
            <img className="m-3" src={privacyimg} alt="" />
            <p style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 400 }}>
              Privacy
            </p>
          </div>
          <div className="m-3  flex items-center justify-between">
            <img className="m-3" src={aboutimg} alt="" />
            <p style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 400 }}>
              About
            </p>
          </div>
          <div className="m-3  flex items-center justify-between">
            <img className="m-3" src={promotionsimg} alt="" />
            <p style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 400 }}>
              Promotions
            </p>
          </div>
          <div
            onClick={() => {
              const agree = window.confirm("Do you want to continue");
              if (agree) {
                navigate("/createaccount");
                auth.signOut(auth.currentUser);
              }
            }}
            className="m-3  flex items-center justify-between"
          >
            <img className="m-3" src={logoutimg} alt="" />
            <p style={{ color: "#FFFFFF", fontSize: 24, fontWeight: 400 }}>
              Log Out
            </p>
          </div>
        </div>
      </Drawer>
      <div className="rounded-full w-8 h-8 flex items-center justify-center">
        <button
          onClick={() => {
            setOpenSide(true);
            console.log("log");
          }}
        >
          <img src={props.icon} alt="menu" />
        </button>
      </div>
      <h1 className="font-semibold" style={{ textAlign: "center", flex: 1 }}>
        {title}
      </h1>
      {props.cart ? (
        <div className="rounded-full w-8 h-8 flex items-center justify-center">
          <button
            onClick={() => {
              navigate("/cartscreen");
            }}
          >
            <img src={props.cart} alt="cart" />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default TopBar;
