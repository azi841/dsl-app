import { useEffect, useState} from "react";
import { useNavigate, useHistory  } from "react-router-dom";
import React from "react";
import {Header, Footer} from "./hf/hf"

import { db, auth } from "../firebase";
import {collection, addDoc, Timestamp, onSnapshot, query} from 'firebase/firestore'

import { createUserWithEmailAndPassword, onAuthStateChanged, signOut  } from 'firebase/auth';






import "./Dashboard.css";

const {data} = require('../hcv')

const _ = require('lodash');

let people =[];
const strUser = "User";

for(let i = 0; i<100;i++){
    let num = i+1;  
    people.push({id:i, uname:strUser+num, pass:data.passw , href: data.link});
}


const Dashboard= ()=> {

  const navigate = useNavigate();


    const [searchTerm, setSearchTerm] = useState("");
    /*const handleSearch = event => {
        setSearchTerm(event.target.value);
      };*/

    //FIREBASE AUTH
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await createUserWithEmailAndPassword(auth, email, password);
        setEmail('');
        setPassword('');
        } catch (error) {
        setErrorMessage(error.message);
        }
    };
    //

    //FIRESTORE
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
              })
        } 
        catch (err) {
            alert(err)
        };
    }

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
    
       
    //
    

    const [users, setUsers] = useState([]);

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
    console.log(users)

    const filteredUsers = users.filter(user => {
        return (
          (user.name.first + " " + user.name.last).toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.nid.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.location.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
          (user.name.last + " " + user.name.first).toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    
    return(
      
            <>
                <Header />
                <div>
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
                <button onClick={handleCreate}>Create user</button>
                </div>

            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Register admin</button>
                {errorMessage && <div>{errorMessage}</div>}
            </form>

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
            <p style={styles.userNid}>{user.nid}</p>
            <p style={styles.userLocation}>{user.location}</p>
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