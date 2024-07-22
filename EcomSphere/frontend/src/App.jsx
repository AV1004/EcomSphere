import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { Root } from "./components/Root";
import { useEffect, useState } from "react";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { Root2 } from "./components/Root2";
import { ProfilePage } from "./components/ProfilePage";
import { LoadingScreen } from "./components/LoadingScreen";
import ProductsPage from "./components/ProductsPage";
import Cursor from "./components/Cursor";
import Cart from "./components/Cart";
import UserProds from "./components/UserProds";
import { MyOrders } from "./components/MyOrders";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import AfterCheckout from "./components/AfterCheckout";

function App() {
  const [started, setStarted] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <LoadingScreen started={started} setStarted={setStarted} />
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index={true} element={<HomePage />} />
          <Route element={<AuthOutlet fallbackPath="/signin" />}>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/yourProducts" element={<UserProds />} />
            <Route path="/orders" element={<MyOrders />} />
          </Route>
        </Route>

        <Route path="/signup" element={<Root2 />}>
          <Route index={true} element={<SignUp />} />
          {/* <Route path={"otp"} element={<OTP />} /> */}
        </Route>
        <Route path="/signin" element={<Root2 />}>
          <Route index={true} element={<SignIn />} />
          {/* <Route
            path={"otp"}
            element={
              <OTP type={"signin"} setIsAuthenticated={setIsAuthenticated} />
            }
          /> */}
        </Route>
        <Route element={<AuthOutlet fallbackPath="/signin" />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route element={<AuthOutlet fallbackPath="/signin" />}>
          <Route
            path="/checkout/success"
            element={<AfterCheckout success={true} />}
          />
          <Route
            path="/checkout/fail"
            element={<AfterCheckout success={false} />}
          />
        </Route>
      </Routes>
      <Cursor />
    </>
  );
}

export default App;
