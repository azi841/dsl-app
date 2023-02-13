import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

import {onAuthStateChanged, signOut } from 'firebase/auth';


import {Header, Footer} from "./hf/hf"

import {collection, addDoc, Timestamp, onSnapshot, query} from 'firebase/firestore'

import { db, auth } from "../firebase";


const RegisterUser = () => {

    const navigate = useNavigate();

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [nid, setNid] = useState('');
    const [location, setLocation] = useState('');

    const handleCreate = async(e) => {
        e.preventDefault()
        try{
            await addDoc(collection(db, 'users'),{
                name:{
                    last: lname,
                    first: fname
                },
                nid: nid,
                location: location,
                completed: false,
                created: Timestamp.now()
            })
            .then(() => {
                console.log("User successfully added!");
                setFname('');
                setLname('');
                setNid('');
                setLocation('');
                navigate("/dashboard");
              })
        } 
        catch (err) {
            alert(err)
        };
    }

    useEffect(() => {
      onAuthStateChanged(auth, user =>{
        if (!user) {
          navigate('/');
        }
      })
    }, [navigate]);

    


    return (
            <>
                <Header />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ display: "flex", margin: "1rem 0" }}>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      style={{ padding: "0.5rem", marginRight: "1rem", fontSize: "1rem", borderRadius: "5px" }}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                      style={{ padding: "0.5rem", marginRight: "1rem", fontSize: "1rem", borderRadius: "5px" }}
                    />
                  </div>
                  <div style={{ display: "flex", margin: "1rem 0" }}>
                    <input
                      type="text"
                      placeholder="NID"
                      value={nid}
                      onChange={(e) => setNid(e.target.value)}
                      style={{ padding: "0.5rem", marginRight: "1rem", fontSize: "1rem", borderRadius: "5px" }}
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      style={{ padding: "0.5rem", marginRight: "1rem", fontSize: "1rem", borderRadius: "5px" }}
                    />
                  </div>
                  <button onClick={handleCreate} style={{ padding: "0.5rem 1rem", fontSize: "1rem", borderRadius: "5px", backgroundColor: "blue", color: "white" }}>
                    Create user
                  </button>
                </div>
                <Footer />
            </>

    )
}

export default RegisterUser;