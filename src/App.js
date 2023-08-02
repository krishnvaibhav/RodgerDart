import { onAuthStateChanged } from "firebase/auth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useStateValue } from "./context/stateProvider";
import HomeScreen from "./components/HomeScreen";
import CreateAccount from "./components/CreateAccount";
import ForgotPassword from "./components/ForgotPassword";
import GetOtp from "./components/GetOtp";
import NewPassword from "./components/NewPassword";
import OtpScreen from "./components/OtpScreen";
import WelcomeBack from "./components/WelcomeBack";
import { auth } from "./firebase";
import BillNavbar from "./components/BillNavbar";
import { useEffect, useState } from "react";
import BillScreen from "./components/BillScreen";
import TipScreen from "./components/tipScreen";
import PaymentSuccess from "./components/PaymentSuccess";
import Trackorder from "./components/Trackorder";
import AddressScreeen from "./components/addressScreen";
import AddAddress from "./components/AddAddress";
import MyCards from "./components/MyCards";
import AddCard from "./components/AddCard";
import MyProfile from "./components/MyProfile";

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [loggedin, SetLogin] = useState(false);

  // console.log(localStorage.getItem("userIDToken"));

  onAuthStateChanged(auth, (user) => {
    if (user) {
      SetLogin(true);
      dispatch({
        type: "SET_USER",
        user: user,
      });
    } else {
      SetLogin(false);
      dispatch({
        type: "SET_USER",
        user: null,
      });
    }
  });

  return (
    <Router>
      <div className="mobile-content">
        <Routes>
          <Route exact path="/" element={<WelcomeBack />} />
          <Route exact path="/createaccount" element={<CreateAccount />} />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/newpassword" element={<NewPassword />} />
          <Route exact path="/otpscreen" element={<OtpScreen />} />
          <Route exact path="/getotp" element={<GetOtp />} />
          <Route exact path="/checkout" element={<BillScreen />} />
          <Route exact path="/tipscreen" element={<TipScreen />} />
          <Route exact path="/trackorder" element={<Trackorder />} />
          <Route exact path="/addressscreen" element={<AddressScreeen />} />
          <Route exact path="/addAddress" element={<AddAddress />} />
          <Route exact path="/mycards" element={<MyCards />} />
          <Route exact path="/addcard" element={<AddCard />} />
          <Route exact path="/myprofile" element={<MyProfile />} />
          <Route exact path="/paymentsuccess" element={<PaymentSuccess />} />
          {loggedin && (
            <Route exact path="/homescreen" element={<HomeScreen />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
