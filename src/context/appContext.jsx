import { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = (props) => {
  const [number, setNumber] = useState("8075961210");

  const [item, setItem] = useState({});

  return (
    <AppContext.Provider value={{ number, setNumber, item, setItem }}>
      {props.children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
