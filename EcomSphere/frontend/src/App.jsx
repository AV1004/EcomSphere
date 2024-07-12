import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { Root } from "./components/Root";
import { useState } from "react";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<Root isAuthenticated={isAuthenticated} />}>
          <Route
            index={true}
            element={<HomePage isAuthenticated={isAuthenticated} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
