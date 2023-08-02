import React from "react";
import discountimg from "../assets/discountcode.png";

const Items = () => {
  const items = [
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
    {
      item: "Mordern Light Cloths",
      details: "small, black, cotton",
      price: "N27,000.00",
    },
  ];

  return (
    <div>
      <div style={{ margin: 20 }}>
        <div>
          <p style={{ fontSize: 15, fontWeight: 500 }}>Items</p>
        </div>
        {items.map((el, index) => (
          <div>
            <div key={index} className="mt-2 flex items-center justify-between">
              <div>
                <p style={{ fontSize: 14, fontWeight: 400 }}>{el.item}</p>
                <p style={{ color: "#A4AAAD", fontSize: 10 }}>{el.details}</p>
              </div>
              <div>
                <p style={{ color: "#455A64" }}>{el.price}</p>
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
              <p style={{ fontSize: 12 }}>Sub Toatal (3 items)</p>
            </div>
            <p style={{ fontSize: 12 }}>N20,600</p>
          </div>
          <div className="flex items-center justify-between p-2">
            <div>
              <p style={{ fontSize: 12 }}>VAT</p>
            </div>
            <p style={{ fontSize: 12 }}>N1,500</p>
          </div>

          <div className="flex items-center justify-between p-2">
            <div>
              <p style={{ fontSize: 12 }}>Delivery Fee</p>
            </div>
            <p style={{ fontSize: 12 }}>N1,500</p>
          </div>
          <div className="flex items-center justify-between p-2">
            <div>
              <p style={{ fontSize: 12 }}>Service Fee</p>
            </div>
            <p style={{ fontSize: 12 }}>N1,500</p>
          </div>
          <div className="flex items-center justify-between p-2">
            <div>
              <p style={{ fontSize: 12 }}>Discount</p>
            </div>
            <p style={{ fontSize: 12 }}>-N1,000</p>
          </div>
          <div className="flex items-center justify-between p-2 mt-2">
            <div>
              <p style={{ fontSize: 16 }}>Toatal</p>
            </div>
            <p style={{ fontSize: 16 }}>N26,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;
