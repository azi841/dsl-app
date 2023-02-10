import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import Dashboard from "./Dashboard";
import { firestore, auth } from "../firebase";
import {signInWithEmailAndPassword } from "firebase/auth";

 

import "./App.css";

function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();



  //firabase
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard')
    } catch (error) {
      console.error(error);
    }
  };
  //

  

  // JSX code for login form
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <div className="button-container">
        <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}



export default App;