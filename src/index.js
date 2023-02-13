import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  App
} from "./components";
import Dashboard from "./components/Dashboard";
import RegisterAdmin from "./components/RegisterAdmin";
import RegisterUser from "./components/RegisterUser";



ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/registeruser" element={<RegisterUser />} />
      <Route path="/registeradmin" element={<RegisterAdmin />}/>
    </Routes>
  </Router>,

  document.getElementById("root")
);

serviceWorker.unregister();