import { Suspense, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

import { firestore, auth } from "../firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';


import {collection, addDoc} from 'firebase/firestore';




import "./Dashboard.css";

const {data} = require('../hcv')

const _ = require('lodash');

let people =[];
const strUser = "User";

for(let i = 0; i<100;i++){
    let num = i+1;  
    people.push({id:i, uname:strUser+num, pass:data.passw , href: data.link});
}


function Dashboard () {


    const [User, setUser]=useState("");

    //FIREBASE
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
    //

   /* const handleSubmit = async (e) => {
        e.preventDefault();
        if (User !== "") {
            await addDoc(collection(db, "users"), {
                User,
                completed: false,
            });
            setUser("");
        }
    }*/



    const navigate = useNavigate();
    
    const [person, setPerson] = useState('');
    const [foundPerson, setFoundPerson] = useState(people);


    const filter = (e) => {
        const keyword = e.target.value;

        if (_.isString(keyword)) {
            const results = people.filter((user) => {
                return user.uname.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFoundPerson(results);
        } else if (isNaN(keyword)==true){
            const results = people.filter((user) => {
                return user.id.toString().startsWith(keyword.toString());
            });
            setFoundPerson(results);
        }
         else{
            setFoundPerson(people);
        }
        setPerson(keyword);
    }

    
    return(
        
            <>
            
            <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={event => setEmail(event.target.value)} />
      <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
      <button type="submit">Register</button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
          
            <div className="Box1">
                <div className="Title">
                    <h1>Dashboard</h1>
                </div>
                <div className="Search">
                    <input
                        type="search"
                        value={person}
                        onChange={filter}
                        className="input"
                        placeholder="Search" />

                </div>
                <div>
                    <button className="Button" onClick={() => navigate(-1)}>Log out</button>
                </div>
            </div>
            <div className="List">
                {foundPerson.length > 0? (
                    foundPerson.map((person) => (
                        <li key={person.id} className="person">
                            <span className="person-id">{person.uname}<button onClick={()=>{navigator.clipboard.writeText(person.pass);}}>Copy password</button><a href={person.href}>Open</a></span>
                        </li>
                    ))
                ) : (
                    <h5>No results found!</h5>
                )}
            </div>
            </>                     
        
    )

}

export default Dashboard;