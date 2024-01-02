import React from "react";

const Dashboard = props => {
    const actor = props.detail;//form [{,,,,}] come from service->app->actors->dashboard
    console.log("Dashboard pages");
    return ( 
        <div className="dashboard">
            <pass>Dashboard page</pass>
            <button onClick={() => props.onPage(5)}>changepage</button>

        </div>
     );
}

export default Dashboard;