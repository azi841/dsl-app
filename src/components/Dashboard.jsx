import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

import "./Dashboard.css";

import ReactScrollableList from './dist/index'


let people =[];
const user = "User";

for(let i = 0; i<100;i++){
    let num = i+1;
    let str = num.toString();    
    people.push({id:i, content:user+str})
}

const Dashboard = () => {
    
  
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
                    />
                    {/*
                    <ul>
                    {people.map((people) => <li key={people.id}>{people.username}</li>)}
                    </ul>*/}
                    <ReactScrollableList
                    listItems={people}
                    heightOfItem={30}
                    maxItemsToRender={20}
                    style={{ color: '#333' }}
                    />
                </div>
                <div>
                    <button className="Button" onClick={() => navigate(-1)}>Log out</button>
                </div>
            </div>                       
        </>
    )

}

export default Dashboard;