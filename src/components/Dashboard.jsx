import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

import "./Dashboard.css";

import ReactScrollableList from './dist/index'


let people =[
    {
        id:1, 
        uname: "User1"
    },
    {
        id:2, 
        uname:"User2"
    },
    {
        id:3, 
        uname:"User3"
    },
    {
        id:4, 
        uname:"User4"
    },
    {
        id:5,
        uname:"User5"
    },
    {
        id:6,
        uname:"User6"
    },
    {
        id:7,
        uname:"User7"
    }
];
const strUser = "User";

/*for(let i = 0; i<100;i++){
    let num = i+1;
    let str = num.toString();    
    people.push({id:i, content:strUser+str})
}
*/

const Dashboard = () => {
    
    const [person, setPerson] = useState('');
    const [foundPerson, setFoundPerson] = useState(people);

    const filter = (e) => {
        const keyword = e.target.value;

        if (keyword !== '') {
            const results = people.filter((user) => {
                return user.uname.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFoundPerson(results);
        } else{
            setFoundPerson(people);
        }

        setPerson(keyword);
    }
    

    const navigate = useNavigate();
    return(
        
            <div className="Box">
                <div className="Title">
                    <h1>Dashboard</h1>
                </div>
                <div className="Search">
                    <input 
                    type ="search"
                    value={person}
                    onChange={filter}
                    className="input"
                    placeholder="Search"
                    />
                    
                    <div className="List">
                        {foundPerson&&foundPerson.length > 0 ?(
                                foundPerson.map((person)=>(
                            <li key = {person.id} className="person">
                                <span className="person-id">{person.uname}</span>
                            </li>
                            ))
                            ) : (
                                <h5>No results found!</h5>
                            )}
                    </div>
                </div>
                <div>
                    <button className="Button" onClick={() => navigate(-1)}>Log out</button>
                </div>
            </div>                       
        
    )

}

export default Dashboard;