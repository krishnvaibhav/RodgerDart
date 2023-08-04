import React, { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

const SearchBar = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputStyle = {
    width: "100%",
    height: "100%",
    outline: isFocused ? "none" : "initial",
    border: isFocused ? "0" : "initial",
    color: isFocused ? "initial" : "#979797",
  };
  return (
    <div
      className="flex flex-row space-x-3 rounded-lg"
      style={{
        width: props.width + "px",
        height: 40,
        borderWidth: 1,
        borderColor: "#E3E3E3",
        alignItems: "center",
        fontFamily: "Inter",
        fontSize: 12,
        color: "#979797",
        boxSizing: "border-box",
        padding: "0 10px",
      }}
    >
      <span style={{ display: "flex", alignItems: "center" }}>
        <HiMagnifyingGlass size={15} color="black" />
      </span>
      <input
        style={inputStyle}
        type="text"
        placeholder="Search store, product"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default SearchBar;
