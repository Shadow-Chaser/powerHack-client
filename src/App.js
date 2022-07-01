import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import PrivateRoute from "./routes/PrivateRoute";

export const BillContext = createContext();
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [bills, setBills] = useState([]);

  useEffect(() => {
    axios.get("https://fierce-refuge-99891.herokuapp.com/billing-list")
      .then(function (response) {
        // console.log(response);
        setBills(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  return (
    <UserContext.Provider value={[user, setUser]}>
      <BillContext.Provider value={[bills, setBills]}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </BillContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
