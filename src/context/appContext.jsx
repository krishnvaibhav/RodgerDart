import { createContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = (props) => {
  const [price, setPrice] = useState({});

  const [cardsList, setCardsList] = useState([]);

  const [address, setAddress] = useState("");

  const [tip, setTip] = useState("");

  return (
    <AppContext.Provider
      value={{ price, setPrice, address, setAddress, tip, setTip }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
