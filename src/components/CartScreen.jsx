import React, { useEffect, useState } from "react";
import TopBar from "./HomeScreenComponent/TopBar";
import Icon from "./HomeScreenComponent/ImagePath.js";
import { RxCrossCircled } from "react-icons/rx";
import { auth, db, rootRef, storage } from "../firebase";
import {
  getDocs,
  collection,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartScreen = (props) => {
  const [cartId, setCartId] = useState([]);
  const cartRef = doc(db, "cart", auth.currentUser.uid);
  const itemRef = collection(db, "item");
  const [savedItems, setSavedItems] = useState([]);
  const [price, setPrice] = useState(null);
  const navigate = useNavigate();

  getDocs(itemRef).then((snapshot) => {
    let user = auth.currentUser.uid;
    snapshot.docs.forEach((doc) => {
      if (doc.id === user) {
        setCartId(doc.data().cart_item_id);
      }
    });
  });

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDoc(cartRef);
      let totalPrice = 0;

      savedItems.forEach((item) => {
        totalPrice += parseFloat(item.price);
      });

      if (snapshot.exists()) {
        setCart(snapshot.data().item_id);
        setPrice(totalPrice);
      }
    };

    fetchData();

    // console.log(cart);
  }, [cartId, savedItems]);

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
        }));
        setSavedItems(data);
      } catch (error) {
        // console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, [cart]);

  useEffect(() => {
    let totalPrice = 0;

    savedItems.forEach((item) => {
      totalPrice += parseFloat(item.price);
    });

    setPrice(totalPrice);
  }, [savedItems]);

  useEffect(() => {
    console.log(savedItems);
  }, [savedItems]);

  return (
    <div>
      <TopBar
        title="Your Cart"
        icon={Icon.BackArrow}
        navigationPath="/"
        cart={Icon.cartIc}
        isBack={true}
      />

      {cart.length === 0 ? (
        <div
          className="flex items-center flex-col pt-36 space-y-20"
          style={{ height: "100vh" }}
        >
          <div
            style={{
              width: "45%",
            }}
          >
            <img src={Icon.EmptyCart} />
          </div>
          <div className="text-center">
            <h1
              className="font-bold"
              style={{
                fontSize: 22,
                color: "#101010",
              }}
            >
              Your Cart is Empty
            </h1>
            <div
              style={{
                color: "#7B7A7A",
              }}
            >
              <p className="text-sm">Add your order to cart before</p>
              <p className="text-sm">proceeding to checkout</p>
            </div>
          </div>
          <div
            className="content-center flex justify-center rounded-md"
            style={{
              width: "80%",
              height: 40,
              backgroundColor: "#B10000",
              color: "#FFFF",
              marginTop: 20,
              fontSize: 14,
            }}
          >
            <button>
              <p>Order now</p>
            </button>
          </div>
        </div>
      ) : (
        <div className="pt-12">
          {savedItems.map((item, key) => (
            <div key={key} className="flex flex-col pl-10">
              <div className="flex space-x-4">
                <img className="w-24" src={Icon.FoodImage} />
                <div
                  className="flex flex-col"
                  style={{
                    width: "50%",
                  }}
                >
                  <h1 className="font-semibold">{item.name}</h1>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#7e7e7e",
                      lineHeight: "18px",
                    }}
                  >
                    {item.description}
                  </p>
                  <h2 className="font-semibold">N{item.price}</h2>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <RxCrossCircled size={16} color="#CD0B17" />
                  </div>
                </div>
              </div>
              <div className="my-2 pr-8">
                <hr />
              </div>
            </div>
          ))}
          <div className="flex flex-col px-8">
            <div>
              <h1 className="text-lg font-semibold">Payment Summary</h1>
            </div>
            <div>
              <h2>Discount Code</h2>
              <div
                className="flex flex-row space-x-2"
                style={{
                  width: "100%",
                  height: "20%",
                  alignItems: "center",
                }}
              >
                <input
                  style={{
                    border: "1px solid #EBEBEB",
                    width: "60%",
                    height: "20%",
                    padding: "10px",
                  }}
                  type="text"
                  placeholder="Enter Voucher"
                />
                <button>
                  <p
                    style={{
                      color: "#B10000",
                      fontSize: "14px",
                    }}
                  >
                    Apply discount
                  </p>
                </button>
              </div>
              <div>
                <div className="flex flex-row justify-between pt-2">
                  <h3 color="#7B7A7A">Subtotal</h3>
                  <h3 color="#636161">N{price}</h3>
                </div>
                <div className="flex flex-row justify-between pt-2">
                  <h3 color="#7B7A7A">Service Fee</h3>
                  <h3 color="#636161">N5000</h3>
                </div>
                <div className="flex flex-row justify-between pt-2">
                  <h3 color="#7B7A7A">Vat</h3>
                  <h3 color="#636161">N200</h3>
                </div>
                <div
                  className="content-center flex justify-center rounded-md"
                  style={{
                    width: "100%",
                    height: 40,
                    backgroundColor: "#B10000",
                    color: "#FFFF",
                    marginTop: 20,
                    fontSize: 14,
                  }}
                >
                  <button
                    onClick={() => {
                      navigate("/checkout");
                    }}
                  >
                    <p>Proceed to Checkout</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
