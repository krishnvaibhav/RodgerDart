import React, { useContext, useEffect, useState } from "react";
import discountimg from "../assets/discountcode.png";
import { AppContext } from "../context/appContext";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";

const Items = () => {
  const [Items, setItems] = useState([]);
  const [Food, setFood] = useState([]);
  const [Price, SetPrice] = useState({});

  const loadData = async () => {
    const q = query(
      collection(db, "cart"),
      where("uid", "==", auth.currentUser.uid)
    );
    const data = [];
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs);
    querySnapshot.forEach((doc) => {
      data.push(doc.data().items);
    });
    setItems(data);
  };

  const loadFood = async (list) => {
    const items = await Promise.all(
      list[0].map(async (el) => {
        const docRef = doc(db, "item", el.trim());
        const docSnap = await getDoc(docRef);
        return docSnap.data();
      })
    );
    setFood(items);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (Items.length > 0) {
      loadFood(Items);
    }
  }, [Items]);

  useEffect(() => {
    if (Food.length > 0) {
      const totalAmount = Food.reduce(
        (total, item) => total + parseInt(item.price),
        0
      );
      const deliverFee = 1500;
      const serviceFee = 1500;
      const VAT = 1500;
      const discount = 100;
      const finalTotal = totalAmount + deliverFee + serviceFee + VAT - discount;

      setPrice({
        totalAmount,
        deliverFee,
        serviceFee,
        VAT,
        discount,
        finalTotal,
      });
    }
  }, [Food]);

  const totalAmount = Food.reduce(
    (total, item) => total + parseInt(item.price),
    0
  );
  // CHange according to need
  const deliverFee = 1500;
  const serviceFee = 1500;
  const VAT = 1500;
  const discount = 100;
  const finalTotal = totalAmount + deliverFee + serviceFee + VAT - discount;

  console.log(totalAmount);

  const { price, setPrice } = useContext(AppContext);
  useEffect(() => {
    setPrice({
      totalAmount,
      deliverFee,
      serviceFee,
      VAT,
      discount,
      finalTotal,
    });
  }, []);

  return (
    <div>
      <div style={{ margin: 20 }}>
        <div>
          <p style={{ fontSize: 15, fontWeight: 500 }}>Items</p>
        </div>
        {Food.map((el, index) => (
          <div>
            <div key={index} className="mt-2 flex items-center justify-between">
              <div>
                <p style={{ fontSize: 14, fontWeight: 400 }}>{el.name}</p>
                <p style={{ color: "#A4AAAD", fontSize: 10 }}>{el.details}</p>
              </div>
              <div>
                <p style={{ color: "#455A64" }}>
                  {"N" + parseInt(el.price).toLocaleString()}
                </p>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
      <div style={{ margin: 20 }}>
        <div>
          <p style={{ fontSize: 15, fontWeight: 500 }}>Payment Summary</p>
        </div>
        <div style={{ background: "#F5F5F5", borderRadius: "4px" }}>
          <div className="flex items-center justify-between p-2">
            <div className="flex">
              <img src={discountimg} alt="" style={{ marginRight: 10 }} />
              <p style={{ fontSize: 12 }}>Discount Code</p>
            </div>
            <p style={{ fontSize: 12 }}>EMPERROR</p>
          </div>
          <hr />
          <div className="flex items-center justify-between p-2">
            <div>
              <p style={{ fontSize: 12 }}>Sub Toatal ({Food.length} items)</p>
            </div>
            <p style={{ fontSize: 12 }}>{"N" + totalAmount.toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-between p-2">
            <div>
              <p style={{ fontSize: 12 }}>VAT</p>
            </div>
            <p style={{ fontSize: 12 }}>{"N" + VAT.toLocaleString()}</p>
          </div>

          <div className="flex items-center justify-between p-2">
            <div>
              <p style={{ fontSize: 12 }}>Delivery Fee</p>
            </div>
            <p style={{ fontSize: 12 }}>{"N" + deliverFee.toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-between p-2">
            <div>
              <p style={{ fontSize: 12 }}>Service Fee</p>
            </div>
            <p style={{ fontSize: 12 }}>{"N" + serviceFee.toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-between p-2">
            <div>
              <p style={{ fontSize: 12 }}>Discount</p>
            </div>
            <p style={{ fontSize: 12 }}>-{"N" + discount.toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-between p-2 mt-2">
            <div>
              <p style={{ fontSize: 16 }}>Toatal</p>
            </div>
            <p style={{ fontSize: 16 }}>{"N" + finalTotal.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;
