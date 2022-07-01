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

export const BillContext = createContext();

function App() {

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
    <BillContext.Provider value={[bills, setBills]}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </BillContext.Provider>
  );
}

export default App;
