import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firestore, auth } from "../firebase";
import {signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {Header, Footer} from "./hf/hf"


 

import "./App.css";
import { useEffect } from "react";
import { useRef } from "react";

const App =() =>{
  // React States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);


  const navigate = useNavigate();


  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user){
        setIsLoggedIn(true);
      }
      else {
        setIsLoggedIn(false);
      }
    });
  }, []);


  //firabase
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Please enter a valid email and password');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      setIsLoggedIn(false);
    }
  };
  //



  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);


  

  // JSX code for login form
  
  return (
    <>
    <Header/>
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          {error && <div className="alert alert-danger">{error}</div>}
          <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div className="input-container">
          <label>Password </label>
          {error && <div className="alert alert-danger">{error}</div>}
          <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <div className="button-container">
        <button type="submit">Login</button>
        </div>
      </form>
    </div>
    <Footer />
    </>
  );
  

}



export default App;