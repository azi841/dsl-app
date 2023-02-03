import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

import "./Dashboard.css";

import ReactScrollableList from './dist/index'


let people =[];
const strUser = "User";

for(let i = 0; i<100;i++){
    let num = i+1;
    let str = num.toString();    
    people.push({id:i, content:strUser+str})
}

const Dashboard = () => {
    
    const [person, setPerson] = useState('');
    const [foundPerson, setFoundPerson] = useState(people);

    const filter = (e) => {
        const keyword = e.target.value;

        if (keyword !== '') {
            const results = people.filter((user) => {
                return user.value.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFoundPerson(results);
        } else{
            setFoundPerson(people);
        }

        setPerson(keyword);
    }
    

    const navigate = useNavigate();
    return(
        <>
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
                    {/*
                    <ul>
                    {people.map((people) => <li key={people.id}>{people.username}</li>)}
                    </ul>*/}
                    <div>
                        <ReactScrollableList
                        {foundPerson&&foundPerson.length > 0 ?(
                            foundPerson.map((person)=>(
                                
                                listItems={people}
                                heightOfItem={30}
                                maxItemsToRender={20}
                                style={{ color: '#333' }}
                                
                            ))
                        ) : (
                            <h1>No results found!</h1>
                        )}
                        />
                    </div>
                </div>
                <div>
                    <button className="Button" onClick={() => navigate(-1)}>Log out</button>
                </div>
            </div>                       
        </>
    )

}

export default Dashboard;