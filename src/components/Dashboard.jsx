import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Dashboard.css";


const Dashboard = (props) => {

    const navigate = useNavigate();
    return(
        <>
            <div className="Box">
                <div className="Title">
                    <h1>Dashboard</h1>
                </div>
                <div>
                    <button className="Button" onClick={() => navigate(-1)}>Log out</button>
                </div>
            </div>                       
        </>
    )

}

export default Dashboard;