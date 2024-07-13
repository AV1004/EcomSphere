import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { Root } from "./components/Root";
import { useState } from "react";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { OTP } from "./components/OTP";
import { Root2 } from "./components/Root2";
import { ProfilePage } from "./components/ProfilePage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <>
      <Routes>
        <Route path="/" element={<Root isAuthenticated={isAuthenticated} />}>
          <Route
            index={true}
            element={<HomePage isAuthenticated={isAuthenticated} />}
          />
          <Route path="/products" />
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
    </>
  );
}

export default App;
