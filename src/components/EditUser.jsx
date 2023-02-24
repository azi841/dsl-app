import { useState } from "react";

import { db } from "../firebase";

import {updateDoc, doc} from 'firebase/firestore'


import "./Dashboard.jsx"




const EditUser = ({ user, onCancel  }) => {
    const [lname, setLname] = useState(user.name.last);
    const [fname, setFname] = useState(user.name.first);
    const [nid, setNid] = useState(user.nid);
    const [location, setLocation] = useState(user.location);
    const [selectedPackage, setSelectedPackage] = useState(user.package);
    const [password, setPassword] = useState(user.password)
  

    const handleSubmit = (e) => {
      e.preventDefault();
      const userRef = doc(db, "users", user.id);
      updateDoc(userRef, {
        name: {
            last: lname,
            first: fname
        },
        nid,
        location,
        password,
        package: selectedPackage,
      }).then(() => {
        console.log("User updated");
        onCancel();
      });
    };


    const handleCancel = () => {
      onCancel();
    };
    
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
        <input
          type="text"
          placeholder="NID"
          value={nid}
          onChange={(e) => setNid(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input 
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "0.5rem", marginRight: "1rem", fontSize: "1rem", borderRadius: "5px" }}
        />
       <select value={selectedPackage} onChange={(e) => setSelectedPackage(e.target.value)} style={{ padding: "0.5rem", fontSize: "1rem", borderRadius: "5px" }}>
          <option value="">-- Please select --</option>
          <option value="25">Package 25</option>
          <option value="30">Package 30</option>
        </select>
        <button type="submit" >Save</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    );
  };
  
export  {EditUser};