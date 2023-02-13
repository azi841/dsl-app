import React from "react";

import {Header, Footer} from "./hf/hf"
import { useEffect, useState} from "react";
import { useNavigate  } from "react-router-dom";


import { auth } from "../firebase";

import { createUserWithEmailAndPassword, onAuthStateChanged, signOut  } from 'firebase/auth';


const RegisterAdmin = () => {

    const navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await createUserWithEmailAndPassword(auth, email, password);
        setEmail('');
        setPassword('');
        navigate("/dashboard");
        } catch (error) {
        setErrorMessage(error.message);
        }
    };

    useEffect(() => {
        onAuthStateChanged(auth, user =>{
          if (!user) {
            navigate('/');
          }
        })
      }, [navigate]);

    return (
        <>
        <Header/>
        <form className="form" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                  <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                  />
                  <button type="submit" className="form-button">
                    Register admin
                  </button>
                  {errorMessage && <div className="form-error">{errorMessage}</div>}
              </form>
            <Footer/>
        </>
    )
}

export default RegisterAdmin;