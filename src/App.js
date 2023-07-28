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
import { useEffect, useState } from "react";

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
          {loggedin && (
            <Route exact path="/homescreen" element={<HomeScreen />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
