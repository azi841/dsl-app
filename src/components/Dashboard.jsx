import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

import "./Dashboard.css";

const people =[
  "User1",
  "User2",
  "User3",
  "User4"
];

const Dashboard = (props) => {
    
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const handleChange = event => {
       setSearchTerm(event.target.value);
    }
    React.useEffect(() => {
        const results = people.filter(person =>
            person.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(results);
        }, [searchTerm]);
    const navigate = useNavigate();
    return(
        <>
            <div className="Box">
                <div className="Title">
                    <h1>Dashboard</h1>
                </div>
                <div className="Search">
                    <input 
                    type ="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleChange}
                    />
                    <ul>
                        {searchResults.map(item => (
                            <li>{item}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <button className="Button" onClick={() => navigate(-1)}>Log out</button>
                </div>
            </div>                       
        </>
    )

}

export default Dashboard;