import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { kullanici } = useAuthContext();

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={kullanici ? <Home /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/login"
              element={!kullanici ? <Login /> : <Navigate to={"/"} />}
            />
            <Route
              path="/signup"
              element={!kullanici ? <Signup /> : <Navigate to={"/"} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
