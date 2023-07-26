import React, { useState } from "react";
import onboadring1 from "../assets/bro.png";
import onboadring2 from "../assets/Group 940.png";
import onboadring3 from "../assets/pana.png";
import OnBoardingContent from "./OnBoardingContent";

const Onboarding = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <div
      className="bg-white flex items-center justify-center	"
      style={{ height: "100vh" }}
    >
      {step === 1 && (
        <OnBoardingContent
          step={step}
          img={onboadring1}
          next={handleNextStep}
          heading="Listen to your Cravings"
          text="Browse our menu and order your favourite meal in-store"
        />
      )}

      {step === 2 && (
        <OnBoardingContent
          step={step}
          img={onboadring2}
          next={handleNextStep}
          heading="Access more Vendors"
          text="Pay the exact amount while placing what you ordered"
        />
      )}

      {step === 3 && (
        <OnBoardingContent
          step={step}
          img={onboadring3}
          heading="Fast Delivery"
          text="Fast delivery to your home, office and wherever you are"
        />
      )}
    </div>
  );
};

export default Onboarding;
