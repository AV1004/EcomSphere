import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { Root } from "./components/Root";
import { useState } from "react";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { OTP } from "./components/OTP";
import { Root2 } from "./components/Root2";
import { ProfilePage } from "./components/ProfilePage";
import { LoadingScreen } from "./components/LoadingScreen";
import ProductsPage from "./components/ProductsPage";
import Cursor from "./components/Cursor";
import Cart from "./components/Cart";
import UserProds from "./components/UserProds";

function App() {
  const [started, setStarted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <>
      <LoadingScreen started={started} setStarted={setStarted} />
      <Routes>
        <Route path="/" element={<Root isAuthenticated={isAuthenticated} />}>
          <Route
            index={true}
            element={<HomePage isAuthenticated={isAuthenticated} />}
          />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/yourProducts" element={<UserProds />} />
        </Route>

        <Route path="/signup" element={<Root2 />}>
          <Route index={true} element={<SignUp />} />
          <Route path={"otp"} element={<OTP />} />
        </Route>
        <Route path="/signin" element={<Root2 />}>
          <Route index={true} element={<SignIn />} />
          <Route path={"otp"} element={<OTP type={"signin"} />} />
        </Route>

        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Cursor />
    </>
  );
}

export default App;
