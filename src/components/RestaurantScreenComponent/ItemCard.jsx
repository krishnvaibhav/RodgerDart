import React, { useContext, useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Icon from "../HomeScreenComponent/ImagePath";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import Sheet from "react-modal-sheet";
import { easeIn } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { AppContext } from "../../context/appContext";

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

  const [cardItem, setCardItem] = useState();
  const [cardVendor, setCardVendor] = useState();

  const itemRef = collection(db, "item");
  const cardRef = collection(db, "vendor");

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const snapshot = await getDocs(cardRef);
        const data = snapshot.docs.map((doc) => ({
          vid: doc.id,
          name: doc.data().name,
          category: doc.data().category,
          rating: doc.data().rating,
        }));
        setCardVendor(data);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchVendorData();
  }, []);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const snapshot = await getDocs(itemRef);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          price: doc.data().price,
          quant: doc.data().quant,
          type: doc.data().type,
          rating: doc.data().rating,
          vid: doc.data().vid,
          vendor_name:
            cardVendor.find((vendor) => vendor.vid === doc.data().vid)?.name ||
            "Anonymous",
        }));
        setCardItem(data);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          navigate("/restCard");
        }}
      >
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
          <h2 className=" font-semibold text-base ">{props.foodName}</h2>
          <h2 className=" font-normal text-base ">N{props.price}</h2>
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
      </button>
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
                      setPopUpVal(800);
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
