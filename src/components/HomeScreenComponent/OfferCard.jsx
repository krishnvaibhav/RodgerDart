import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const OfferCard = (props) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchOfferScreenData = async () => {
      try {
        const offercardurl = doc(db, "userapp-settings", "offerscreen");
        const docSnap = await getDoc(offercardurl);

        if (docSnap.exists()) {
          const url = docSnap.data().url;
          setImageUrl(url);
        } else {
          console.log("Offer screen data not found");
        }
      } catch (error) {
        console.error("Error fetching offer screen data:", error);
      }
    };

    fetchOfferScreenData();
  }, []);

  return (
    <div
      style={{
        marginTop: 20,
        minWidth: props.width + "px",
        height: "100%",
        textAlign: "center",
        margin: 20,
      }}
    >
      <div
        style={{
          position: "relative",
          width: 300,
          height: 100,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        {imageUrl && (
          <div style={{ position: "relative", bottom: 60 }}>
            <img
              style={{ width: "100%", borderRadius: 10 }}
              src={imageUrl}
              alt=""
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Black overlay with 50% opacity
                borderRadius: 10,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferCard;
