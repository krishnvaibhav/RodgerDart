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
import { ref, getDownloadURL } from "firebase/storage";
import { Button } from "@mui/material";

const CartScreen = (props) => {
  const [cartId, setCartId] = useState([]);
  const cartRef = doc(db, "cart", auth.currentUser.uid);
  const itemRef = collection(db, "item");
  const [savedItems, setSavedItems] = useState([]);

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
      const snapshot = await getDocs(cartRef);
      snapshot.docs.forEach((items) => {
        console.log(items.data());
      });
    };

    fetchData();

    console.log(cart);
  }, [cartId]);

  const handleIncrement = (index) => {
    const updatedCartItems = [...cart.items];
    updatedCartItems[index].numberOf += 1;

    // Update the quantity in Firestore
    const itemDocRef = doc(
      db,
      "users",
      auth.currentUser.uid,
      "cart",
      cartId[index]
    );
    updateDoc(itemDocRef, { quantity: updatedCartItems[index].numberOf });

    setCart({ items: updatedCartItems });
  };

  const handleDecrement = (index) => {
    if (cart.items[index].numberOf > 1) {
      const updatedCartItems = [...cart.items];
      updatedCartItems[index].numberOf -= 1;

      const itemDocRef = doc(
        db,
        "users",
        auth.currentUser.uid,
        "cart",
        cartId[index]
      );
      updateDoc(itemDocRef, { quantity: updatedCartItems[index].numberOf });

      setCart({ items: updatedCartItems });
    }
  };

  useEffect(() => {
    const fetchSavedItems = async () => {
      try {
        const itemsCollection = collection(db, "item");

        // Read all documents in the "items" collection using getDocs
        const querySnapshot = await getDocs(itemsCollection);

        const savedItemsData = [];

        querySnapshot.forEach((itemDoc) => {
          cart.forEach((userCart) => {
            userCart.cartItem.forEach((cartItem) => {
              console.log();
              console.log(itemDoc.id);
              if (itemDoc.id === cartItem.id) {
                savedItemsData.push({
                  itemId: 0,
                  name: itemDoc.data().name,
                  descricption: itemDoc.data().descricption,
                  price: itemDoc.data().price,
                  quant: itemDoc.data().quant,
                  rating: itemDoc.data().rating,
                  type: itemDoc.data().type,
                  vid: itemDoc.data().vid,
                  // Add other item details you want to save
                });
              }
            });
          });
        });

        setSavedItems(savedItemsData);
        console.log(savedItemsData);
      } catch (error) {
        console.error("Error fetching saved items:", error);
      }
    };

    fetchSavedItems();

    console.log(savedItems);
  }, [cart]);

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
        <div>
          {savedItems.map((item, key) => (
            <div key={key} className="flex flex-col pt-20 pl-10 space-y-20">
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
                <div className="flex flex-col space-y-10">
                  <div className="flex items-center">
                    <RxCrossCircled size={16} color="#CD0B17" />
                  </div>
                  <div
                    className="flex space-x-5"
                    style={{
                      backgroundColor: "#F3CCCC",
                      borderRadius: 3,
                    }}
                  >
                    <div style={{ backgroundColor: "#FDF8F8" }}>
                      <button onClick={() => handleDecrement(key)}>-</button>
                    </div>
                    <h2 className="text-black">{item.quant}</h2>
                    <div style={{ backgroundColor: "#FDF8F8" }}>
                      <button onClick={() => handleIncrement(key)}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Button
            onClick={() => {
              console.log(cart);
            }}
          >
            click
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
