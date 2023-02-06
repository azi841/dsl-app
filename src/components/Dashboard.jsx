import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

import "./Dashboard.css";

const {data} = require('../hcv')

const _ = require('lodash');

let people =[];
const strUser = "User";

for(let i = 0; i<100;i++){
    let num = i+1;  
    people.push({id:i, uname:strUser+num, pass:data.passw , href: data.link});
}


const Dashboard = () => {
    
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

        /*if (_.isInteger(keyword)){
            const results = people.filter((user) => {
                return user.id.toString().startsWith(keyword.toLowerCase());
            });
            setFoundPerson(results);
        } else {
            setFoundPerson(people);
        }*/
        setPerson(keyword);
    }

    

    const navigate = useNavigate();
    return(
        
            <>
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
                            <span className="person-id">{person.uname} {person.pass} <a href={person.href}>Open</a></span>
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