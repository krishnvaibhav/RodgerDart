import React, { useContext, useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Icon from "../HomeScreenComponent/ImagePath";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import Sheet from "react-modal-sheet";
import { easeIn } from "framer-motion";
import { AppContext } from "../../context/appContext";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";

const MainCards = (props) => {
  const [favItem, setFavItem] = useState(false);
  const [rating, setRating] = useState();
  const [isOpen, setOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [isDfocus, setDFocus] = useState(false);
  const [isFfocus, setFFocus] = useState(false);
  const [popUpval, setPopUpVal] = useState(380);
  const navigate = useNavigate();
  const { item, setItem } = useContext(AppContext);

  function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const cartRef = doc(db, "cart", auth.currentUser?.uid);

  const isOnCart = async () => {
    const data = (await getDoc(cartRef)).data();

    if (data && data.item_id && data.item_id.includes(props.fId)) {
      return null;
    } else {
      return props.fId;
    }
  };

  const addToCart = async () => {
    const itemIdToAdd = await isOnCart();

    if (itemIdToAdd !== null) {
      await updateDoc(
        cartRef,
        { item_id: arrayUnion(itemIdToAdd) },
        { merge: true }
      );
    }
  };

  return (
    <div>
      <div>
        <div className="relative">
          <div
            className="rounded-full absolute bg-white p-1 right-0 mr-2 mt-2"
            onClick={() => {
              setFavItem(!favItem);
            }}
          >
            {favItem ? (
              <AiFillHeart
                style={{
                  transition: "color 0.8s ease",
                }}
                size={20}
              />
            ) : (
              <AiOutlineHeart
                size={20}
                style={{
                  transition: "color 0.8s ease",
                }}
              />
            )}
          </div>
          <img src={props.image} width={150} />
        </div>
        <div className="flex flex-col">
          <h2 className=" font-semibold text-base text-left">
            {capitalizeString(props.foodName)}
          </h2>
          <h2 className=" font-normal text-base text-left">N{props.price}</h2>
          <div
            style={{
              width: "100%",
              height: 40,
              backgroundColor: "#B10000",
              alignSelf: "center",
              borderRadius: 5,
            }}
          >
            <button
              className="space-x-2"
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => setOpen(true)}
            >
              <img
                src={Icon.ShoppingCart}
                style={{
                  padding: 0,
                }}
              />
              <h2 className="font-semibold text-white">Add to Cart</h2>
            </button>
          </div>
        </div>
      </div>
      <Sheet
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        snapPoints={[popUpval, 380]}
        tweenConfig={{
          ease: easeIn,
          duration: 0.5,
        }}
      >
        <Sheet.Container>
          <Sheet.Header className="p-2">
            <div className="flex justify-end">
              <MdClose
                size={25}
                color="#43495C"
                onClick={() => setOpen(false)}
              />
            </div>
          </Sheet.Header>
          <Sheet.Content>
            <div className="p-4 pt-1">
              <div className="flex justify-center mb-8">
                <img src={props.image} alt="ItemImg" />
              </div>
              <div className="mx-5">
                <h1 className="font-semibold" style={{ fontSize: 18 }}>
                  {props.foodName}
                </h1>
                <h2 style={{ fontSize: 14 }}>N{props.price}</h2>
              </div>
              <hr />
              <div className="mx-5 mt-5 flex space-x-10">
                <div
                  className="flex flex-row space-x-4"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div
                    className="w-8 h-8 rounded-md flex justify-center items-center"
                    style={{
                      border: isDfocus
                        ? "1px solid #B10000"
                        : "1px solid #6b6f7b",
                    }}
                  >
                    <button
                      onClick={() => {
                        setDFocus(true);
                        setCount((prev) => prev - 1);
                        setTimeout(() => {
                          setDFocus(false);
                        }, [300]);
                      }}
                    >
                      <h1
                        className="pb-1"
                        style={{
                          fontSize: 30,
                          color: "#6b6f7b",
                        }}
                      >
                        -
                      </h1>
                    </button>
                  </div>
                  <h1 className="font-semibold">{count}</h1>
                  <div
                    className="w-8 h-8 rounded-md flex justify-center items-center"
                    style={{
                      border: isFfocus
                        ? "1px solid #B10000"
                        : "1px solid #6b6f7b",
                    }}
                  >
                    <button
                      onClick={() => {
                        setFFocus(true);
                        setCount((prev) => prev + 1);
                        setTimeout(() => {
                          setFFocus(false);
                        }, [300]);
                      }}
                    >
                      <h1
                        className="pb-1"
                        style={{
                          fontSize: 30,
                          color: "#6b6f7b",
                        }}
                      >
                        +
                      </h1>
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    width: "50%",
                    height: 40,
                    backgroundColor: "#B10000",
                    alignSelf: "center",
                    borderRadius: 5,
                  }}
                >
                  {/* CART LOGIC */}
                  <button
                    onClick={() => {
                      addToCart();
                    }}
                    className="space-x-2"
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={Icon.ShoppingCart}
                      style={{
                        padding: 0,
                      }}
                    />
                    <h2 className=" font-normal text-white">Add to Cart</h2>
                  </button>
                </div>
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop onTap={() => setOpen(false)} />
      </Sheet>
    </div>
  );
};

export default MainCards;
