import { createContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = (props) => {
  const [price, setPrice] = useState({});

  useEffect(() => {
    console.log("price updated");
    console.log(price);
  }, [price]);

  return (
    <AppContext.Provider value={{ price, setPrice }}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
