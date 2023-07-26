import { onAuthStateChanged } from "firebase/auth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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

function App() {
  const [{ user }, dispatch] = useStateValue();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch({
        type: "SET_USER",
        user: user,
      });
    } else {
      dispatch({
        type: "SET_USER",
        user: null,
      });
    }
  });

  const isAuthenticated = () => {
    return !!user;
  };

  const SecureRoute = ({ element, ...rest }) => {
    return isAuthenticated() ? element : <Navigate to="/" />;
  };

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
          <Route
            exact
            path="/homescreen"
            element={<SecureRoute element={<HomeScreen />} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
