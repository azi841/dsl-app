import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import {Header, Footer} from "./hf/hf"
import {EditUser} from "./EditUser.jsx"

import { db, auth } from "../firebase";
import {collection,  onSnapshot, query} from 'firebase/firestore'

import {onAuthStateChanged, signOut } from 'firebase/auth';

import "./Dashboard.css";


const Dashboard= ()=> {

  const navigate = useNavigate();


    const [searchTerm, setSearchTerm] = useState("");

    const [users, setUsers] = useState([]);
    const [editing, setEditing] = useState(null);



    useEffect( () => {
      const q = query(collection(db, "users")); 
      const unsubscribe = onSnapshot(q, querySnapshot => {
          let usersArray =[]
          querySnapshot.forEach(doc => {
              usersArray.push({...doc.data(), id: doc.id});
          });
          setUsers(usersArray);
      }
         
      );
          return () => unsubscribe();
      }, []);



      const handleLogout = () =>{
        signOut(auth).then(() => {
          console.log('user signed out');
          navigate('/');
        });
      };

      useEffect(() => {
        onAuthStateChanged(auth, user =>{
          if (!user) {
            navigate('/');
          }
        })
      }, [navigate]);
    

    const filteredUsers = users.filter(user => {
        return (
          (user.name.first + " " + user.name.last).toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.nid.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.location.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
          (user.name.last + " " + user.name.first).toLowerCase().includes(searchTerm.toLowerCase()) ||
          (user.name.first + "" + user.name.last).toLowerCase().includes(searchTerm.toLowerCase()) ||
          (user.name.last + "" + user.name.first).toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    
    return( 
      <>
        <Header/> 
          <div style={styles.container}>
            <input
              type="text"
              placeholder="Search by first name, last name, or nid"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            <div style={styles.listContainer}>
              {filteredUsers.map((user) => (
                <div key={user.id} style={styles.userContainer}>
                  <p style={styles.userName}>
                    {user.name.first} {user.name.last}
                  </p>
                  <p style={styles.userNid}>User ID: {user.nid}</p>
                  <p style={styles.userLocation}>Location: {user.location}</p>
                  <p>Package: {user.package}</p>
                  <button onClick={() => setEditing(user.id)}>Edit</button>
                  {editing === user.id && <EditUser user={user} onCancel={() => setEditing(null)} />}
                </div>
              ))}
            </div>
            <button onClick={handleLogout}>Logout</button>

          </div>
        <Footer />
      </>                     
        
    )

}

const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    searchInput: {
      width: "50%",
      padding: "10px",
      margin: "10px 0",
      fontSize: "16px",
      borderRadius: "5px",
      border: "1px solid gray",
    },
    listContainer: {
      width: "50%",
      maxHeight: "500px",
      overflowY: "scroll",
    },
    userContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      border: "1px solid gray",
      padding: "10px",
      margin: "10px 0",
      width: "100%",
    },
    userName: {
      fontSize: "20px",
      fontWeight: "bold",
    },
    userNid: {
      fontSize: "16px",
    },
    userLocation: {
      fontSize: "16px",
    },
  };

export default Dashboard;