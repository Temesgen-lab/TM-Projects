//service->app->actors->dashboard
import React from "react";

const Dashboard = props => {
    console.log("Dashboard pages");
    const actor = props.detail;//form [{,,,,}] come from service->app->actors->dashboard
    return ( 
        <div className="dashboard">
            <pass>Dashboard page</pass>
            <button onClick={() => props.onPage(2)}>changepage</button>

        </div>
     );
}

export default Dashboard;