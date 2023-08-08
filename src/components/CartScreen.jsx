import React, { useEffect, useState } from "react";
import TopBar from "./HomeScreenComponent/TopBar";
import Icon from "./HomeScreenComponent/ImagePath.js";
import { RxCrossCircled } from "react-icons/rx";
import { auth, db, rootRef, storage } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { Button } from "@mui/material";

const CartScreen = (props) => {
  const [cartId, setCartId] = useState([]);
  const itemRef = collection(db, "users");
  const cartRef = collection(db, "item");

  getDocs(itemRef).then((snapshot) => {
    let user = auth.currentUser.uid;
    snapshot.docs.forEach((doc) => {
      if (doc.id === user) {
        setCartId(doc.data().cart_item_id);
      }
    });
  });

  const [cart, setCart] = useState({
    items: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        getDocs(cartRef).then((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().name,
            price: doc.data().price,
            numberOf: doc.data().quant,
            description: doc.data().description,
            image: doc.data().img,
          }));
          setCart({ items: data });
        });

        // console.log(data);
      } catch (error) {
        // Handle any potential errors here
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // const imageRef = ref(rootRef, cart.items.image);

    // const imageUrl = getDownloadURL(rootRef.child(cart.items.image));

    // setCart((prev) => ({
    //   ...prev,
    //   imageUrl: imageUrl,
    // }));
    // console.log(cart);
  }, []);

  const handleIncrement = (index) => {
    const updatedCart = { ...cart };
    updatedCart.items[index].numberOf += 1;
    setCart(updatedCart);
  };

  const handleDecrement = (index) => {
    const updatedCart = { ...cart };
    if (updatedCart.items[index].numberOf > 1) {
      updatedCart.items[index].numberOf -= 1;
      setCart(updatedCart);
    }
  };
  // const itemImage = ref(rootRef, cart.items.image);

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
          {cart.items.map((item, key) => (
            <div key={key} className="flex flex-col pt-20 pl-10 space-y-20">
              <div className="flex space-x-4">
                <img className="w-24" src={Icon.FoodImage} />
                <div
                  className="flex flex-col"
                  style={{
                    width: "50%",
                  }}
                >
                  <h1 className="font-semibold">{item.title}</h1>
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
                    <h2 className="text-black">{item.numberOf}</h2>
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
