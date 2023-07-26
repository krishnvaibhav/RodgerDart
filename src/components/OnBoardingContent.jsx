import React from "react";

export default function OnBoardingContent(props) {
  return (
    <div className="flex items-center justify-center flex-col p-3">
      <img
        src={props.img}
        alt="onboarding"
        className="p-2 m-2"
        style={{ width: 275, height: 275 }}
      />
      <div className="text-red-500 mt-2 mb-2">
        {props.step === 1 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="53"
            height="3"
            viewBox="0 0 53 3"
            fill="none"
          >
            <rect width="36" height="3" rx="1.1" fill="#B10000" />
            <rect x="39" width="6" height="3" rx="1.1" fill="#D9D9D9" />
            <rect x="47" width="6" height="3" rx="1.1" fill="#D9D9D9" />
          </svg>
        )}
        {props.step === 2 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="51"
            height="3"
            viewBox="0 0 51 3"
            fill="none"
          >
            <rect x="8" width="36" height="3" rx="1.1" fill="#B10000" />
            <rect width="6" height="3" rx="1.1" fill="#D9D9D9" />
            <rect x="45" width="6" height="3" rx="1.1" fill="#D9D9D9" />
          </svg>
        )}
        {props.step === 3 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="55"
            height="3"
            viewBox="0 0 55 3"
            fill="none"
          >
            <rect x="19" width="36" height="3" rx="1.1" fill="#B10000" />
            <rect width="6" height="3" rx="1.1" fill="#D9D9D9" />
            <rect x="10" width="6" height="3" rx="1.1" fill="#D9D9D9" />
          </svg>
        )}
      </div>
      <h3 className="text-2xl font-semibold text-red-500 m-2 p-2">
        {props.heading}
      </h3>
      <p
        style={{ width: "80%" }}
        className="font-normal text-sm text-center m-2"
      >
        {props.text}
      </p>
      <div className="relative top-40 flex flex-col mb-3">
        <button
          onClick={props.next}
          className="bg-color p-3 m-3 w-80 rounded text-white"
        >
          Countinue
        </button>
        <button className="mt-2">{props.step !== 3 && "Skip"}</button>
      </div>
    </div>
  );
}
