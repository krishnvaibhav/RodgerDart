import React, { useEffect, useState } from "react";
import BillNavbar from "./BillNavbar";
import addressimg from "../assets/address.png";
import "../styles/style.css";
import deleteimg from "../assets/trash.png";
import editimg from "../assets/editimg.png";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Navigate, useNavigate } from "react-router-dom";

const AddressScreen = () => {
  const [addressList, setAddressList] = useState([]); // Change initial state to an empty array
  const navigate = useNavigate();

  const loadAddress = async () => {
    const userDoc = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setAddressList(docSnap.data().addresses);
    } else {
      setAddressList([]); // Set to empty array if document doesn't exist
      console.log("No such document!");
    }
  };

  useEffect(() => {
    loadAddress();
  }, []);

  const handleDelete = async (location) => {
    const addressRef = doc(db, "users", auth.currentUser.uid);

    console.log(location);

    // Atomically remove a region from the "regions" array field.
    await updateDoc(addressRef, {
      addresses: arrayRemove({
        name: location.name,
        location: location.location,
        email: location.email,
        phone: location.phone,
        state: location.state,
        local: location.local,
      }),
    });
  };

  return (
    <div
      className={`flex flex-col items-center ${
        typeof addressList === "undefined" ? "justify-between" : ""
      }`}
      style={{}}
    >
      <BillNavbar title="Address" isBack={true} />
      {addressList.length > 0 &&
        addressList.map((el) => {
          return (
            <React.Fragment key={el.location}>
              <div
                className="flex items-center justify-between m-2 p-4"
                style={{ width: "100%" }}
              >
                <div className="">
                  <p style={{ fontSize: 16, fontWeight: 400 }}>{el.name}</p>
                  <p
                    style={{ color: "#7E7E7E", fontSize: 16, fontWeight: 400 }}
                  >
                    {el.location}
                  </p>
                </div>
                <div className="flex items-center p-3">
                  <img src={editimg} alt="" className="mr-2" />
                  <img
                    onClick={() => {
                      const filteredData = addressList.filter(
                        (obj) => obj.location !== el.location
                      );
                      setAddressList(filteredData);
                      handleDelete(el);
                    }}
                    src={deleteimg}
                    alt=""
                    className=""
                  />
                </div>
              </div>
              <hr />
            </React.Fragment>
          );
        })}
      {typeof addressList === "undefined" && (
        <div className="flex flex-col items-center justify-center">
          <img src={addressimg} alt="" />
          <p style={{ fontSize: 20, fontWeight: 600, color: "#7E7E7E" }}>
            You have not added any address
          </p>
        </div>
      )}
      <div>
        <button
          onClick={() => {
            navigate("/addAddress");
          }}
          className="p-3 text-white w-60 rounded"
          style={{ backgroundColor: "#B10000" }}
        >
          Add Address
        </button>
      </div>
    </div>
  );
};

export default AddressScreen;
